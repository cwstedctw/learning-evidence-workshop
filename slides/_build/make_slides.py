#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""make_slides.py — 從 workflow-data.js（唯一資料源）烤出 slides/01.html … 16.html。

用法（在 repo 任何位置都可以）：
    python slides/_build/make_slides.py

做法：
  1. 用 node 把 ../../workflow-data.js 在 vm 裡跑一次、吐 JSON（_build/dump_flow.js）。
  2. 每頁的清單類內容（開場那一句、議程、步驟、一頁設計欄位、課後要點）都從資料填；
     散文（副標、底部一行）才是這支腳本自己寫的，不得跟資料矛盾。
  3. 填字的規則（data-fill／data-list／data-pairs／data-sum、折行、工作台按鈕框）跟 slides/deck.js 一模一樣，
     所以沒有 JS 也看得到同樣的字；有 JS 時 deck.js 會從資料源再填一次，兩邊必須相同
     （_build/verify_slides.py 會逐頁比對）。
  4. 第三塊的落差圖用 data/sample-analysis.json 的「課堂專題簡報」那組數字（唯讀）；
     「離 0 遠」的門檻（FAR_GAP）跟工作台 studio.html 的判準同一個數字，改要一起改。

閘門（做完一定跑）：
    python <wailan_agent>/skills/course-intro/check_deck_pages.py slides --expect 16 --dark 2,11,16 --max-cjk 80
    python <wailan_agent>/skills/course-intro/check_overflow.py slides --out slides/_qa/overflow.json
