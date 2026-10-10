# -*- coding: utf-8 -*-
"""組出 pipeline.html（講師的成績批改實況總覽）：導覽列／頁尾／主題腳本從 index.html 抽來複用，正文與渲染 JS 在這裡。
用法：python data/make_pipeline_page.py（在 repo 根跑；一種作業一頁另外跑 data/make_pipeline_pages.py）
資料：data/pipeline-stats.js（由講師本機 skills/assignment-grading/pipeline_stats_public.py 產，只有計數）；影片：videos/pipeline-walkthrough.*"""
import io, pathlib, re
ROOT = pathlib.Path(__file__).resolve().parents[1]          # repo 根（本檔在 data/）
_index = (ROOT / "index.html").read_text(encoding="utf-8")

def _block(pattern, name):
    m = re.search(pattern, _index, flags=re.S)
    if not m: raise SystemExit(f"index.html 找不到{name}區塊，先看 index.html 改了什麼")
    return m.group(0)

# 導覽列／頁尾／主題啟動腳本都從 index.html 抽，入口頁改了這裡就跟著變
nav = _block(r'<nav class="topnav".*?</nav>', "導覽列")
foot = _block(r'<footer class="site".*?</footer>', "頁尾")
boot = _block(r'<script>\(function\(\)\{var d=document\.documentElement.*?</script>', "主題啟動腳本")

# 導覽列：入口不再是本頁；本頁連結加上；錨點換成本頁的
nav = nav.replace('<a href="index.html" aria-current="page">入口</a>', '<a href="index.html">入口</a>')
if 'pipeline.html' not in nav:
    nav = nav.replace('<a href="slides/index.html">投影片</a>', '<a href="slides/index.html">投影片</a><a href="pipeline.html" aria-current="page">批改實況</a>')
else:
    nav = nav.replace('<a href="pipeline.html">批改實況</a>', '<a href="pipeline.html" aria-current="page">批改實況</a>')
nav = re.sub(r'<span class="anchors">.*?</span>',
             '<span class="anchors"><a href="#video">影片</a><a href="#map">地圖</a><a href="#scale">規模</a><a href="#types">一種作業一頁</a><a href="#modes">怎麼評</a><a href="#check">怎麼檢查</a><a href="#gap">差多少</a><a href="#late">遲交與出席</a><a href="#who">誰做什麼</a><a href="#borrow">帶回去</a></span>', nav, count=1, flags=re.S)
foot = foot.replace("從學習證據到教學改進｜工作坊入口｜", "從學習證據到教學改進｜講師的成績批改實況｜")

CSS = """
/* 批改實況頁專用：地圖流程卡、數字卡、長條圖；顏色全用 site.css 代幣 */
.flow{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;counter-reset:st}
.flow .st{position:relative;background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px 14px 12px}
.flow .st::before{counter-increment:st;content:counter(st);position:absolute;top:-10px;left:12px;width:24px;height:24px;border-radius:50%;background:var(--teal);color:#fff;font-weight:800;font-size:.8rem;display:grid;place-items:center}
.flow .st b{display:block;margin:6px 0 4px;font-size:1.02rem}
.flow .st .who{display:inline-block;font-family:var(--mono);font-size:.72rem;letter-spacing:.06em;padding:2px 8px;border-radius:999px;border:1px solid var(--line);color:var(--ink-soft);margin-bottom:6px}
.flow .st .who.ai{color:var(--teal);border-color:var(--teal)}
.flow .st .who.me{color:var(--gold);border-color:var(--gold)}
.flow .st p{margin:0;font-size:.93rem;line-height:1.6;color:var(--ink-soft)}
.stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
.stats .k{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px}
.stats .k .n{display:block;font-size:2rem;font-weight:800;line-height:1.1;letter-spacing:-.02em;color:var(--teal)}
.stats .k .n.gold{color:var(--gold)}
.stats .k .l{display:block;margin-top:4px;font-size:.9rem;color:var(--ink-soft);line-height:1.5}
.modes{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.modes .m{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px;border-top:4px solid var(--teal)}
.modes .m.c2{border-top-color:var(--gold)}
.modes .m.c3{border-top-color:var(--l)}
.modes .m b{display:block;font-size:1.05rem;margin-bottom:4px}
.modes .m .cnt{font-family:var(--mono);font-size:.8rem;color:var(--ink-soft)}
.modes .m p{margin:8px 0 0;font-size:.93rem;line-height:1.6}
.rubric{margin:8px 0 0;padding-left:1.2em}
.rubric li{margin:3px 0}
.chart{width:100%;height:auto;display:block;max-width:760px}
.chart text{font-family:var(--sans);font-size:13px;fill:var(--ink)}
.chart .lbl{fill:var(--ink-soft);font-size:12px}
.chart .bar{fill:var(--teal)}
.chart .bar.hot{fill:var(--gold)}
.chart .axis{stroke:var(--line-strong);stroke-width:1}
.two{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;align-items:start}
.who-table th:first-child{white-space:nowrap}
.tag{display:inline-block;font-size:.78rem;padding:1px 8px;border-radius:999px;border:1px solid var(--line);color:var(--ink-soft);white-space:nowrap}
.tag.ok{border-color:var(--l);color:var(--l)}
.tag.on{border-color:var(--teal);color:var(--teal)}
.tag.grp{border-color:var(--gold);color:var(--gold)}
.vid{margin:0}
.vid video{display:block;width:100%;height:auto;max-width:960px;border:1px solid var(--line);border-radius:12px;background:#000}
.vid figcaption{margin-top:8px;font-size:.9rem;line-height:1.6;color:var(--ink-soft);max-width:960px}
.pii{border-left:4px solid var(--gold);padding:10px 14px;background:var(--card);border-radius:0 10px 10px 0}
.checks{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.checks .c{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:12px 14px}
.checks .c.hot{border-color:var(--gold);box-shadow:inset 4px 0 0 var(--gold)}
.checks .c b{display:block;margin-bottom:4px}
.checks .c p{margin:0;font-size:.93rem;line-height:1.6;color:var(--ink-soft)}
@media (max-width:720px){.checks{grid-template-columns:minmax(0,1fr)}}
.types{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.types .tcard{display:block;background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px;text-decoration:none;color:inherit}
.types .tcard:hover{border-color:var(--teal)}
.types .tcard b{display:block;font-size:1rem;line-height:1.45;margin-bottom:6px;color:var(--teal)}
.types .tcard .meta{display:block;font-size:.86rem;color:var(--ink-soft);line-height:1.5}
.types .tcard .meta.hot{color:var(--gold)}
@media (max-width:900px){.types{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:560px){.types{grid-template-columns:minmax(0,1fr)}}
@media (max-width:900px){.flow{grid-template-columns:repeat(2,minmax(0,1fr))}.stats{grid-template-columns:repeat(2,minmax(0,1fr))}.modes{grid-template-columns:minmax(0,1fr)}.two{grid-template-columns:minmax(0,1fr)}}
@media (max-width:560px){.flow{grid-template-columns:minmax(0,1fr)}}
"""

