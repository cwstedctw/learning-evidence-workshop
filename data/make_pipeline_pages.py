# -*- coding: utf-8 -*-
"""make_pipeline_pages.py — 從 data/pipeline-stats.js（只有計數與評分表）烤出「一種作業一頁」：pipeline-<評分表代號>.html。

用法（在 repo 根目錄）：python data/make_pipeline_pages.py
導覽列、頁尾、主題腳本、頁面樣式都從 pipeline.html（總覽頁）抽出來共用，所以先有總覽頁再跑這支。
產出是靜態 HTML（數字烤死在頁面裡），改了統計檔要重跑；validate-workshop.mjs 會核每一種作業都有頁。
"""
import html, io, json, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent.parent
STATS = ROOT / "data" / "pipeline-stats.js"
OVERVIEW = ROOT / "pipeline.html"
MODE_SHORT = {"three_aligned": "三個 AI 評分者各打一份 → 平均 → 對齊到 80–100", "three_raw": "三個 AI 評分者各打一份 → 平均（原始分，不對齊）",
              "program": "程式判定", "completion": "完成度（有交就給）"}
E = html.escape

# 作業例子（學生被要求交什麼；照評分表的標題與備註整理，不引學生內容）
EXAMPLE = {
    "setup_four": "第 2 週：裝好 GitHub 帳號、Student Pack、ChatGPT 桌面版（切到 Codex）、Antigravity 四樣，四張截圖上傳，帳號名貼在線上文字。",
    "three_commits": "第 3 週：請 Antigravity 裝 git／gh，把一支小程式改三版、commit 三次、push 一次；線上文字寫四點（repo 網址、三筆 commit 訊息、貼給 AI 的原文、它做的跟它說的哪裡不一樣），附 GitHub 歷史頁截圖。",
    "e1_image_card": "第 2 週：用 AI 產一張活動宣傳圖，填 E1 判斷卡（採用／修改／拒絕＋理由、指得出圖上哪裡、下一步怎麼驗證），交卡的 PDF 與圖。",
    "ai_image_prompt_group": "第 2 週：小組各自生一張圖、照貼提示原文、寫組裡討論出什麼；一組交一份。",
    "news_check": "第 2 週：讀一則「AI 會毀滅人類」的新聞，寫你怎麼判斷、查了什麼、理由是什麼；一組交一份。",
    "antigravity_slides": "第 3 週：用 Antigravity 把第 2 週的新聞判斷簡報再做一次，交簡報、四個步驟、貼給 AI 的原文、兩版差在哪。",
    "board_photo": "第 2 週：板子接上電、跑起來，拍一張看得出在動的照片。",
    "matrix_photo": "第 3 週：SSH 進板子、請 AI 寫點陣程式，交點陣亮起來的照片（最多 3 張，不收文字）。",
    "completion": "演講課每一場一張手寫的課前／課後學習單，整張拍照上傳。",
    "linebot_v1": "第 5 週：LINE Bot 第一版，五件事：專題計畫六項、GitHub 專案、AI 做的開發紀錄網頁、簡報、實測證明與如實進度。",
    "links_required": "第 3 週：把自己做出來的第一個網頁的網址貼在線上文字。",
    "skill_slides_redo": "第 4 週：用 skill（UI UX Pro Max）把新聞判斷簡報改版，交新簡報並寫改了哪裡。",
    "tm_three_class": "第 4 週：自己選三類東西，用 Teachable Machine 訓練一個模型，交投影片與 Preview 判類截圖。",
    "wokwi_led_blink": "第 2 週：在 Wokwi 模擬器接一顆 LED（板子＋LED＋電阻），寫 MicroPython 讓它一亮一滅，交專案連結。",
    "wokwi_rhythm": "第 3 週：延續第 2 週，做出自己的閃爍節奏（兩種等待時間、或用 for／if 控制），交專案連結。",
    "wokwi_traffic_latch": "第 3 週回家：紅綠燈專案＋兩顆 NAND 接成的閂鎖去彈跳，交投影片 PDF 與 Wokwi 連結，兩題必答，最後寫遇到的問題。",
    "wokwi_traffic_modes": "第 4 週回家：紅綠燈自動／手動模式（計時器＋中斷＋去彈跳），交 Wokwi 連結與三句話。",
}
# 怎麼檢查（不只比對文字；照批改工具的實際做法寫）
CHECK_HOW = {
    "wokwi_led_blink": "程式直接抓學生交的 Wokwi 公開專案頁裡的 diagram.json 與程式碼，做靜態檢查：有沒有板子、至少一顆 LED、一顆電阻、有沒有接 GND、LED 是不是接到板子的腳位；程式有沒有「設腳位＋切換＋延時＋迴圈」這四件事。它不會真的按播放，所以證明的是「接線與程式長得對」，不是「一定會閃」；交老師示範專案的連結不算自己的。這不是比對文字，是把專案拆開來看。",
    "wokwi_rhythm": "同第 2 週的靜態檢查，再多看一格「節奏」：程式有沒有兩種以上的等待時間、或用 for／if 控制、或印出亮滅；跟示範一樣只改數字的給一半。全部由程式判定，同一份專案跑幾次都一樣。",
    "wokwi_traffic_latch": "評分者讀投影片（程式先抽文字，字太少就把頁抽成圖來看），再對照 Wokwi 專案裡程式抓到的零件與接線；「證明擋住了彈跳」要有學生自己跑出來的數字（序列埠或截圖），不是寫一句「有擋住」就算。",
    "wokwi_traffic_modes": "評分者讀 Wokwi 專案（零件、接線、程式裡有沒有計時器與中斷）與三句話；「怎麼證明沒有漏按」那一句要能對得上程式的做法。",
    "links_required": "不是看有沒有貼網址：程式真的去開每一條（等它回應、跟著轉址、最多等 15 秒），有正常回應才算活著；活著至少一條＝100、有網址但全打不開＝50、沒網址＝0。",
    "completion": "以有沒有交、準不準時計分，程式讀平台記的繳交時間，不看內容。照片判讀程式（找學習單外框、透視校正到模板、量每一區的墨水密度與勾選格的黑像素）寫好了但還在試作，尚未用於正式成績。",
    "board_photo": "只有照片、沒有文字可比對：三個 AI 用視覺看照片——板子上的燈有沒有在動。這類作業三個人最容易看法不同，所以差距大的一律送人看。",
    "matrix_photo": "只有照片：三個 AI 用視覺看點陣有沒有圖樣或文字在亮、有沒有終端機或程式碼畫面證明是自己做的。這是全學期分歧最大的一種作業，正是回頭修評分表的線索。",
    "three_commits": "評分者對照 GitHub 歷史頁截圖裡的 commit 數與訊息、線上文字列的三筆訊息對不對得上、repo 網址是不是自己的公開 repo（帳號名對得上）；三筆訊息都叫 update 最多拿 20。貼給 AI 的原文要看得出一步一步。",
    "setup_four": "四張截圖各自看：GitHub 個人頁看得到自己的帳號名、Student Pack 送出後的畫面、ChatGPT 桌面版切到 Codex、Antigravity 登入後；辦不成但寫出原因也給分。第 2 版放寬：線上文字沒填帳號名、截圖看得到也算。",
    "e1_image_card": "評分者對照 E1 卡 PDF 與圖：決定與理由是不是對照需求、指得出圖上哪裡、看得出版本改動；把固定資訊（時間、日期）當可以改的東西去改，理由再順也扣。",
    "ai_image_prompt_group": "評分者看圖、提示原文（整段照貼才算）、組裡討論的結論；同組同分，分組來源是定版分組表或共筆。",
    "news_check": "評分者看判斷與理由、查證的方式；同組同分。",
    "antigravity_slides": "程式先抽簡報的文字（PDF／PPTX），字太少的把投影片抽成圖讓評分者看，不因抽不到字就給低分；再看四個步驟、貼給 AI 的原文、兩版差在哪。",
    "skill_slides_redo": "同上：抽字、字少抽圖；再對照線上文字寫的「改了哪裡」是不是真的在新簡報上看得到。課堂交的與回家交的合併看。",
    "tm_three_class": "看投影片與 Preview 判類截圖（課堂或回家任一份都算）：三類是不是自己選的、模型有沒有真的判出來。",
    "linebot_v1": "五件事各自檢查：GitHub 連結打得開而且看得到這個 Bot 的程式、開發紀錄網頁打得開、簡報 4 頁以上、測試紀錄至少三項（測什麼、預期、實際）＋看得見的實測證明（截圖、影片或輸出）；如實寫出哪裡還沒做好本身就是得分點。",
}
HUB = {"maker": "https://cwstedctw.github.io/ndhu-ted-course-hub/courses/11501-maker-intro/", "ai_coding": "https://cwstedctw.github.io/ndhu-ted-course-hub/courses/11501-ai-coding/",
       "aiot": "https://cwstedctw.github.io/ndhu-ted-course-hub/courses/11501-aiot/", "ai_future": "https://cwstedctw.github.io/ndhu-ted-course-hub/courses/11501-ai-future/"}