"""
import json
import pathlib
import re
import subprocess
import sys

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[1]                      # repo 根
SLIDES = ROOT / 'slides'
DATA_JS = ROOT / 'workflow-data.js'
SAMPLE = ROOT / 'data' / 'sample-analysis.json'

FOOTER = '從學習證據到教學改進｜2026-10-16'
SEAL = 'AI 協作團隊'
DARK_PAGES = {2, 11, 16}   # 開場那一句、三句結論、收尾（2026-10-02 簡化：20 → 16 頁）
# 字型跟全站同一組（定稿樣稿 D）：Noto Serif TC 900 當展示字、Noto Sans TC 當內文。本機有裝就用本機的，沒有就從這裡拿；
# 兩邊都沒有時 deck.css 的字型堆疊退到系統字（display=swap：字會換、版不會壞）。
FONTS_CSS = 'https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@500;700;900&family=Noto+Sans+TC:wght@400;500;700;900&display=swap'
# 四塊對四色（跟入口頁議程表 .badge.b1–b4、deck.css 檔頭同一個對應）：第一塊黃、第二塊橘、第三塊綠、第四塊紫
BLOCK_FILL = {'B1': 'f-y', 'B2': 'f-c', 'B3': 'f-a', 'B4': 'f-l'}
# 落差圖「離 0 遠」的門檻（絕對值 ≥ 這個數就標紅）。工作台 studio.html 的 `var FAR = 4`（圖例、長條、排序表共用）
# 跟這裡必須同一個數字，不然老師兩邊對照會以為自己看錯；資料源目前沒有這個欄位（可考慮加 meta.farGap 讓兩邊都讀它），
# 在那之前改門檻要兩邊一起改。
FAR_GAP = 4   # 預設值；load_flow() 之後改讀資料源 meta.farGap（工作台 studio.html 讀同一個欄位）

# 工作台的分頁與按鈕名稱（講義、投影片、工作台三處一字不差）——跟 deck.js 的 UI 陣列同一份
UI = ['Rubric 工作台', '證據儀表板', '一頁設計',
      '複製', '看範例輸出', '比較兩版', '匯出這一輪', '抽 3 筆回查', '匯出抽查紀錄', '帶入示範課', '匯出 Markdown', '講師模式', '清除暫存',
      '為什麼改', '三句結論']


# ───────────────────────── 資料源 ─────────────────────────
def load_flow():
    out = subprocess.check_output(['node', str(HERE / 'dump_flow.js'), str(DATA_JS)])
    return json.loads(out.decode('utf-8'))


FLOW = load_flow()
FAR_GAP = int(FLOW.get('meta', {}).get('farGap', FAR_GAP))
SAMPLES = json.loads(SAMPLE.read_text(encoding='utf-8'))


def get(obj, path):
    o = obj
    for k in path.split('.'):
        if o is None:
            return None
        if isinstance(o, list):
            try:
                o = o[int(k)]
            except (ValueError, IndexError):
                return None
        elif isinstance(o, dict):
            o = o.get(k)
        else:
            return None
    return o


# ───────────────────── 填字規則（與 deck.js 相同） ─────────────────────
def esc(s):
    return (str(s).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
            .replace('"', '&quot;').replace("'", '&#39;'))


def ui(s):
    def rep(m):
        x = m.group(1)
        return '「<span class="ui">' + x + '</span>」' if x in UI else m.group(0)
    return re.sub(r'「([^」]+)」', rep, esc(s))


TOK = re.compile(r'[A-Za-z0-9][A-Za-z0-9\-_.…/]*|\s|[\s\S]')
CLOSE = re.compile(r'[」』）》〉】〕。，、；：！？…]')
OPEN = re.compile(r'[「『（《〈【〔]')


def wrap(s, mx):
    """中文 10 格、英數 6 格、空白 5 格；英數連成一串不拆（整數算，跟 deck.js 一模一樣）。"""
    units = mx * 10
    tokens = []
    for m in TOK.finditer(str(s)):
        t = m.group(0)
        if re.match(r'[A-Za-z0-9]', t):
            w = 6 * len(t)
        elif re.fullmatch(r'\s', t):
            w = 5
        else:
            w = 10
        tokens.append((t, w))
    # 行首不放閉引號與句讀，行尾不留開引號（跟 deck.js 一模一樣）
    lines, cur, curw = [], '', 0
    for t, w in tokens:
        if cur and curw + w > units and not CLOSE.fullmatch(t):
            carry, carryw = '', 0
            if OPEN.fullmatch(cur[-1:]):
                carry, carryw = cur[-1], 10
                cur = cur[:-1]
            if cur:
                lines.append(cur)
            cur, curw = carry, carryw
        if not cur and re.fullmatch(r'\s', t):
            continue
        cur += t
        curw += w
    if cur:
        lines.append(cur)
    return lines


def tspans(lines, x):
    return ''.join(f'<tspan x="{esc(x)}" dy="{"0" if i == 0 else "1.4em"}">{esc(ln)}</tspan>' for i, ln in enumerate(lines))


def text_px(s, px):
    """估文字寬（跟 wrap() 同一套權重：中文 10 格、英數 6 格、空白 5 格）換成像素。"""
    units = 0
    for m in TOK.finditer(str(s)):
        t = m.group(0)
        units += 6 * len(t) if re.match(r'[A-Za-z0-9]', t) else (5 if re.fullmatch(r'\s', t) else 10)
    return units / 10 * px


SIZES = [('t-lg', 21), ('t-md', 19), ('t-sm', 17), ('t-xs', 15)]


def fit_cls(s, avail, start='t-lg'):
    """圖裡格子標題的字級：從 start 往下找，第一個在 avail 像素內放得下的；最小 15px 不再縮（設計審查 2026-10-02）。
    2026-10-04 換新風格後格子有 1.5px 墨框，字貼到框線會被看見（議程「有紀錄的課程資料夾」、流程「同意／不同意／為什麼」），所以量一次。"""
    sizes = SIZES[[c for c, _ in SIZES].index(start):]
    for cls, px in sizes:
        if text_px(s, px) <= avail:
            return cls
    return sizes[-1][0]


def resolve(path, sep=None, part=0, rx=None, nth=0):
    v = get(FLOW, path)
    if v is None:
        return None
    v = str(v)
    if sep:
        parts = v.split(sep)
        if part >= len(parts):
            return None
        v = parts[part]
    if rx:
        ms = list(re.finditer(rx, v))
        if nth >= len(ms):
            return None
        v = ms[nth].group(1)
    return v


def fill(tag, path, cls='', attrs='', sep=None, part=None, rx=None, nth=None, wrap_=None):
    """<tag data-fill="path" …>烤好的字</tag>；deck.js 執行期會用同一組屬性再填一次。"""
    v = resolve(path, sep, part or 0, rx, nth or 0)
    if v is None:
        sys.exit(f'data-fill 找不到：{path} sep={sep} part={part} rx={rx} nth={nth}')
    a = f' data-fill="{esc(path)}"'
    if sep:
        a += f' data-sep="{esc(sep)}"'
    if part is not None:
        a += f' data-part="{part}"'
    if rx:
        a += f' data-rx="{esc(rx)}"'
    if nth is not None:
        a += f' data-nth="{nth}"'
    if wrap_:
        a += f' data-wrap="{wrap_}"'
        m = re.search(r'\bx="([^"]*)"', attrs)
        inner = tspans(wrap(v, wrap_), m.group(1) if m else '0')
    else:
        inner = esc(v)
    c = f' class="{cls}"' if cls else ''
    return f'<{tag}{c}{a}{(" " + attrs) if attrs else ""}>{inner}</{tag}>'


PLACEHOLDER = re.compile(r'\{\{\s*([^}|]+?)\s*(?:\|\s*(\w+))?\s*\}\}')


def render_item(tpl, item, idx):
    def rep(m):
        key, filt = m.group(1), m.group(2)
        v = str(idx + 1) if key == '@n' else get(item, key)
        if v is None:
            return ''
        if filt == 'ui':
            return ui(v)
        if filt == 'join':
            return esc('、'.join(v) if isinstance(v, list) else v)
        return esc(v)
    return PLACEHOLDER.sub(rep, tpl)


def sum_fill(tag, path, where=None, attrs=''):
    """<tag data-sum="agenda.minutes" data-where="mode=動手">104</tag>：把陣列某欄加總。
    deck.js 執行期用同一組屬性再加一次，所以議程分鐘數改了不必重 build。"""
    *arr, field = path.split('.')
    items = get(FLOW, '.'.join(arr))
    if not isinstance(items, list):
        sys.exit(f'data-sum 不是陣列：{path}')
    wk, wv = where.split('=', 1) if where else (None, None)
    total = sum((it.get(field) or 0) for it in items if not wk or str(it.get(wk)) == wv)
    a = f' data-sum="{esc(path)}"' + (f' data-where="{esc(where)}"' if where else '')
    return f'<{tag}{a}{(" " + attrs) if attrs else ""}>{total}</{tag}>'


def render_list(path, tpl, tag='ol', cls='steps'):
    items = get(FLOW, path)
    if not isinstance(items, list):
        sys.exit(f'data-list 不是陣列：{path}')
    out = ''.join(render_item(tpl, it, i) for i, it in enumerate(items))
    return f'<{tag} class="{cls}" data-list="{esc(path)}"><template>{tpl}</template>{out}</{tag}>'


def pairs(text):
    s = str(text)
    i = s.find('。')
    intro = s[:i + 1] if i >= 0 else ''
    rest = s[i + 1:] if i >= 0 else s
    rest = re.sub(r'。\s*$', '', rest)
    rows = [p.split(' → ') for p in rest.split('；')]
    return intro, [r for r in rows if len(r) == 2]


def render_pairs(path):
    v = get(FLOW, path)
    intro, rows = pairs(v)
    body = ''.join(f'<div class="l">{esc(a.strip())}</div><div class="ar">→</div><div class="r">{esc(b.strip())}</div>' for a, b in rows)
    return f'<div class="map" data-pairs="{esc(path)}">{body}</div>'


# ───────────────────────── 頁面殼 ─────────────────────────
ARCS = ('<div class="arc" style="width:520px;height:520px;right:-150px;top:-160px"></div>'
        '<div class="arc" style="width:340px;height:340px;right:-60px;top:-40px;border-color:rgba(230,242,242,.10)"></div>')


def page(n, kicker, title, body, figure=None, cover=False, title_cls='title', title_attrs=''):
    light = n not in DARK_PAGES
    if cover:
        cls = 'slide cover'
    else:
        cls = 'slide slide--light' if light else 'slide slide--dark'
    fig = f' data-figure="{figure}"' if figure else ''
    plain = re.sub(r'<[^>]+>', '', title)
    head = '' if cover else (f'<div class="kicker">{kicker}</div>'
                             f'<div class="{title_cls}"{(" " + title_attrs) if title_attrs else ""}>{title}</div><hr class="rule">')
    arcs = '' if (light or cover) else ARCS
    foot = '' if cover else f'<div class="footer-org">{FOOTER}</div><div class="seal">{SEAL}</div>'
    return f'''<!DOCTYPE html>
<html lang="zh-Hant-TW">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=1280">
<title>{n:02d}｜{esc(plain)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="{FONTS_CSS}">
<link rel="stylesheet" href="deck.css">
</head>
<body data-page="{n}">
<div class="{cls}"{fig}>{arcs}
{head}
{body}
{foot}
</div>
<script src="../workflow-data.js"></script>
<script src="deck.js"></script>
</body>
</html>
'''


def bar(text, tag='檢查點', gold=False):
    return f'<div class="bar{" gold" if gold else ""}"><b class="tag">{tag}</b><span>{text}</span></div>'


# ───────────────────────── 自繪圖（inline SVG） ─────────────────────────
def svg(w, h, inner, cls=''):
    return f'<svg class="{cls}" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img" xmlns="http://www.w3.org/2000/svg">{inner}</svg>'


def arrow_h(x1, x2, y, cls='f-ink', stroke='s-ink'):
    return (f'<line x1="{x1}" y1="{y}" x2="{x2 - 10}" y2="{y}" class="{stroke}" stroke-width="3"/>'
            f'<polygon points="{x2 - 12},{y - 8} {x2},{y} {x2 - 12},{y + 8}" class="{cls}"/>')


def fig_agenda():
    ag = FLOW['agenda']
    total = sum(a['minutes'] for a in ag)
    per = 1088 / total
    parts = []
    x = 0.0
    y, h = 48, 72
    hands = 0
    for i, a in enumerate(ag):
        w = a['minutes'] * per
        hand = a['mode'] == '動手'
        if hand:
            hands += a['minutes']
        # 動手的四塊各一色（BLOCK_FILL）、講／對談用沙色；每格 1.5px 墨框（D 的色塊長相）
        seg_fill = BLOCK_FILL.get(a.get('blockId'), 'f-y') if hand else 'f-sand'
        parts.append(f'<rect x="{x:.1f}" y="{y}" width="{w - 3:.1f}" height="{h}" rx="6" class="{seg_fill} s-ink" stroke-width="1.5"/>')
        parts.append(f'<line x1="{x:.1f}" y1="36" x2="{x:.1f}" y2="{y}" class="s-line" stroke-width="1.5"/>')
        # 最後一段太窄時，開始時間往上一行，免得跟右端的結束時間互疊（字級升到 15px 後會撞）
        parts.append(fill('text', f'agenda.{i}.start', 't-xs f-mist', attrs=f'x="{x + 2:.1f}" y="34"'))
        if hand:
            parts.append(fill('text', f'agenda.{i}.title', 't-sm f-ink', attrs=f'x="{x + 12:.1f}" y="{y + 24}" opacity=".8"', sep='・', part=0))
            title_cls = fit_cls(resolve(f'agenda.{i}.title', sep='・', part=1) or '', w - 21)   # 格寬扣左 12、右 6、縫 3
            parts.append(fill('text', f'agenda.{i}.title', f'{title_cls} t-b f-ink', attrs=f'x="{x + 12:.1f}" y="{y + 52}"', sep='・', part=1))
            parts.append(f'<text x="{x + 12:.1f}" y="158" class="t-sm t-b f-red">帶走</text>')
            parts.append(fill('text', f'agenda.{i}.takeaway', 't-md', attrs=f'x="{x + 12:.1f}" y="184"', wrap_=max(6, int((w - 24) / 20))))
        else:
            parts.append(fill('text', f'agenda.{i}.title', 't-lg t-b t-c', attrs=f'x="{x + (w - 3) / 2:.1f}" y="{y + 43}"'))
        x += w
    parts.append(f'<line x1="1088" y1="36" x2="1088" y2="{y}" class="s-line" stroke-width="1.5"/>')
    # 最後一段太窄（收尾 8 分鐘）時，結束時間放到長條下方右端，免得跟最後一段的開始時間互疊
    end_y = 150 if ag[-1]['minutes'] * per < 100 else 34
    parts.append(fill('text', f'agenda.{len(ag) - 1}.end', 't-xs f-mist t-e', attrs=f'x="1088" y="{end_y}"'))
    # 圖例與合計（合計用 data-sum 綁資料源，deck.js 執行期會再加一次；格子寬度仍是建置時算的，議程改了還是要重 build 才會重排）
    # 圖例「動手」＝四色直條（四塊各一色）外加墨框；「講／對談」＝沙色
    parts.append('<rect x="0" y="262" width="4.5" height="18" class="f-y"/><rect x="4.5" y="262" width="4.5" height="18" class="f-c"/>'
                 '<rect x="9" y="262" width="4.5" height="18" class="f-a"/><rect x="13.5" y="262" width="4.5" height="18" class="f-l"/>'
                 '<rect x="0" y="262" width="18" height="18" rx="3" class="f-none s-ink" stroke-width="1.5"/><text x="26" y="276" class="t-sm">動手</text>')
    parts.append('<rect x="88" y="262" width="18" height="18" rx="3" class="f-sand s-ink" stroke-width="1.5"/><text x="114" y="276" class="t-sm">講／對談</text>')
    parts.append('<text x="1088" y="276" class="t-sm f-mist t-e">動手合計 '
                 + sum_fill('tspan', 'agenda.minutes', where='mode=動手')
                 + ' 分鐘｜全場 ' + sum_fill('tspan', 'agenda.minutes') + ' 分鐘</text>')
    return svg(1088, 288, ''.join(parts))


def fig_timeline():
    xs = [130, 400, 670, 940]
    # 時間線墨色；第 3 版還沒發生，虛線＋次要色
    parts = [f'<line x1="40" y1="110" x2="{xs[2]}" y2="110" class="s-ink" stroke-width="4"/>',
             f'<line x1="{xs[2]}" y1="110" x2="1048" y2="110" class="s-mist dash" stroke-width="4"/>']
    tops = [
        fill('text', 'blocks.0.steps.1.say', 't-lg t-b t-c', attrs=f'x="{xs[0]}" y="62"', rx='「(.+?)」'),
        fill('text', 'blocks.0.steps.3.say', 't-lg t-b t-c', attrs=f'x="{xs[1]}" y="62"', rx='「(.+?)」'),
        f'<text x="{xs[2]}" y="62" class="t-lg t-b t-c">第 2 版：你改過的那一格</text>',
        f'<text x="{xs[3]}" y="62" class="t-lg t-b t-c f-mist">第 3 版（下學期）</text>',
    ]
    times = ['第一塊・第 2 步', '第一塊・第 4 步', '第二塊・最後一步', '兩人同評之後']
    whys = [
        '<text x="{x}" y="196" class="t-sm"><tspan x="{x}" dy="0">先放一個空殼——</tspan><tspan x="{x}" dy="1.4em">先有東西，才改得動。</tspan></text>',
        '<text x="{x}" y="196" class="t-sm"><tspan x="{x}" dy="0">四個規準各一行，</tspan><tspan x="{x}" dy="1.4em">前後對照看過才存。</tspan></text>',
        None,
        '<text x="{x}" y="196" class="t-sm"><tspan x="{x}" dy="0">兩位老師同評、算一致性，</tspan><tspan x="{x}" dy="1.4em">不一致的格子回頭改。</tspan></text>',
    ]
    # 版本點：存過的湖水綠、你改過的那一版芥末黃（D 插圖的同一個語意）、還沒發生的第 3 版空心虛線
    dots = ['f-a s-ink', 'f-a s-ink', 'f-y s-ink', 'f-card s-mist dash']
    for i, x in enumerate(xs):
        last = i == 3
        parts.append(f'<circle cx="{x}" cy="110" r="14" class="{dots[i]}" stroke-width="{3 if last else 4}"/>')
        parts.append(tops[i])
        parts.append(f'<text x="{x}" y="86" class="t-sm f-mist t-c">{times[i]}</text>')
        parts.append(f'<rect x="{x - 125}" y="146" width="250" height="96" rx="6" class="f-card s-ink" stroke-width="1.5"/>')
        parts.append(f'<text x="{x - 110}" y="172" class="t-xs t-b f-red">為什麼改</text>')
        if whys[i] is None:
            parts.append(fill('text', 'examples.presentation.whyChanged', 't-sm', attrs=f'x="{x - 110}" y="196"', wrap_=13))   # 卡寬 250、左留 15：17px 一行 13 字（16 字會出框 37px）
        else:
            parts.append(whys[i].format(x=x - 110))
    return svg(1088, 252, ''.join(parts))


def fig_rubric_diff():
    ex = FLOW['examples']['presentation']
    crit = ex['criteria']
    m = re.search(r'「([^」]*?)・', ex['disagreeExample'])
    hi = crit.index(m.group(1)) if m and m.group(1) in crit else 2
    parts = []
    # 第 1 版（AI 起草、有你不同意的那一格）＝珊瑚橘：淡底表頭、那一格實心；第 2 版（你改過）＝湖水綠，同樣一淡一實
    for side, x0, head_fill, row_fill, tag_cls, title in [(0, 0, 'f-c-soft', 'f-c', 'f-c-deep', '第 1 版・AI 起草'),
                                                          (1, 608, 'f-a-soft', 'f-a', 'f-a-deep', '第 2 版・你改過')]:
        parts.append(f'<rect x="{x0}" y="0" width="480" height="268" rx="6" class="f-card s-ink" stroke-width="1.5"/>')
        parts.append(f'<path d="M{x0 + 6},0 h468 a6,6 0 0 1 6,6 v38 h-480 v-38 a6,6 0 0 1 6,-6 z" class="{head_fill}"/>')
        parts.append(f'<line x1="{x0}" y1="44" x2="{x0 + 480}" y2="44" class="s-ink" stroke-width="1.5"/>')
        parts.append(f'<text x="{x0 + 20}" y="30" class="t-lg t-b">{title}</text>')
        if side == 0:
            parts.append(fill('text', 'examples.presentation.disagreeExample', f't-sm t-b {tag_cls} t-e', attrs=f'x="{x0 + 460}" y="30"', rx='——(.+?)。'))
        else:
            parts.append(f'<text x="{x0 + 460}" y="30" class="t-sm t-b {tag_cls} t-e">看得見、數得出</text>')
        for k, c in enumerate(crit):
            y = 44 + k * 56
            parts.append(f'<line x1="{x0 + 16}" y1="{y + 56}" x2="{x0 + 464}" y2="{y + 56}" class="s-line" stroke-width="1" opacity=".8"/>')
            parts.append(fill('text', f'examples.presentation.criteria.{k}', 't-md t-b', attrs=f'x="{x0 + 20}" y="{y + 35}"'))
            if k == hi:
                # 那一格從 x0+112 到 x0+470（第 2 版那句 19px 要 342px 寬，原本 344 寬、字從 +130 起會出框 8px）
                parts.append(f'<rect x="{x0 + 112}" y="{y + 9}" width="358" height="38" rx="4" class="{row_fill} s-ink" stroke-width="1.5"/>')
                if side == 0:
                    parts.append(fill('text', 'examples.presentation.disagreeExample', 't-md', attrs=f'x="{x0 + 120}" y="{y + 34}"', rx='「[^」]*?・(.+?)」', nth=0))
                else:
                    parts.append(fill('text', 'examples.presentation.disagreeExample', 't-md', attrs=f'x="{x0 + 120}" y="{y + 34}"', rx='改成「(.+?)」', nth=0))
            else:
                parts.append(f'<text x="{x0 + 130}" y="{y + 34}" class="t-md f-mist">4 級 … 3 級 … 2 級 … 1 級</text>')
    parts.append(arrow_h(492, 604, 134))
    parts.append('<text x="544" y="120" class="t-sm t-b f-red t-c">改這一格</text>')
    parts.append('<text x="0" y="304" class="t-md t-b f-red">為什麼改</text>')
    parts.append(fill('text', 'examples.presentation.whyChanged', 't-md', attrs='x="84" y="304"'))
    return svg(1088, 316, ''.join(parts))


def fig_gap():
    s = SAMPLES['project-presentation']
    gaps = s['gaps']
    n = len(gaps)
    left, right, zero, scale = 60, 1068, 135, 85 / 8
    gw = (right - left) / n
    parts = []
    for v, lab in [(8, '+8'), (4, '+4'), (0, '0'), (-4, '−4'), (-8, '−8')]:
        yy = zero - v * scale
        if v in (4, -4):
            parts.append(f'<line x1="{left}" y1="{yy:.1f}" x2="{right}" y2="{yy:.1f}" class="s-line dash" stroke-width="1"/>')
        parts.append(f'<text x="{left - 8}" y="{yy + 4:.1f}" class="t-xs f-mist t-e">{lab}</text>')
    parts.append(f'<line x1="{left}" y1="{zero}" x2="{right}" y2="{zero}" class="s-ink" stroke-width="1.5"/>')
    for i, g in enumerate(gaps):
        gx = left + i * gw
        for j, (key, base) in enumerate([('self_minus_teacher', 'f-a'), ('peer_minus_teacher', 'f-y')]):   # 自評湖水綠、互評芥末黃（跟圖例同色）
            v = g[key]
            bx = gx + 5 + j * 17
            cls = base + (' far' if abs(v) >= FAR_GAP else '')   # 保留系列色、加紅框（設計審查：紅色吃掉系列色就分不出自評／互評）
            if v == 0:
                parts.append(f'<rect x="{bx:.1f}" y="{zero - 1}" width="15" height="2" class="{cls}"/>')
            elif v > 0:
                parts.append(f'<rect x="{bx:.1f}" y="{zero - v * scale:.1f}" width="15" height="{v * scale:.1f}" class="{cls}"/>')
            else:
                parts.append(f'<rect x="{bx:.1f}" y="{zero}" width="15" height="{-v * scale:.1f}" class="{cls}"/>')
        code = g['student_id'].replace('DEMO-', '')
        flag = g.get('flag')
        parts.append(f'<text x="{gx + gw / 2:.1f}" y="250" class="t-xs t-c{" t-b f-red" if flag else " f-mist"}">{esc(code)}</text>')
    parts.append('<rect x="60" y="8" width="14" height="14" rx="3" class="f-a"/><text x="80" y="20" class="t-xs">自評 − 教師</text>')
    parts.append('<rect x="172" y="8" width="14" height="14" rx="3" class="f-y"/><text x="192" y="20" class="t-xs">互評 − 教師</text>')
    parts.append(f'<rect x="284" y="8" width="14" height="14" rx="3" class="f-none far"/><text x="304" y="20" class="t-xs">差 {FAR_GAP} 分以上</text>')
    parts.append('<text x="1068" y="20" class="t-xs f-mist t-e">課堂專題簡報・24 筆合成示範資料（代號 DEMO-S01…）；紅字代號＝答案卡有話要說</text>')
    return svg(1088, 262, ''.join(parts))


def fig_check():
    """AI 分析＋人工抽查流程：五格的字從 blocks[2].steps 綁（data-fill＋data-rx），deck.js 執行期用同一組屬性再填；
    只有第 1 格標題「AI 分類、找落差」、第 5 格標題「存一版」與中間三格的底下說明是散文（不得跟步驟矛盾）。"""
    S = 'blocks.2.steps'
    w, gap, y, h = 190, 34.5, 40, 90
    ly = y + h / 2 + 6
    cxs = [f'{k * (w + gap) + w / 2:.1f}' for k in range(5)]

    def label(k, path, rx):
        cls = fit_cls(resolve(path, rx=rx) or '', w - 16, 't-md')   # 格寬 190、左右各留 8
        return fill('text', path, f'{cls} t-b t-c', attrs=f'x="{cxs[k]}" y="{ly}"', rx=rx)

    def cap(k, path, rx=None, wrap_=10):
        return fill('text', path, 't-sm f-mist t-c', attrs=f'x="{cxs[k]}" y="158"', rx=rx, wrap_=wrap_)

    def prose_label(k, text):
        return f'<text x="{cxs[k]}" y="{ly}" class="{fit_cls(text, w - 16, "t-md")} t-b t-c">{esc(text)}</text>'

    def prose_cap(k, text):
        return f'<text x="{cxs[k]}" y="158" class="t-sm f-mist t-c">{tspans(wrap(text, 12), cxs[k])}</text>'

    boxes = [
        # (角色, 格子標題, 格子樣式, 底下說明)
        # AI 助手的格子＝湖水綠淡底、你的格子＝芥末黃淡底（講義三欄步驟卡同一個對應），都 1.5px 墨框
        ('AI 助手', prose_label(0, 'AI 分類、找落差'), 'f-a-soft s-ink', cap(0, f'{S}.0.ai')),
        ('你', label(1, f'{S}.2.say', '「(.+?)」'), 'f-y-soft s-ink', prose_cap(1, '在工作台「證據儀表板」按，可以重抽')),
        ('你', label(2, f'{S}.2.human', '寫「(.+?)」'), 'f-y-soft s-ink', prose_cap(2, '讀原始反思、看三個分數再判斷')),
        ('你', label(3, f'{S}.3.say', '「(.+?)」'), 'f-y-soft s-ink', prose_cap(3, '證據是…／下次要改…／再蒐集…')),
        ('AI 助手', prose_label(4, '存一版'), 'f-a-soft s-ink', cap(4, f'{S}.4.say', rx='版本說明寫[：「](.+?)」', wrap_=10)),
    ]
    parts = []
    for k, (role, lab, cls, capt) in enumerate(boxes):
        x = k * (w + gap)
        parts.append(f'<rect x="{x:.1f}" y="{y}" width="{w}" height="{h}" rx="6" class="{cls}" stroke-width="1.5"/>')
        parts.append(f'<text x="{cxs[k]}" y="26" class="t-xs t-b f-mist t-c">{esc(role)}</text>')
        parts.append(lab)
        parts.append(capt)
        if k < 4:
            parts.append(arrow_h(x + w + 4, x + w + gap - 2, y + h / 2))
    return svg(1088, 212, ''.join(parts))


def fig_onepage():
    rows = FLOW['designFields']
    # 第四塊＝薰衣草紫：表頭淡紫、1.5px 墨框
    parts = ['<rect x="6" y="6" width="508" height="406" rx="6" class="f-card s-ink" stroke-width="1.5"/>',
             '<path d="M12,6 h496 a6,6 0 0 1 6,6 v42 h-508 v-42 a6,6 0 0 1 6,-6 z" class="f-l-soft"/>',
             '<line x1="6" y1="54" x2="514" y2="54" class="s-ink" stroke-width="1.5"/>',
             '<text x="24" y="37" class="t-md t-b">一頁「評量—回饋—教學調整—研究」設計</text>']
    y0, rh = 66, 31
    for i in range(len(rows)):
        yy = y0 + i * rh
        parts.append(fill('text', f'designFields.{i}.label', 't-sm t-b', attrs=f'x="24" y="{yy + 22}"'))
        parts.append(fill('text', f'designFields.{i}.planLabel', 't-xs f-mist t-e', attrs=f'x="496" y="{yy + 22}"'))
        if i < len(rows) - 1:
            parts.append(f'<line x1="18" y1="{yy + 32}" x2="502" y2="{yy + 32}" class="s-line" stroke-width="1" opacity=".8"/>')
    return svg(520, 418, ''.join(parts))


def fig_records():
    parts = []

    def box(x, y, w, h, cls, tag, lines, tag_cls='f-a-deep'):
        out = [f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="6" class="{cls}" stroke-width="1.5"/>',
               f'<text x="{x + 18}" y="{y + 28}" class="t-xs t-b {tag_cls}">{esc(tag)}</text>']
        for i, ln in enumerate(lines):
            out.append(f'<text x="{x + 18}" y="{y + 52 + i * 22}" class="t-sm{" t-b" if i == 0 else " f-mist"}">{esc(ln)}</text>')
        return ''.join(out)

    # 兩種紀錄（暖白卡）→ 匯成一條時間線（湖水綠淡底）→ 寫計畫書時（芥末黃淡底）；連接線與箭頭墨色
    parts.append(box(0, 16, 380, 92, 'f-card s-ink', '工作坊當天（AI 助手存的）', ['版本清單（git log）', '每一筆：時間、說明、前後對照']))
    parts.append(box(0, 140, 380, 92, 'f-card s-ink', '課後用 GitHub 網頁版上傳', ['匯出 Markdown → 網頁上傳', '每一筆：時間、說明（Commit history）'], 'f-red'))
    parts.append('<path d="M380,62 C430,62 430,124 480,124" class="f-none s-ink" stroke-width="3"/>')
    parts.append('<path d="M380,186 C430,186 430,124 480,124" class="f-none s-ink" stroke-width="3"/>')
    parts.append('<polygon points="478,116 492,124 478,132" class="f-ink"/>')
    parts.append(box(494, 78, 300, 92, 'f-a-soft s-ink', '到最後長一樣', ['一條時間線', '什麼時候、改了什麼、為什麼']))
    parts.append(arrow_h(800, 846, 124))
    parts.append(box(850, 78, 238, 92, 'f-y-soft s-ink', '寫計畫書時', ['整理成一張表', '＝研究歷程資料'], 'f-red'))
    return svg(1088, 248, ''.join(parts))


# ───────────────────────── 16 頁（2026-10-02 簡化：拿掉自己發明的名詞標籤，內容全留） ─────────────────────────
def p01():
    m = FLOW['meta']
    body = f'''<div class="inner">
<div class="kicker ckicker">教師工作坊｜{fill('span', 'meta.date')}</div>
<div class="title ctitle">{fill('span', 'meta.title')}</div>
<div class="csub">{fill('span', 'meta.subtitle')}</div>
<div class="cpromise">{fill('span', 'meta.tagline')}</div>
<div class="chips"><span>四塊全部動手</span><span>AI agent 代打</span><span>示範資料、不碰真實學生</span></div>
<div class="cmeta"><b>{fill('span', 'meta.date')}</b> {fill('span', 'meta.time')}｜{fill('span', 'meta.venue')}<br>{fill('span', 'meta.speaker')}</div>
</div>
{COVER_ART}
<div class="footer-org">主辦：{fill('span', 'meta.host')}</div>'''
    return page(1, '', '封面', body, cover=True)


# 封面右側的細線小插圖（定稿樣稿 D 刊頭那張；純圖形、無文字）：資料夾裡的評分表、被改掉的那一列、三個版本點。
# 顏色全走 deck.css 的 .f-*／.s-* 類別（薰衣草資料夾、珊瑚橘那一列、芥末黃鉛筆、湖水綠版本點、墨色線條），不硬編色碼。
COVER_ART = ('<svg class="cover-art" viewBox="0 0 320 250" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">'
             '<path d="M24 70h70l16 18h120a10 10 0 0 1 10 10v108a10 10 0 0 1-10 10H34a10 10 0 0 1-10-10V80a10 10 0 0 1 10-10z" class="f-l"/>'
             '<path d="M24 100h216"/>'
             '<rect x="95" y="49" width="176" height="176" rx="6" class="f-ink ns"/>'
             '<rect x="92" y="46" width="176" height="176" rx="6" class="f-card"/>'
             '<rect x="108" y="62" width="70" height="10" rx="2" class="f-ink ns"/>'
             '<path d="M108 98h144M108 150h144M108 176h144M108 202h110"/>'
             '<rect x="104" y="112" width="152" height="24" rx="4" class="f-c"/>'
             '<path d="M112 124h112" stroke-width="3"/>'
             '<g transform="rotate(-38 236 128)"><rect x="226" y="60" width="20" height="104" rx="4" class="f-y"/>'
             '<path d="M226 164l10 24 10-24z" class="f-card"/><path d="M226 80h20"/></g>'
             '<path d="M40 232h116" stroke-width="3"/>'
             '<circle cx="44" cy="232" r="10" class="f-a"/><circle cx="98" cy="232" r="10" class="f-a"/><circle cx="152" cy="232" r="10" class="f-y"/>'
             '<path d="M147 232l4 4 7-8"/>'
             '</svg>')


def p02():
    body = f'''<div class="vis">
<div class="quote">「我根據證據調整了教學。」</div>
<div class="cols cols-3" style="margin-top:10px">
<div class="card"><div class="n">1</div><div class="p">最難寫的一段不是沒做，是做了沒留下來。</div></div>
<div class="card"><div class="n">2</div><div class="p">版本紀錄本來就在做這件事：改了哪裡、什麼時候、怎麼想，全在。</div></div>
<div class="card accent"><div class="n">3</div><div class="p">今天的目標：{fill('b', 'meta.tagline')}</div></div>
</div>
</div>
{bar(fill('span', 'redlines.0.text'), '先講一件事', gold=True)}'''
    return page(2, '開場 · WHY', '研究最難拿出來的一段', body)


def p03():
    # 行前裝好／裝不起來怎麼辦，併成副標一句（資料源 routes[0]：label 與 rescue 的白話版，不另立節名）
    body = f'''<div class="subtitle">行前把 AI 助手裝好，當天每一步它代打；真的裝不起來，提早 20 分鐘到會議室一起裝。</div>
<div class="vis">
<div class="three">
<div class="card"><div class="n">① 你說</div><div class="p">每一步只說一句話，不背指令。</div></div>
<div class="ar">→</div>
<div class="card"><div class="n">② AI 助手做</div><div class="p">建資料夾、存版本、列前後對照、做分析。</div></div>
<div class="ar">→</div>
<div class="card accent"><div class="n">③ 你看</div><div class="p">只看它的計畫、看它改完的前後對照、然後點頭。</div></div>
</div>
</div>
{bar(fill('span', 'meta.aiRule'), '原則')}'''
    return page(3, '開場 · HOW', '今天的做法：你說一句、AI 助手做、你看過才點頭', body)


def p04():
    body = f'''<div class="vis">{fig_agenda()}</div>
{bar('四塊全部自己動手；講師先做一遍，大家跟著做。', '節奏')}'''
    return page(4, '開場 · AGENDA', '兩小時、四塊、每塊帶走一樣東西', body, figure='F-agenda')


def p05():
    body = f'''<div class="subtitle">版本控制工具（Git）幫一個資料夾記住每一次修改：一門課一個資料夾，每改一次存一版、寫一句為什麼改。</div>
<div class="vis">{fig_timeline()}</div>
{bar('你不必背指令：交給 AI 助手代打，你看計畫、看前後對照、點頭。', '分工')}'''
    return page(5, '第一塊 · BLOCK 1', f'第一塊・{fill("span", "blocks.0.title")}', body, figure='F-timeline')


def p06():
    items = []
    for k in range(4):
        items.append(f'<li><span class="n">{k + 1}</span><div class="body"><div class="say"><span class="name">AI 做：</span>{fill("span", f"blocks.0.steps.{k}.ai")}</div>'
                     f'{fill("div", f"blocks.0.steps.{k}.human", cls="human")}</div></li>')
    body = f'''<div class="subtitle">AI 說做完，不等於做完——每一步都有你一定要自己看的。</div>
<div class="vis vis--top"><ol class="steps">{''.join(items)}</ol></div>'''
    return page(6, '第一塊 · FOUR STEPS', '四步、每步一句話；你說的那句在講義第參章', body)


def p07():
    # 全場那一句（meta.rule）併進這頁的 bar：粗體、不另立一頁、不貼標籤
    body = f'''<div class="subtitle">評分規準表（Rubric）不是一次寫對的，是被學生的表現磨出來的。</div>
<div class="vis">{fig_rubric_diff()}</div>
{bar(f'{fill("b", "meta.rule")}<br>AI 起草的第一版一定有你不同意的句子，那一句就是今天的第一筆調整紀錄。', '重點', gold=True)}'''
    return page(7, '第二塊 · BLOCK 2', f'第二塊・{fill("span", "blocks.1.title")}', body, figure='F-rubric-diff')


def p08():
    tpl = '<li><span class="n">{{@n}}</span><div class="body"><div class="say">{{say|ui}}</div></div></li>'
    body = f'''<div class="vis vis--top">{render_list('blocks.1.steps', tpl, cls='steps steps--lg')}</div>'''
    return page(8, '第二塊 · STEPS', '起草 → 不同意 → 審查者 → 第 2 版 → 存一版', body)


def p09():
    body = f'''<div class="subtitle">自評、互評、老師評分三種分數的落差，本身就是教學訊號。</div>
<div class="vis">{fig_gap()}
<div class="cols cols-2" style="gap:14px">
<div class="card" style="padding:12px 18px"><div class="p" style="margin-top:0">自評遠高於教師分 → 學生多半不知道標準在哪。</div></div>
<div class="card" style="padding:12px 18px"><div class="p" style="margin-top:0">互評極低、另兩方一致 → 回查互評表，不是扣分。</div></div>
</div></div>
{bar('AI 很會找落差，但它會錯——而且錯得很有說服力。', '提醒', gold=True)}'''
    return page(9, '第三塊 · BLOCK 3', f'第三塊・{fill("span", "blocks.2.title")}', body, figure='F-gap')


def p10():
    body = f'''<div class="subtitle">研究裡站得住的，是「AI 分析＋人工抽查」一起呈現。</div>
<div class="vis">{fig_check()}
<div class="note">按<span class="ui">匯出抽查紀錄</span>——這份就是「分析信度」那一段的素材。</div></div>
{bar('沒人抽到那筆分錯的？講師最後會點出來。重點不是抓到，是你知道「要抽」。', '提醒', gold=True)}'''
    return page(10, '第三塊 · CHECK', 'AI 分析＋人工抽查，一起呈現才站得住', body, figure='F-check')


def p11():
    say = 'blocks.2.steps.3.say'
    body = f'''<div class="vis center">
<div class="lines">
<div><span class="em">1</span>　{fill('span', say, rx='：(.+?)／')}</div>
<div><span class="em">2</span>　{fill('span', say, rx='／(.+?)／')}</div>
<div><span class="em">3</span>　{fill('span', say, rx='／[^／]+／(.+)$')}</div>
</div>
<div class="big-sub">{fill('span', 'blocks.2.steps.3.human')}</div>
</div>'''
    return page(11, '第三塊 · THREE SENTENCES', '三句結論', body)


def p12():
    body = f'''<div class="vis"><div class="side">{fig_onepage()}
<div>
<p class="lead">前三塊是零件，這一塊把零件裝回你自己的課。</p>
<p class="lead" style="margin-top:18px">十一欄，標籤用計畫書的詞——填完直接長成計畫書，不用重寫。</p>
<p class="lead" style="margin-top:18px">起手式：按<span class="ui">帶入示範課</span>讓每一欄都有字，再改掉至少兩格。</p>
<p class="lead" style="margin-top:18px">必改：<b>「評量任務與 Rubric」「回饋與調整」</b>。</p>
</div></div></div>'''
    return page(12, '第四塊 · BLOCK 4', '第四塊・帶著自己的課，一頁設計', body, figure='F-onepage')


def p13():
    tpl = '<li><span class="n">{{@n}}</span><div class="body"><div class="say">{{say|ui}}</div></div></li>'
    body = f'''<div class="vis vis--top">{render_list('blocks.3.steps', tpl, cls='steps steps--lg')}</div>'''
    return page(13, '第四塊 · STEPS', '起手式：帶入示範課，再改兩格', body)


def p14():
    body = f'''<div class="vis">{fig_records()}
<div class="cols cols-2" style="gap:14px">
<div class="card" style="padding:12px 18px"><div class="p" style="margin-top:0">兩邊到最後長一樣：一條「什麼時候、改了什麼、為什麼」的時間線。</div></div>
<div class="card accent" style="padding:12px 18px"><div class="p" style="margin-top:0">寫計畫書時，把這條時間線整理成一張表，就是研究歷程資料。</div></div>
</div></div>'''
    return page(14, '收尾 · AFTER', fill('span', 'afterCourse.0.title'), body)


def p15():
    body = f'''<div class="vis">{render_pairs('afterCourse.3.text')}</div>'''
    return page(15, '收尾 · TO THE PROPOSAL', fill('span', 'afterCourse.3.title'), body)


def p16():
    body = f'''<div class="vis center">
<div class="url">{fill('span', 'meta.siteUrl')}</div>
</div>'''
    return page(16, '收尾 · NEXT MONDAY', '週一把這句存進資料夾。', body, title_cls='title title--big')


PAGES = [p01, p02, p03, p04, p05, p06, p07, p08, p09, p10, p11, p12, p13, p14, p15, p16]


def main():
    SLIDES.mkdir(exist_ok=True)
    for old in SLIDES.glob('[0-9][0-9].html'):
        old.unlink()
    for i, fn in enumerate(PAGES, 1):
        html = fn()
        (SLIDES / f'{i:02d}.html').write_text(html, encoding='utf-8', newline='\n')
    n = len(PAGES)
    idx = SLIDES / 'index.html'
    if idx.exists() and f'TOTAL = {n};' not in idx.read_text(encoding='utf-8'):
        print(f'⚠️ index.html 的 TOTAL 不是 {n}，請改播放殼')
    print(f'寫出 {n} 頁 → {SLIDES}（深底頁：{sorted(DARK_PAGES)}）')


if __name__ == '__main__':
    main()