BODY = """
<header class="hero"><div class="inner">
  <span class="eyebrow">延伸資料・講師自己的課</span>
  <h1><span>成績批改實況：</span><span class="accent">一學期六門課怎麼收、怎麼改、怎麼查</span></h1>
  <div class="deck">
    <p class="sub">這一頁不是今天的練習，是講師把自己這學期正在跑的流程攤開來給你看：作業從教學平台一鍵抓回來、三個 AI 評分者各打一份再對齊、老師只親自看差距大的那幾份、推進成績簿、學生登入只看得到自己的。整頁都是計數與比例，<strong>沒有任何學號、姓名或個別分數</strong>。跟今天練的原則不衝突：AI 打的是第一輪分數，差距大的老師親自看、推進成績簿前老師拍板，AI 不替老師下結論。看不懂的技術名詞可以跳過，先看壹那一句原則就夠。</p>
    <p class="meta"><span class="m">資料截至 <span class="asof">2026-10-09</span></span><span class="m">115-1 學期、六門通識與資工系課</span><span class="m">由講師本機的批改資料彙總；產生程式只會輸出計數</span></p>
  </div>
</div></header>

<main id="main" class="editorial">
<p id="nodata" class="note" hidden>統計檔沒載到（data/pipeline-stats.js）。頁面文字仍可讀，數字會是空的。</p>

<section id="video" class="sec first" aria-labelledby="video-h"><div class="wrap">
  <h2 id="video-h"><span class="t">先看三分半鐘的影片：整個流程從頭跑一遍</span></h2>
  <div class="body prose">
    <figure class="vid">
      <video controls preload="metadata" playsinline poster="videos/pipeline-walkthrough-poster.jpg" width="1280" height="720">
        <source src="videos/pipeline-walkthrough.mp4" type="video/mp4">
        <track kind="subtitles" src="videos/pipeline-walkthrough.vtt" srclang="zh-Hant" label="繁體中文">
        你的瀏覽器放不了這支影片，<a href="videos/pipeline-walkthrough.mp4">直接下載 mp4</a>。
      </video>
      <figcaption>3 分 37 秒，有旁白與字幕（旁白是文字轉語音）。畫面上出現的學生<strong>全部是合成的示範資料</strong>（示範生01 到 08），指令是真的在那批資料上跑出來的；教學平台與 Wokwi 的畫面只取不含人名的區塊。</figcaption>
    </figure>
  </div>
</div></section>

<section id="map" class="sec" aria-labelledby="map-h"><div class="wrap">
  <h2 id="map-h"><span class="num">壹</span><span class="t">批改流程地圖：八站，從學生交作業到學生看到分數</span></h2>
  <div class="body prose">
    <p>這條流程的原則只有一句：<strong>程式做重複的事、AI 做第一輪判斷、老師做決定</strong>。每一站都留下檔案與紀錄，學期末要寫成果報告或教學實踐研究時，證據已經在那裡。</p>
    <div class="flow">
      <div class="st"><span class="who">學生</span><b>交作業</b><p>教學平台（e學苑）的作業節點、課堂簽到、GitHub 上的 commit、LINE Bot、手寫學習單拍照上傳。</p></div>
      <div class="st"><span class="who ai">程式</span><b>一鍵抓回</b><p>瀏覽器批次按「下載所有繳交」，一份作業一份 zip；八個班、21 份作業曾經一次全部抓完。</p></div>
      <div class="st"><span class="who ai">程式</span><b>整理進資料夾</b><p>還原 zip 裡的中文檔名、姓名對學號、線上文字另存、網址抽出來；對不上名冊的列出來、不猜。</p></div>
      <div class="st"><span class="who ai">程式＋AI</span><b>批改</b><p>三種方式：完成度、程式判定、三個 AI 評分者各打一份再對齊（下面「怎麼評」）。</p></div>
      <div class="st"><span class="who me">老師</span><b>覆核</b><p>逐生卡片看三位的分數與評語；差距大、分數低、遲交、評語有問題字眼的自動進「關注名單」，老師只看這些。</p></div>
      <div class="st"><span class="who ai">程式</span><b>推成績簿</b><p>整個系統只有一條路能寫成績簿（Google 試算表）：先備份、檢查表頭、寫入、再回讀驗證。</p></div>
      <div class="st"><span class="who">學生</span><b>查自己的成績</b><p>用學校帳號登入只看得到自己那一列；全班沒人評的題目顯示「未評」，沒全部評完不顯示總分。</p></div>
      <div class="st"><span class="who me">老師</span><b>複查與定案</b><p>學生在查詢頁送複查 → 工單表 → 老師回覆；學期末推教務處前先做三層對帳，確認沒有人被資料缺漏害到。</p></div>
    </div>
  </div>
</div></section>

<section id="scale" class="sec" aria-labelledby="scale-h"><div class="wrap">
  <h2 id="scale-h"><span class="num">貳</span><span class="t">這學期到目前的規模</span></h2>
  <div class="body prose">
    <div class="stats">
      <div class="k"><span class="n" id="s-courses">—</span><span class="l">門課（<span id="s-gradebooks">—</span> 本線上成績簿，分班的課各一本）</span></div>
      <div class="k"><span class="n" id="s-assign">—</span><span class="l">份作業已登記；<span id="s-graded">—</span> 份批完、<span id="s-pushed">—</span> 份已推進成績簿</span></div>
      <div class="k"><span class="n" id="s-sub">—</span><span class="l">份個人作答已收到、批完（應繳 <span id="s-pairs">—</span> 人次，補交持續收件中）</span></div>
      <div class="k"><span class="n gold" id="s-judged">—</span><span class="l">份作答各有兩到三個 AI 評分者的分數（<span id="s-3a">—</span> 份作業）</span></div>
    </div>
    <p class="note" id="s-foot"></p>
    <details class="ask"><summary>展開 27 份作業的清單（各課、各班、繳交狀態）</summary>
    <p>「已繳」是對得到名冊的人數；標<span class="tag grp">分組</span>的作業一組交一份，所以人數看起來少。作業名可以點進「一種作業一頁」。</p>
    <div class="table-wrap"><table class="stack" id="asg-table"><thead><tr><th scope="col">課</th><th scope="col">作業</th><th scope="col">班</th><th scope="col">怎麼評</th><th scope="col">名冊</th><th scope="col">已繳</th><th scope="col">遲交</th><th scope="col">狀態</th></tr></thead><tbody></tbody></table></div>
    </details>
  </div>
</div></section>

<section id="types" class="sec" aria-labelledby="types-h"><div class="wrap">
  <h2 id="types-h"><span class="num">參</span><span class="t">一種作業一頁：評分表全文、各班數字、評分者差在哪一格</span></h2>
  <div class="body prose">
    <p>每一種作業都有一張自己的評分表；要 AI 評分者讀內容的那幾種，評分表是<strong>讀完全班的繳交材料之後才定的</strong>——不是先寫好規準再收作業（完成度與程式判定這幾種則照作業要求定）。點進去看每一格怎麼給分、評分者在哪一格最常不一致、評分表改過什麼。</p>
    <div class="types" id="type-cards"></div>
  </div>
</div></section>

<section id="modes" class="sec" aria-labelledby="modes-h"><div class="wrap">
  <h2 id="modes-h"><span class="num">肆</span><span class="t">作業怎麼評：三種方式</span></h2>
  <div class="body prose">
    <div class="modes">
      <div class="m"><b>完成度</b><span class="cnt" id="m-completion">—</span><p>有交就給：準時 100、遲交 70、沒交 0；不評內容好壞。用在演講課的手寫學習單——那門課的底線是不對學生個人做評價。</p></div>
      <div class="m c2"><b>程式判定</b><span class="cnt" id="m-program">—</span><p>能用程式確定的就不用人：模擬電路檔有沒有照規格接線與閃爍、交的網址真的打開活不活。同一份檔跑幾次都一樣，可以稽核。</p></div>
      <div class="m c3"><b>AI 評分者各打一份 → 對齊</b><span class="cnt" id="m-three">—</span><p>同一份評分表，三個不同引擎的 AI（少數作業兩個）各自讀全班、各打一份，再取平均。「對齊」白話說：把全班的平均分換算到 80–100 的分數帶，像把三把不同的尺換成同一把——作業是練習，分數帶是鼓勵；原始分與評分者之間的差距都留著給老師看。老師可以填「最終分數」蓋過去。</p></div>
    </div>
    <p>一份真的評分表長這樣（第 2 週「裝好四樣」，五格各 20 分、辦不成但寫出原因也給分）：</p>
    <ul class="rubric" id="rubric-example"></ul>
    <p class="note">評分表怎麼來的：AI 先讀完全班的材料、列出看得見的維度，老師確認後才開批；沿用同一份評分表就不必再確認。這就是今天第二塊練的那件事。</p>
  </div>
</div></section>

<section id="check" class="sec" aria-labelledby="check-h"><div class="wrap">
  <h2 id="check-h"><span class="num">伍</span><span class="t">怎麼檢查：不只比對文字</span></h2>
  <div class="body prose">
    <p>學生交的是連結、照片、模擬電路、投影片、手寫紙，光比對文字什麼都查不到。每一種證據都有自己的檢查法，而且盡量讓程式做、讓結果可重跑：</p>
    <div class="checks">
      <div class="c hot"><b>讀模擬電路（Wokwi）</b><p>直接抓學生交的 Wokwi 公開專案裡的 diagram.json 與程式碼做靜態檢查：有沒有板子、LED、電阻，有沒有接 GND、接到哪支腳位，程式有沒有「設腳位＋切換＋延時＋迴圈」這四件事；節奏那一格再看有沒有兩種等待時間。它不會真的按播放，證明的是「接線與程式長得對」、不是「一定會閃」，但已經比看截圖可靠得多；交老師示範專案的連結不算。紅綠燈那兩份作業只拿它抓零件與接線當證據，分數照評分表由評分者判。這一條做起來不容易，值得特別看。</p></div>
      <div class="c"><b>真的開連結</b><p>不是看有沒有貼網址：程式去開每一條，等它回應、跟著轉址、最多等 15 秒，有正常回應才算活著；至少一條活著就滿分，每一條的活死都記進「主要問題」欄給老師看。</p></div>
      <div class="c"><b>看照片</b><p>板子動起來、點陣亮了這類只有照片的作業，AI 評分者用視覺看：燈有沒有在動、有沒有終端機或程式碼畫面證明是自己做的。這類最容易看法不同，差距大的一律送人看。</p></div>
      <div class="c"><b>對 GitHub 歷史</b><p>commit 三次的作業：截圖裡的 commit 數與訊息、線上文字列的三筆、repo 網址是不是自己的公開 repo，三邊要對得上。</p></div>
      <div class="c"><b>抽字，字少就抽圖</b><p>簡報與 PDF 先抽文字；字太少的把每一頁抽成圖讓評分者看，不因抽不到字給低分。</p></div>
      <div class="c"><b>影片抽幀＋逐字稿</b><p>只交影片的人：程式均勻抽幀、語音轉文字給評分者讀；任何一步失敗一律標「請人工看影片」，不盲改。（工具是上學期做的，這學期還沒有影片類作業。）</p></div>
      <div class="c"><b>手寫紙量墨水</b><p>手寫學習單的照片：找外框、透視校正到模板，量每一區的墨水密度判有沒有寫、勾選格的黑像素判有沒有勾，拿不準的留給人看。（試作中，還沒用在正式成績；學習單目前只看有沒有交、準不準時。）</p></div>
      <div class="c"><b>名冊、遲交、分組</b><p>姓名對學號先正規化、同名不猜；遲交時間讀平台匯出的評分工作表；分組作業照定版分組表同組同分。</p></div>
      <div class="c"><b>AI 生成訊號</b><p>一鍵生成的簡報（工具浮水印、整份同一腔調）只對有嫌疑的那幾份再請另一個 AI 反方審一次，不全班亂掃。（上學期期末報告用過，這學期的作業還沒用到。）</p></div>
      <div class="c"><b>評分者互相當檢查</b><p>同一份評分表，三個不同引擎的 AI（少數作業兩個）各打一份，差距 15 分以上就送人看；分歧集中在哪一格，哪一格就是評分表該改的地方。</p></div>
    </div>
  </div>
</div></section>

<section id="gap" class="sec" aria-labelledby="gap-h"><div class="wrap">
  <h2 id="gap-h"><span class="num">陸</span><span class="t">三個評分者差多少：差距是訊號，不是結論</span></h2>
  <div class="body prose">
    <div class="two">
      <div>
        <p>每一份作答有兩到三個分數，取<strong>最高減最低</strong>當差距。到目前 <strong id="g-n">—</strong> 份作答裡，差距 15 分以上的有 <strong id="g-hot">—</strong> 份（<span id="g-pct">—</span>%）——這些就是老師要親自看的，其他的評分者意見一致、老師抽查就好。</p>
        <p id="g-note"></p>
      </div>
      <figure><svg class="chart" id="gap-hist" viewBox="0 0 600 230" role="img" aria-label="三個評分者差距的分布長條圖"></svg><figcaption>差距分布（最高分減最低分，原始分）</figcaption></figure>
    </div>
    <figure><svg class="chart" id="gap-by-asg" viewBox="0 0 760 10" role="img" aria-label="各作業分歧比例長條圖"></svg><figcaption id="gap-by-asg-cap">各作業的分歧比例（差距 ≥15 的作答佔該作業的比例）。</figcaption></figure>
  </div>
</div></section>

<section id="late" class="sec" aria-labelledby="late-h"><div class="wrap">
  <h2 id="late-h"><span class="num">柒</span><span class="t">遲交與出席</span></h2>
  <div class="body prose">
    <div class="two">
      <div>
        <p><strong>遲交規則</strong>：每晚一週扣 5%（晚 1 分鐘到 7 天算一週；2026-10-09 起，之前是打八折）。兩個例外：演講課的學習單應該在課堂寫完，遲交一律 70；作業說明寫過「晚交照收、只標遲交」的那幾份不扣。遲交時間不用人看：從教學平台匯出的評分工作表讀「過期幾日幾小時」；平台只記最後一次繳交，準時交過又重交的會被算成遲交，這種要人看。補交的人程式會再抓一次、同一份評分表再批、按規則打折後推簿。</p>
        <p>到目前個人作業收到 <strong id="l-sub">—</strong> 份，其中遲交 <strong id="l-late">—</strong> 份（<span id="l-pct">—</span>%）。</p>
      </div>
      <div>
        <p><strong>出席</strong>：簽到或課堂小作業當出席證據，一場一分、直接加總、不設上限；查詢頁在學期中只顯示「出席 N／D 場」，整學期點完才變成分數。到 <span class="asof">2026-10-09</span> 各課已登的出席場次：</p>
        <details class="ask"><summary>展開各課已登的出席場次</summary><div class="table-wrap"><table class="stack" id="att-table"><thead><tr><th scope="col">課</th><th scope="col">已登場次</th></tr></thead><tbody></tbody></table></div></details>
      </div>
    </div>
  </div>
</div></section>

<section id="who" class="sec" aria-labelledby="who-h"><div class="wrap">
  <h2 id="who-h"><span class="num">捌</span><span class="t">誰做什麼：程式、AI、老師</span></h2>
  <div class="body prose">
    <div class="table-wrap"><table class="stack who-table"><thead><tr><th scope="col">事</th><th scope="col">誰做</th><th scope="col">老師還要做的</th></tr></thead><tbody>
      <tr><td data-th="事">抓作業、整理資料夾、對名冊</td><td data-th="誰做">程式（瀏覽器批次下載＋整理腳本）</td><td data-th="老師還要做的">看一眼「對不上名冊」的清單</td></tr>
      <tr><td data-th="事">寫評分表</td><td data-th="誰做">AI 先讀全班材料、列維度</td><td data-th="老師還要做的"><strong>確認維度、定分數</strong>（第一次用才要）</td></tr>
      <tr><td data-th="事">打分數</td><td data-th="誰做">三個 AI 各一份；或程式判定；或完成度</td><td data-th="老師還要做的">看關注名單、填最終分數（想蓋過才填）</td></tr>
      <tr><td data-th="事">推成績簿</td><td data-th="誰做">程式（備份→檢查→寫→回讀）</td><td data-th="老師還要做的">說一聲「推」</td></tr>
      <tr><td data-th="事">學生看成績、送複查</td><td data-th="誰做">查詢系統（學校帳號登入）</td><td data-th="老師還要做的">回覆複查工單</td></tr>
      <tr><td data-th="事">寄成績通知、推教務處</td><td data-th="誰做">程式備好草稿與檔案</td><td data-th="老師還要做的"><strong>親自按下寄出與上傳</strong></td></tr>
    </tbody></table></div>
    <p class="note">所有學生資料只放在不上網的硬碟；成績簿與查詢系統的存取碼不進任何程式庫。給 AI 評分的材料用代號配對，報告一律去識別。</p>
  </div>
</div></section>

<section id="borrow" class="sec" aria-labelledby="borrow-h"><div class="wrap">
  <h2 id="borrow-h"><span class="num">玖</span><span class="t">帶回自己課上的三件事</span></h2>
  <div class="body prose">
    <ol>
      <li><strong>先決定哪些作業只看完成度。</strong>反思、學習單、課前提問這類東西，評內容會讓學生不敢寫真話；完成度計分＋抽樣讀內容，證據反而更真。</li>
      <li><strong>讓兩三個評分者各打一份，差距大的才親自看。</strong>不管評分者是 AI 還是助教，「差距」比「平均」更有用——它告訴你評分表哪一格寫得不清楚。</li>
      <li><strong>每一站都留檔。</strong>評分表第幾版、哪一天推的簿、誰改過什麼，今天第一塊練的就是這個。學期末要寫報告時，這些檔案就是研究歷程。</li>
    </ol>
    <div class="pii"><strong>這一頁怎麼來的</strong>：講師本機有一支程式讀批改資料夾，只輸出計數與比例；寫檔前會拿名冊裡的每個姓名與學號掃一次輸出，掃到就不寫。頁面上看不到任何一個學生，也看不到任何一份個別分數。數字截至 <span class="asof">2026-10-09</span>，之後不會自動更新。</div>
  </div>
</div></section>
</main>
"""