def load_stats():
    s = STATS.read_text(encoding="utf-8")
    return json.loads(s[s.find("{"):s.rfind("}") + 1])

def blocks():
    s = OVERVIEW.read_text(encoding="utf-8")
    nav = s[s.find('<nav class="topnav"'):s.find('</nav>') + 6]
    nav = re.sub(r'<span class="anchors">.*?</span>',
                 '<span class="anchors"><a href="#what">要交什麼</a><a href="#rubric">評分表</a><a href="#numbers">各班數字</a><a href="#judges">評分者</a><a href="#versions">改過什麼</a></span>', nav, count=1, flags=re.S)
    foot = s[s.find('<footer class="site">'):s.find('</footer>') + 9]
    foot = foot.replace("講師的成績產線實況｜", "講師的成績產線實況・一種作業一頁｜")
    style = s[s.find("<style>"):s.find("</style>") + 8]
    boot = re.search(r"<script>\(function\(\)\{var d=document\.documentElement.*?</script>", s, re.S).group(0)
    navjs = s[s.rfind("<script>\n(function(){\n  'use strict';\n  var root = document.documentElement;"):s.rfind("</script>") + 9]
    assert navjs.startswith("<script>") and "navLinks" in navjs, "抽不到導覽列腳本"
    return nav, foot, style, boot, navjs

