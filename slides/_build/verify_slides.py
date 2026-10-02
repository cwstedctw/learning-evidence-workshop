#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""verify_slides.py — 投影片的自驗（兩支閘門之外、換一條路回讀）。

    python slides/_build/verify_slides.py [--shots <資料夾>]

逐頁用 Playwright 開 file://：
  1. console error／pageerror 要是零；deck.js 跑完會在 <html> 掛 data-rendered="flow"。
  2. 「執行期從 WORKSHOP_FLOW 填的字」要跟「烤進 HTML 的字」一模一樣：
     把 deck.js 擋掉再開一次，逐個 data-fill／data-list／data-pairs／data-sum 比 textContent。
  3. 執行期正文中文字數（去掉 kicker、title、footer-org、seal；SVG 裡的字另列）——
     check_deck_pages.py 是靜態掃，會把 <title> 與 .seal 算進去，這裡給真實數字。
  4. 每頁的英文詞（去掉 kicker／footer／seal）去重後 ≤ 8。
  5. SVG 裡每個 <text> 的框要在它的 <svg> 框裡（外層 svg 預設會把超出的字剪掉，check_overflow 量不到）。
  6. 靜態掃：占位符、禁用詞、硬規矩句、8 個 data-figure、工作台按鈕名稱只用清單裡的字。
  7. 播放殼 index.html：#5 開到 05.html、→ 到 06、Home／End、計數器。