RENDER = """
<script src="data/pipeline-stats.js"></script>
<script>
(function(){
  'use strict';
  var $ = function(id){ return document.getElementById(id); };
  var esc = function(s){ return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); };
  var S = window.PIPELINE_STATS;
  if(!S){ $('nodata').hidden = false; return; }
  var T = S.totals;
  var setAll = function(cls, v){ var els = document.querySelectorAll('.' + cls); for(var i = 0; i < els.length; i++) els[i].textContent = v; };
  setAll('asof', S.as_of);
  var put = function(id, v){ var el = $(id); if(el) el.textContent = (v == null ? '—' : v); };
  var pct = function(a, b){ return b ? Math.round(100 * a / b) : 0; };
  put('s-courses', T.courses); put('s-gradebooks', T.gradebooks); put('s-assign', T.assignments);
  put('s-graded', T.assignments_graded); put('s-pushed', T.assignments_pushed);
  put('s-pairs', T.individual_roster_sum); put('s-sub', T.individual_submitted_sum);
  put('s-judged', T.judged_sum); put('s-3a', T.three_judge_assignments);
  $('s-foot').textContent = T.assignments + ' 份作業裡，' + (T.group_assignments || 0) + ' 份是分組作業（一組交一份），人次只算 ' + T.individual_assignments + ' 份個人作業；應繳人次是名冊人數逐份加總，同一位學生跨作業會重複計' + (T.individual_roster_from_grades ? '；其中 ' + T.individual_roster_from_grades + ' 份課堂＋回家合併的作業沒有單獨名冊統計，用批改結果的人數代替、遲交不計' : '') + '。';
  var M = T.modes || {};
  put('m-completion', (M.completion || 0) + ' 份作業'); put('m-program', (M.program || 0) + ' 份作業'); put('m-three', ((M.three_aligned || 0) + (M.three_raw || 0)) + ' 份作業');
  var modeShort = { three_aligned: '三個 AI → 對齊 80–100', three_raw: '三個 AI，原始分', program: '程式判定', completion: '完成度' };

  /* 作業表：照課、再照週 */
  var A = S.assignments.slice().sort(function(a, b){ return a.course === b.course ? (a.week || 0) - (b.week || 0) : (a.course < b.course ? -1 : 1); });
  var tb = $('asg-table').querySelector('tbody');
  tb.innerHTML = A.map(function(a){
    var st = a.pushed ? '<span class="tag ok">已推簿</span>' : a.graded ? '<span class="tag on">已批</span>' : '<span class="tag">未批</span>';
    var grp = a.group ? ' <span class="tag grp">分組</span>' : '';
    var w = a.week ? 'W' + a.week + ' ' : '';
    var ttl = a.rubric_id ? '<a href="pipeline-' + esc(a.rubric_id) + '.html">' + esc(w + a.title) + '</a>' : esc(w + a.title);
    var how = modeShort[a.mode] || a.mode;
    if(a.mode === 'three_aligned' && a.judged && a.judged < 5) how = '三個 AI，原始分（作答不到 5 份、沒對齊）';
    return '<tr><td data-th="課">' + esc(a.course) + '</td><td data-th="作業">' + ttl + grp + '</td><td data-th="班">' + esc(a.cls || '—') + '</td><td data-th="怎麼評">' + esc(how) + '</td><td data-th="名冊">' + esc(a.roster == null ? '—' : a.roster) + '</td><td data-th="已繳">' + esc(a.submitted == null ? '—' : a.submitted) + '</td><td data-th="遲交">' + esc(a.late == null ? '—' : a.late) + '</td><td data-th="狀態">' + st + '</td></tr>';
  }).join('');

  /* 一種作業一頁：類型卡 */
  var TY = S.types || [];
  $('type-cards').innerHTML = TY.map(function(t){
    var judged = t.judged ? (t.judged + ' 份作答，' + t.gap_ge15 + ' 份分歧 ≥15（' + pct(t.gap_ge15, t.judged) + '%）') : (modeShort[t.mode] || t.mode);
    var top = (t.dim_gap && t.dim_gap.length) ? '最常分歧：' + t.dim_gap[0].label : '';
    return '<a class="tcard" href="pipeline-' + esc(t.id) + '.html"><b>' + esc(t.title) + '</b><span class="meta">' + esc(t.courses.join('、')) + '・' + t.instances + ' 份作業・評分表 ' + esc(t.rubric.dims.length) + ' 格' + (t.versions.length > 1 ? '・改過 ' + (t.versions.length - 1) + ' 版' : '') + '</span><span class="meta">' + esc(judged) + '</span>' + (top ? '<span class="meta hot">' + esc(top) + '</span>' : '') + '</a>';
  }).join('');

  /* 評分表例子：找「裝好四樣」第一份有維度的 */
  var ex = null;
  for(var i = 0; i < S.assignments.length; i++){ var x = S.assignments[i]; if(x.title.indexOf('裝好四樣') >= 0 && x.dims && x.dims.length){ ex = x; break; } }
  if(ex) $('rubric-example').innerHTML = ex.dims.map(function(d){ return '<li>' + esc(d) + '</li>'; }).join('');
  else $('rubric-example').innerHTML = '<li>（統計檔裡沒有這份作業的維度）</li>';

  /* 差距分布 */
  put('g-n', T.judged_sum); put('g-hot', T.gap_ge15_sum); put('g-pct', pct(T.gap_ge15_sum, T.judged_sum));
  var bins = T.gap_bins || {}; var keys = Object.keys(bins); var maxv = 1;
  keys.forEach(function(k){ if(bins[k] > maxv) maxv = bins[k]; });
  var W = 600, H = 230, padL = 40, padB = 36, padT = 26, bw = (W - padL - 20) / keys.length;
  var svg = '<line class="axis" x1="' + padL + '" y1="' + (H - padB) + '" x2="' + (W - 10) + '" y2="' + (H - padB) + '"/>';
  keys.forEach(function(k, i){
    var v = bins[k]; var h = Math.round((H - padB - padT) * v / maxv); var x = padL + i * bw + 8; var y = H - padB - h;
    var hot = (k.indexOf('15') === 0 || k.indexOf('25') === 0) ? ' hot' : '';
    svg += '<rect class="bar' + hot + '" x="' + x + '" y="' + y + '" width="' + (bw - 16) + '" height="' + h + '" rx="4"/>';
    svg += '<text x="' + (x + (bw - 16) / 2) + '" y="' + (y - 6) + '" text-anchor="middle">' + v + '</text>';
    svg += '<text class="lbl" x="' + (x + (bw - 16) / 2) + '" y="' + (H - padB + 18) + '" text-anchor="middle">' + esc(k) + ' 分</text>';
  });
  $('gap-hist').innerHTML = svg;
  var worst = null;
  S.assignments.forEach(function(a){ if(a.judged && (worst == null || pct(a.gap_ge15, a.judged) > pct(worst.gap_ge15, worst.judged))) worst = a; });
  if(worst) $('g-note').innerHTML = '分歧最大的一份是「' + esc(worst.course) + '・W' + worst.week + ' ' + esc(worst.title) + '」：' + worst.judged + ' 份裡 ' + worst.gap_ge15 + ' 份差距 15 分以上。三個人對同一張照片看法不同，不是誰對誰錯，是評分表那一格還沒寫到「看得見」。' + (T.overrides_sum ? '' : '到 ' + esc(S.as_of) + ' 為止，老師最終分數那一欄還是空的：目前都用對齊分推簿，關注名單上的個案另外看。');

  /* 各作業分歧比例 */
  var J = S.assignments.filter(function(a){ return a.judged; }).map(function(a){ return { label: a.course.slice(0, 6) + '・W' + a.week + ' ' + a.title + (a.cls ? ' ' + a.cls : ''), p: pct(a.gap_ge15, a.judged), n: a.judged, hot: a.gap_ge15 }; }).sort(function(a, b){ return b.p - a.p; });
  var rowH = 24, gW = 760, labW = 300, barMax = gW - labW - 70, gH = J.length * rowH + 10;
  var g = '';
  J.forEach(function(j, i){
    var y = 6 + i * rowH; var w = Math.round(barMax * j.p / 100);
    g += '<text class="lbl" x="' + (labW - 8) + '" y="' + (y + 15) + '" text-anchor="end">' + esc(j.label) + '</text>';
    g += '<rect class="bar' + (j.p >= 30 ? ' hot' : '') + '" x="' + labW + '" y="' + (y + 3) + '" width="' + Math.max(w, 2) + '" height="' + (rowH - 8) + '" rx="3"/>';
    g += '<text x="' + (labW + Math.max(w, 2) + 6) + '" y="' + (y + 15) + '">' + j.p + '%（' + j.hot + '／' + j.n + '）</text>';
  });
  var gb = $('gap-by-asg'); gb.setAttribute('viewBox', '0 0 ' + gW + ' ' + gH); gb.innerHTML = g;
  var tyBy = {}; (S.types || []).forEach(function(t){ tyBy[t.id] = t; });
  if(tyBy.matrix_photo && tyBy.board_photo){
    $('gap-by-asg-cap').textContent = '各作業的分歧比例（差距 ≥15 的作答佔該作業的比例）。同樣是照片：「點陣亮了」' + pct(tyBy.matrix_photo.gap_ge15, tyBy.matrix_photo.judged) + '% 分歧、「板子動起來了」' + pct(tyBy.board_photo.gap_ge15, tyBy.board_photo.judged) + '%——差這麼多，正是回頭修評分表的線索。';
  }

  /* 遲交、出席 */
  put('l-sub', T.individual_submitted_sum); put('l-late', T.individual_late_sum); put('l-pct', pct(T.individual_late_sum, T.individual_submitted_sum));
  var att = (S.attendance && S.attendance.sessions_logged) || {};
  $('att-table').querySelector('tbody').innerHTML = Object.keys(att).map(function(k){ return '<tr><td data-th="課">' + esc(k) + '</td><td data-th="已登場次">' + esc(att[k]) + '</td></tr>'; }).join('');
})();
</script>
"""