JUDGE_NAME = {"wailan": "洄瀾（Claude）", "liwu": "立霧（Codex）", "xiuguluan": "秀姑巒（Gemini）", "muguaxi": "木瓜溪（OpenCode）", "meilunxi": "美崙溪（Grok）"}

def soften(grading: str) -> str:
    return (grading.replace("→ 對齊 80–100", "→ 平均後對齊到 80–100 分").replace("用 raw", "，用原始分、不對齊")
            .replace("三方評分", "三個 AI 評分者各打一份").replace("程式判定（wokwi_check）", "程式判定（讀 Wokwi 專案的零件、接線與程式）"))

def bar_hist(bins, w=600, h=210):
    keys = list(bins.keys()); mx = max([1] + list(bins.values()))
    padL, padB, padT = 30, 34, 26; bw = (w - padL - 20) / max(1, len(keys))
    out = [f'<line class="axis" x1="{padL}" y1="{h - padB}" x2="{w - 10}" y2="{h - padB}"/>']
    for i, k in enumerate(keys):
        v = bins[k]; bh = round((h - padB - padT) * v / mx); x = padL + i * bw + 8; y = h - padB - bh
        hot = " hot" if k.startswith("15") or k.startswith("25") else ""
        out.append(f'<rect class="bar{hot}" x="{x:.0f}" y="{y}" width="{bw - 16:.0f}" height="{bh}" rx="4"/>')
        out.append(f'<text x="{x + (bw - 16) / 2:.0f}" y="{y - 6}" text-anchor="middle">{v}</text>')
        out.append(f'<text class="lbl" x="{x + (bw - 16) / 2:.0f}" y="{h - padB + 18}" text-anchor="middle">{E(k)} 分</text>')
    return f'<svg class="chart" viewBox="0 0 {w} {h}" role="img" aria-label="三個評分者差距的分布">' + "".join(out) + "</svg>"

def short_label(s: str, n: int = 24) -> str:
    """圖表標籤要短：超過就在詞界切、補「…」，括號不留一半。"""
    if len(s) <= n: return s
    cut = s[:n]
    for sep in ("（", "：", "、", "，", " "):
        if sep in cut: cut = cut[:cut.rfind(sep)]
    cut = cut.rstrip("（(：:、，,・ ")
    return (cut or s[:n]) + "…"