全部過才印 PASS；任何一項不過 exit 1。截圖（每頁一張）放 --shots 指定的資料夾，預設不截。
"""
import argparse
import json
import pathlib
import re
import sys

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[1]
SLIDES = ROOT / 'slides'

RULE = '挑一句不同意的、改掉、寫下為什麼。'
FIGURES = ['F-agenda', 'F-routes', 'F-redlines', 'F-timeline', 'F-rubric-diff', 'F-gap', 'F-check', 'F-onepage']
PLACEHOLDERS = ['【待補】', '【TODO】', 'TODO', 'lorem', 'XXX']
FORBIDDEN = ['软件', '视频', '激活', '信息', '数据库', '默认', '屏幕', '哈希', '質量', '優化', '用戶', '網絡', '鼠標', '硬件',
             '服務器', '程序', '視頻', '軟件', '通過', '搞', '默認', '數據庫', '激活']
UI = ['Rubric 工作台', '證據儀表板', '一頁設計',
      '複製', '看範例輸出', '比較兩版', '匯出這一輪', '抽 3 筆回查', '匯出抽查紀錄', '帶入示範課', '匯出 Markdown', '講師模式', '清除暫存',
      '為什麼改', '三句結論']
CJK = re.compile(r'[一-鿿㐀-䶿]')
ENG = re.compile(r'[A-Za-z][A-Za-z0-9+.\-]*')

JS_SNAPSHOT = r"""
() => {
  const out = [];
  document.querySelectorAll('[data-fill],[data-list],[data-pairs],[data-sum]').forEach((el, i) => {
    const key = el.getAttribute('data-fill') || el.getAttribute('data-list') || el.getAttribute('data-pairs') || el.getAttribute('data-sum');
    out.push([i, key, el.textContent.replace(/\s+/g, ' ').trim()]);
  });
  return out;
}
"""
JS_METRICS = r"""
() => {
  const slide = document.querySelector('.slide');
  const skip = el => el.closest('.kicker,.title,.footer-org,.seal,script,style,template');
  let html = 0, svgc = 0, words = new Set();
  const walker = document.createTreeWalker(slide, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = walker.nextNode())) {
    const el = n.parentElement; if (!el || skip(el)) continue;
    const t = n.textContent;
    const c = (t.match(/[一-鿿㐀-䶿]/g) || []).length;
    if (el.closest('svg')) svgc += c; else html += c;
    (t.match(/[A-Za-z][A-Za-z0-9+.\-]*/g) || []).forEach(w => words.add(w));
  }
  const svgIssues = [];
  document.querySelectorAll('svg').forEach(s => {
    const sr = s.getBoundingClientRect();
    s.querySelectorAll('text').forEach(t => {
      const r = t.getBoundingClientRect();
      if (!r.width) return;
      if (r.left < sr.left - 1 || r.right > sr.right + 1 || r.top < sr.top - 1 || r.bottom > sr.bottom + 1)
        svgIssues.push({what: t.textContent.trim().slice(0, 30), rect: [r.left, r.top, r.right, r.bottom].map(Math.round), svg: [sr.left, sr.top, sr.right, sr.bottom].map(Math.round)});
    });
  });
  return {html, svg: svgc, words: [...words], svgIssues, rendered: document.documentElement.getAttribute('data-rendered')};
}
"""


def visible_text(src):
    s = re.sub(r'<script.*?</script>|<style.*?</style>', ' ', src, flags=re.S | re.I)
    s = re.sub(r'<[^>]+>', ' ', s)
    return s


def static_checks(files):
    problems = []
    all_src = ''
    figs = set()
    for f in files:
        src = f.read_text(encoding='utf-8')
        all_src += src
        vis = visible_text(src)
        for ph in PLACEHOLDERS:
            if ph in vis:
                problems.append(f'{f.name}: 占位符 {ph}')
        for w in FORBIDDEN:
            if w in vis:
                problems.append(f'{f.name}: 禁用詞「{w}」')
        for m in re.finditer(r'data-figure="([^"]+)"', src):
            figs.add(m.group(1))
        for m in re.finditer(r'<span class="ui">([^<]+)</span>', src):
            if m.group(1) not in UI:
                problems.append(f'{f.name}: 工作台名稱不在清單：{m.group(1)}')
        if '<!DOCTYPE html>' not in src or 'lang="zh-Hant-TW"' not in src or '<title>' not in src or 'name="viewport"' not in src:
            problems.append(f'{f.name}: 缺 DOCTYPE／lang／title／viewport')
    if RULE not in all_src:
        problems.append(f'硬規矩句未原文出現：{RULE}')
    missing = [x for x in FIGURES if x not in figs]
    if missing:
        problems.append(f'缺 data-figure：{missing}')
    extra = figs - set(FIGURES)
    if extra:
        problems.append(f'多出來的 data-figure：{sorted(extra)}')
    return problems


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--shots', default='')
    ap.add_argument('--out', default=str(SLIDES / '_qa' / 'verify.json'))
    a = ap.parse_args()
    from playwright.sync_api import sync_playwright

    files = sorted(SLIDES.glob('[0-9][0-9].html'))
    problems = static_checks(files + [SLIDES / 'index.html'])
    report = {'pages': [], 'problems': problems}
    shots = pathlib.Path(a.shots) if a.shots else None
    if shots:
        shots.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as p:
        b = p.chromium.launch()
        ctx = b.new_context(viewport={'width': 1280, 'height': 720}, device_scale_factor=1)
        page = ctx.new_page()
        errors = []
        page.on('console', lambda m: errors.append(f'console.{m.type}: {m.text}') if m.type in ('error', 'warning') else None)
        page.on('pageerror', lambda e: errors.append(f'pageerror: {e}'))
        for f in files:
            errors.clear()
            page.goto(f.as_uri())
            page.evaluate('document.fonts && document.fonts.ready')
            page.wait_for_timeout(200)
            met = page.evaluate(JS_METRICS)
            snap_live = page.evaluate(JS_SNAPSHOT)
            if shots:
                page.screenshot(path=str(shots / f'{f.stem}.png'))
            first_errors = list(errors)   # 只算正常載入那一次；下面故意擋掉 deck.js 會製造一個 ERR_FAILED
            # 擋掉 deck.js 再開一次：烤進 HTML 的字
            page.route('**/deck.js', lambda route: route.abort())
            page.goto(f.as_uri())
            page.wait_for_timeout(100)
            snap_static = page.evaluate(JS_SNAPSHOT)
            page.unroute('**/deck.js')
            diffs = [(k, s1, s2) for (i, k, s1), (j, kk, s2) in zip(snap_live, snap_static) if s1 != s2]
            if len(snap_live) != len(snap_static):
                diffs.append(('count', len(snap_live), len(snap_static)))
            # 英文詞：代號（S01、DEMO-S01）與路線的 A／B 圓標不算技術名詞
            words = sorted({w for w in met['words'] if not re.fullmatch(r'(DEMO-)?S\d+|[AB]', w)})
            errors[:] = first_errors
            rec = {'page': f.name, 'cjk_html': met['html'], 'cjk_svg': met['svg'], 'english': words,
                   'rendered': met['rendered'], 'errors': list(errors), 'fills': len(snap_live), 'diffs': diffs, 'svgIssues': met['svgIssues']}
            report['pages'].append(rec)
            if errors:
                problems.append(f'{f.name}: {errors}')
            if met['rendered'] != 'flow':
                problems.append(f'{f.name}: deck.js 沒跑完（data-rendered={met["rendered"]}）')
            if diffs:
                problems.append(f'{f.name}: 執行期與烤進去的字不同：{diffs[:3]}')
            if met['svgIssues']:
                problems.append(f'{f.name}: SVG 文字超出 svg 框：{met["svgIssues"][:3]}')
            if len(words) > 8:
                problems.append(f'{f.name}: 英文詞 {len(words)} 個 > 8：{words}')
            print(f'{f.name}  正文中文 {met["html"]:3d} 字（SVG 內另 {met["svg"]:3d}）  英文詞 {len(words):2d}  data 填點 {len(snap_live):2d}  '
                  f'{"一致" if not diffs else "不一致"}  {"錯誤 " + str(len(errors)) if errors else ""}')

        # 播放殼
        idx = SLIDES / 'index.html'
        errors.clear()
        page.goto(idx.as_uri() + '#5')
        page.wait_for_timeout(300)
        src = page.evaluate("document.getElementById('view').getAttribute('src')")
        cnt = page.evaluate("document.getElementById('counter').textContent")
        page.keyboard.press('ArrowRight')
        page.wait_for_timeout(100)
        src2 = page.evaluate("document.getElementById('view').getAttribute('src')")
        hash2 = page.evaluate('location.hash')
        page.keyboard.press('End')
        page.wait_for_timeout(100)
        src3 = page.evaluate("document.getElementById('view').getAttribute('src')")
        page.keyboard.press('Home')
        page.wait_for_timeout(100)
        src4 = page.evaluate("document.getElementById('view').getAttribute('src')")
        page.mouse.click(900, 400)
        page.wait_for_timeout(100)
        src5 = page.evaluate("document.getElementById('view').getAttribute('src')")
        scale = page.evaluate("document.getElementById('frame').style.transform")
        if shots:
            page.screenshot(path=str(shots / 'index.png'))
        player = {'hash5': src, 'counter': cnt, 'right': src2, 'hash_after_right': hash2, 'end': src3, 'home': src4, 'click': src5, 'scale': scale, 'errors': list(errors)}
        report['player'] = player
        if not (src == '05.html' and cnt == '5 / 20' and src2 == '06.html' and hash2 == '#6' and src3 == '20.html' and src4 == '01.html' and src5 == '02.html'):
            problems.append(f'播放殼行為不對：{player}')
        if errors:
            problems.append(f'index.html: {errors}')
        print('播放殼', player)
        b.close()

    pathlib.Path(a.out).parent.mkdir(parents=True, exist_ok=True)
    pathlib.Path(a.out).write_text(json.dumps(report, ensure_ascii=False, indent=1), encoding='utf-8')
    for pr in problems:
        print('PROBLEM', pr)
    print('== PASS' if not problems else f'== {len(problems)} 個問題')
    sys.exit(1 if problems else 0)


if __name__ == '__main__':
    main()