NAVJS = """
<script>
(function(){
  'use strict';
  var root = document.documentElement;
  var $ = function(id){ return document.getElementById(id); };
  var themeBtn = $('themeToggle');
  var darkMq = window.matchMedia('(prefers-color-scheme: dark)');
  var paintTheme = function(){
    var isDark = root.dataset.theme ? root.dataset.theme === 'dark' : darkMq.matches;
    themeBtn.querySelector('.i-moon').hidden = isDark; themeBtn.querySelector('.i-sun').hidden = !isDark;
    themeBtn.querySelector('.txt').textContent = isDark ? '淺色' : '深色';
  };
  themeBtn.addEventListener('click', function(){
    var cur = root.dataset.theme; if(!cur){ cur = darkMq.matches ? 'dark' : 'light'; }
    var next = cur === 'dark' ? 'light' : 'dark'; root.dataset.theme = next;
    try { localStorage.setItem('lew-theme', next); } catch(e) {}
    paintTheme();
  });
  if(darkMq.addEventListener) darkMq.addEventListener('change', paintTheme);
  paintTheme();
  var projBtn = $('projToggle');
  var paintProj = function(on){ projBtn.querySelector('.txt').textContent = on ? '投影中' : '投影'; projBtn.setAttribute('aria-pressed', on ? 'true' : 'false'); };
  paintProj(root.classList.contains('projector'));
  projBtn.addEventListener('click', function(){
    var on = root.classList.toggle('projector'); paintProj(on);
    try { localStorage.setItem('lew-proj', on ? '1' : '0'); } catch(e) {}
  });
  /* 導覽列可滑：兩顆鈕只在有東西被遮住時出現 */
  var links = $('navLinks'), prev = $('navPrev'), next = $('navNext');
  var fade = function(){
    var more = links.scrollWidth - links.clientWidth > 2;
    prev.hidden = !(more && links.scrollLeft > 2);
    next.hidden = !(more && links.scrollLeft + links.clientWidth < links.scrollWidth - 2);
  };
  prev.addEventListener('click', function(){ links.scrollBy({ left: -200, behavior: 'smooth' }); });
  next.addEventListener('click', function(){ links.scrollBy({ left: 200, behavior: 'smooth' }); });
  links.addEventListener('scroll', fade); window.addEventListener('resize', fade); fade();
})();
</script>
"""

HEAD = """<!DOCTYPE html>
<html lang="zh-Hant-TW">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>從學習證據到教學改進｜講師的成績批改實況</title>
<meta name="description" content="延伸資料：講師自己這學期（115-1）六門課的作業怎麼收、怎麼改、怎麼查、怎麼推成績簿。只有計數與比例，沒有任何學生資料。">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="assets/site.css">
<style>""" + CSS + """</style>
""" + boot + """
</head>
<body>
<a class="skip" href="#main">跳到主要內容</a>
"""

html = HEAD + nav + "\n" + BODY + "\n" + foot + "\n" + RENDER + NAVJS + "</body>\n</html>\n"
(ROOT / "pipeline.html").write_text(html, encoding="utf-8", newline="\n")
print("wrote pipeline.html", len(html), "chars")