def bar_dims(dim_gap, w=760):
    if not dim_gap: return ""
    rowH, labW = 30, 380; mx = max([1.0] + [d["gap"] for d in dim_gap]); barMax = w - labW - 90
    out = []
    for i, d in enumerate(dim_gap):
        y = 6 + i * rowH; bw = round(barMax * d["gap"] / mx)
        out.append(f'<text class="lbl big" x="{labW - 10}" y="{y + 19}" text-anchor="end">{E(short_label(d["label"]))}</text>')
        out.append(f'<rect class="bar{" hot" if d is dim_gap[0] and d["gap"] >= 3 else ""}" x="{labW}" y="{y + 5}" width="{max(bw, 2)}" height="{rowH - 12}" rx="3"/>')
        out.append(f'<text class="big" x="{labW + max(bw, 2) + 8}" y="{y + 19}">{d["gap"]} 分</text>')
    h = len(dim_gap) * rowH + 12
    return f'<svg class="chart wide" viewBox="0 0 {w} {h}" role="img" aria-label="各維度的平均分歧">' + "".join(out) + "</svg>"

def page(t, S, nav, foot, style, boot, navjs, idx, total):
    rub = t["rubric"]; inst = [a for a in S["assignments"] if a["rubric_id"] == t["id"]]
    inst.sort(key=lambda a: (a["course"], a["week"] or 0, a["cls"]))
    mode = MODE_SHORT.get(t["mode"], t["mode"])
    judged = t["judged"]; hot = t["gap_ge15"]; pct = round(100 * hot / judged) if judged else 0
    rows = "".join(
        f'<tr><td data-th="課">{E(a["course"])}</td><td data-th="班">{E(a["cls"] or "—")}</td><td data-th="週">{"W" + str(a["week"]) if a["week"] else "—"}</td>'
        f'<td data-th="到期">{E(a["due"] or "—")}</td><td data-th="名冊">{a["roster"] if a["roster"] is not None else "—"}</td>'
        f'<td data-th="已繳">{a["submitted"] if a["submitted"] is not None else "—"}</td><td data-th="遲交">{a["late"] if a["late"] is not None else "—"}</td>'
        f'<td data-th="狀態">{"<span class=\"tag ok\">已推簿</span>" if a["pushed"] else "<span class=\"tag on\">已批</span>" if a["graded"] else "<span class=\"tag\">未批</span>"}</td></tr>'
        for a in inst)
    dims = "".join(f'<tr><td data-th="維度"><strong>{E(d["label"])}</strong></td><td data-th="配分">{d["points"]}</td><td data-th="怎麼給分">{E(d["note"]) or "—"}</td></tr>' for d in rub["dims"])
    grp = '<p class="note">這是分組作業：一組交一份，所以「已繳」是組數不是人數；同組同分。</p>' if t["group"] else ""
    hubs = sorted({(a["course"], HUB[a["course_key"]]) for a in inst if a["course_key"] in HUB})
    hub_html = "".join(f' <a href="{E(u)}" target="_blank" rel="noopener">{E(c)}課程網 ↗</a>' for c, u in hubs)
    if judged:
        top = t["dim_gap"][0] if t["dim_gap"] else None
        jl = sorted({j for a in inst for j in (a["judges"] or [])})
        names = "、".join(JUDGE_NAME.get(j, j) for j in jl); nj = len(jl) if jl else 3
        judges_html = (
            f'<p>這種作業一共 <strong>{judged}</strong> 份作答，每份有 {nj} 個評分者的分數（{E(names) if names else "AI 評分者"}）。最高減最低的差距 15 分以上的有 <strong>{hot}</strong> 份（{pct}%）——這些由老師親自看。</p>'
            + (f'<p>最常分歧的一格是「<strong>{E(top["label"])}</strong>」（評分者兩兩相減平均差 {top["gap"]} 分）。分歧集中在哪一格，多半是那一格還不夠「看得見」（也可能是抽字或照片辨識的問題），回查原件再決定下一版怎麼改。</p>' if top else "")
            + f'<figure>{bar_hist(t["gap_bins"])}<figcaption>差距分布（最高分減最低分，原始分）</figcaption></figure>'
            + f'<figure>{bar_dims(t["dim_gap"])}<figcaption>每一格的平均分歧（評分者兩兩相減的平均）</figcaption></figure>'
            + (f'<p class="note">到 {E(S["as_of"])} 為止，老師最終分數那一欄還是空的：目前用{"原始分" if t["mode"] == "three_raw" else "對齊分"}推簿，分歧大的個案在關注名單上另外看。</p>' if not t["overrides"] else f'<p class="note">老師改過 {t["overrides"]} 份的最終分數。</p>')
        )
    else:
        judges_html = '<p>這種作業不用人或 AI 評分：' + ("有交就給分，程式只讀有沒有交、晚了多久。" if t["mode"] == "completion" else "分數由程式判定（開連結看活不活、拆開模擬電路看接線與程式特徵），同一份檔跑幾次都一樣；拿不準的才由老師看。") + '</p>'
    judges_heading = f"{len(sorted({j for a in inst for j in (a['judges'] or [])})) or 3} 個評分者差多少、差在哪一格" if judged else "要不要人工評分"
    note_html = (f'<details class="ask"><summary>評分表備註（工作紀錄原文，含內部用語）</summary><div class="prompt"><p>{E(rub["note"])}</p></div></details>' if rub["note"] else "")
    grading_line = E(soften(inst[0]["grading_text"]) if inst else mode)
    if t["id"] == "completion":
        grading_line = "完成度：準時 100、遲交 70、沒交 0（2026-10-09 起的規則；第 1 場當時遲交算 80）。不評內容好壞。"
    if t["mode"] in ("completion", "program"):
        origin_html = "這種作業照作業要求定規則，不需要先讀全班材料：完成度只看有沒有交，程式判定照電路與程式的規格寫。"
    else:
        origin_html = "評分表不是先寫好再收作業：先把全班的繳交一鍵抓回來，AI 讀完全部材料、列出看得見的維度與配分，老師確認後才開批。沿用同一份評分表的作業不必再確認。"
    small = [a for a in inst if a["judged"] and a["judged"] < 5 and a["mode"] == "three_aligned"]
    if small:
        origin_html += " 其中 " + "、".join(f'{a["course"]}{(" " + a["cls"]) if a["cls"] else ""}' for a in small) + " 的作答不到 5 份，母體太小沒做對齊、直接用原始分。"
    if any(a["roster_from_grades"] for a in inst):
        origin_html += " 課堂＋回家合併的作業沒有單獨的名冊統計，名冊與已繳用批改結果的人數代替、遲交數不計。"
    if len(t["versions"]) > 1:
        vers = "".join(f'<li><strong>第 {i + 1} 版（{E(v["version"])}）</strong>：{E(v["title"])}<br><span class="vnote">{E(v["note"]) or "—"}</span></li>' for i, v in enumerate(t["versions"]))
        versions_html = f'<p>這份評分表改過版，每一版的備註就是「為什麼改」：</p><ol class="versions">{vers}</ol>'
    else:
        versions_html = '<p>這份評分表到目前只有一版。要改的話，改一格、寫一句為什麼、存成下一版——跟今天第二塊練的一樣。</p>'
    body = f"""
<header class="hero"><div class="inner">
  <span class="eyebrow">一種作業一頁・{idx}／{total}</span>
  <h1><span>{E(rub["title"])}</span></h1>
  <div class="deck">
    <p class="sub">{E(mode)}。用在 {E("、".join(t["courses"]))}（{t["instances"]} 份作業）。評分表代號 {E(t["id"])}、版本 {E(t["version"])}。</p>
    <p class="meta"><span class="m">資料截至 {E(S["as_of"])}</span><span class="m">只有計數與評分表，沒有任何學號、姓名或個別分數</span><span class="m"><a href="pipeline.html">回產線實況總覽</a></span></p>
  </div>
</div></header>
<main id="main" class="editorial">
<section id="what" class="sec first" aria-labelledby="what-h"><div class="wrap">
  <h2 id="what-h"><span class="num">壹</span><span class="t">這份作業要交什麼、怎麼評</span></h2>
  <div class="body prose">
    <p><strong>作業例子：</strong>{E(EXAMPLE.get(t["id"], rub["title"]))}{hub_html}</p>
    <p><strong>評分方式：</strong>{grading_line}</p>
    <p><strong>怎麼檢查（不只比對文字）：</strong>{E(CHECK_HOW.get(t["id"], "評分者讀全部材料後依評分表打分。"))}</p>
    {grp}
    {note_html}
    <p class="note"><strong>評分表怎麼來的：</strong>{origin_html}</p>
  </div>
</div></section>
<section id="rubric" class="sec" aria-labelledby="rubric-h"><div class="wrap">
  <h2 id="rubric-h"><span class="num">貳</span><span class="t">評分表：{len(rub["dims"])} 格、共 {rub["total_points"] or 100} 分</span></h2>
  <div class="body prose">
    <div class="table-wrap"><table class="stack rubric-table"><thead><tr><th scope="col">維度</th><th scope="col">配分</th><th scope="col">怎麼給分</th></tr></thead><tbody>{dims}</tbody></table></div>
  </div>
</div></section>
<section id="numbers" class="sec" aria-labelledby="numbers-h"><div class="wrap">
  <h2 id="numbers-h"><span class="num">參</span><span class="t">這學期的數字</span></h2>
  <div class="body prose">
    <div class="stats">
      <div class="k"><span class="n">{t["instances"]}</span><span class="l">份作業用這張評分表</span></div>
      <div class="k"><span class="n">{t["roster"]}</span><span class="l">份該交（名冊加總）</span></div>
      <div class="k"><span class="n">{t["submitted"]}</span><span class="l">份收到，遲交 {t["late"]} 份</span></div>
      <div class="k"><span class="n gold">{judged or "—"}</span><span class="l">份作答各有三個評分者的分數</span></div>
    </div>
    <div class="table-wrap"><table class="stack"><thead><tr><th scope="col">課</th><th scope="col">班</th><th scope="col">週</th><th scope="col">到期</th><th scope="col">名冊</th><th scope="col">已繳</th><th scope="col">遲交</th><th scope="col">狀態</th></tr></thead><tbody>{rows}</tbody></table></div>
  </div>
</div></section>
<section id="judges" class="sec" aria-labelledby="judges-h"><div class="wrap">
  <h2 id="judges-h"><span class="num">肆</span><span class="t">{E(judges_heading)}</span></h2>
  <div class="body prose">{judges_html}</div>
</div></section>
<section id="versions" class="sec" aria-labelledby="versions-h"><div class="wrap">
  <h2 id="versions-h"><span class="num">伍</span><span class="t">評分表改過什麼</span></h2>
  <div class="body prose">{versions_html}
    <p><a class="btn secondary" href="pipeline.html">← 回產線實況總覽</a></p>
  </div>
</div></section>
</main>
"""
    head = f"""<!DOCTYPE html>
<html lang="zh-Hant-TW">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>從學習證據到教學改進｜一種作業一頁：{E(rub["title"])}</title>
<meta name="description" content="講師的成績產線實況，一種作業一頁：{E(rub["title"])}。評分表全文、各班數字、評分者差在哪一格。只有計數，沒有任何學生資料。">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="assets/site.css">
{style}
<style>
.rubric-table td:nth-child(2){{white-space:nowrap}}
.chart.wide{{max-width:900px}}
.chart text.big{{font-size:15px}}
.versions li{{margin:8px 0}}
.versions .vnote{{color:var(--ink-soft);font-size:.93rem;line-height:1.6}}
</style>
{boot}
</head>
<body>
<a class="skip" href="#main">跳到主要內容</a>
"""
    return head + nav + body + foot + "\n" + navjs + "\n</body>\n</html>\n"

def main():
    S = load_stats(); nav, foot, style, boot, navjs = blocks()
    types = S["types"]; written = []
    for i, t in enumerate(types, 1):
        out = ROOT / f"pipeline-{t['id']}.html"
        out.write_text(page(t, S, nav, foot, style, boot, navjs, i, len(types)), encoding="utf-8", newline="\n")
        written.append(out.name)
    # 清掉已不存在的類型頁
    keep = set(written)
    for p in ROOT.glob("pipeline-*.html"):
        if p.name not in keep:
            p.unlink(); print("removed stale", p.name)
    print("wrote", len(written), "type pages:", ", ".join(written))

if __name__ == "__main__":
    main()
