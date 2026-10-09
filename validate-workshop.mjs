#!/usr/bin/env node
/* validate-workshop.mjs — 內容守門腳本（Node 22、無相依）
   用法：node validate-workshop.mjs
   任何 FAIL → process.exit(1)；GitHub Actions 的 push 也會跑同一支。
   缺檔不會崩潰：印清楚缺哪個檔、誰負責，其餘檢查照跑，最後一起列出。
   查什麼（照 03-建置工單「E」那列）：
     1. workflow-data.js 載進 vm：議程合計 120、四塊各欄非空、提示詞無 HTML 標籤、一頁設計 11 欄、8 張圖
     2. 所有 HTML 與 md：無占位符、無禁用詞（陸式用語）、示範代號格式
     3. 必要錨點：硬規矩句、「兩種紀錄怎麼讀成同一種」、紅線三句、工作台分頁與按鈕名稱
     4. data/*.csv 三份各 24 筆、第一行合成宣告、欄位齊；sample-analysis.json 三組各有 ai_wrong_on，落差數字跟 CSV 對得上
     5. slides/ 頁數 18–22、8 個 data-figure 都出現
     6. 四頁共同規矩：DOCTYPE、lang、viewport、title、載 site.css 與 workflow-data.js、兩顆導覽鈕、固定頁尾 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const fails = [], warns = [], notes = [];
const seenMsg = new Set();
const push = (arr, m) => { if (!seenMsg.has(m)) { seenMsg.add(m); arr.push(m); } };
const fail = m => push(fails, m);
const warn = m => push(warns, m);
const note = m => push(notes, m);
const P = rel => path.join(ROOT, rel);
const exists = rel => fs.existsSync(P(rel));
const read = rel => fs.readFileSync(P(rel), 'utf8').replace(/^﻿/, '');
const stripTags = s => s.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<!--[\s\S]*?-->/g, ' ').replace(/<[^>]+>/g, ' ');
const squash = s => s.replace(/\s+/g, ' ').trim();
const snippet = (s, i, n = 16) => squash(s.slice(Math.max(0, i - n), i + n));
function section(title, fn) { try { fn(); } catch (e) { fail(`${title}：檢查程式自己出錯——${e.message}`); } }

/* ───────── 0. 檔案清單與負責人（缺檔只記錄，不崩潰） ───────── */
const OWNER = {
  'workflow-data.js': '洄瀾（共用層）',
  'assets/site.css': '洄瀾（共用層）',
  'LICENSE': '已建',
  'data/project-presentation-scores.csv': '洄瀾（共用層）',
  'data/pe-squat-scores.csv': '洄瀾（共用層）',
  'data/lab-report-scores.csv': '洄瀾（共用層）',
  'data/sample-analysis.json': '洄瀾（共用層）',
  'start.html': 'A',
  'material.html': 'B',
  'studio.html': 'C',
  'slides/index.html': 'D',
  'slides/deck.css': 'D',
  'index.html': 'E',
  'README.md': 'E',
  'data/README.md': 'E',
  'prompts/README.md': 'E'
};
const missing = new Set();
for (const [rel, owner] of Object.entries(OWNER)) {
  if (!exists(rel)) { missing.add(rel); fail(`缺檔：${rel}（代號 ${owner} 負責；檔案出現前這條會一直紅）`); }
}
const have = rel => !missing.has(rel) && exists(rel);

const slideFiles = exists('slides') ? fs.readdirSync(P('slides')).filter(f => /^\d{2}\.html$/.test(f)).sort() : [];
if (!slideFiles.length) fail('缺檔：slides/01.html…（代號 D 負責；投影片一頁都還沒有）');

/* ───────── 1. 資料源 workflow-data.js ───────── */
let flow = null;
section('載入 workflow-data.js', () => {
  if (!have('workflow-data.js')) return;
  const sandbox = { window: {} };
  vm.runInNewContext(read('workflow-data.js'), sandbox, { filename: 'workflow-data.js' });
  flow = sandbox.window.WORKSHOP_FLOW || null;
  if (!flow) fail('workflow-data.js 跑完沒有 window.WORKSHOP_FLOW');
});

const RULE_FULL = '挑一句不同意的、改掉、寫下為什麼。';
const RULE_CORE = RULE_FULL.replace(/。$/, '');
const AC1_TITLE = '兩種紀錄怎麼讀成同一種';

section('資料源：meta', () => {
  if (!flow) return;
  const m = flow.meta || {};
  for (const f of ['title', 'subtitle', 'tagline', 'date', 'time', 'venue', 'host', 'speaker', 'rule', 'aiRule', 'siteUrl', 'prevWorkshopUrl', 'simUrl']) {
    if (typeof m[f] !== 'string' || !m[f].trim()) fail(`meta.${f} 是空的`);
  }
  if (m.rule !== RULE_FULL) fail(`meta.rule 應為「${RULE_FULL}」，目前「${m.rule}」`);
  for (const f of ['siteUrl', 'prevWorkshopUrl', 'simUrl']) if (m[f] && !/^https:\/\/cwstedctw\.github\.io\//.test(m[f])) fail(`meta.${f} 不是 cwstedctw.github.io 底下的網址：${m[f]}`);
});

section('資料源：議程', () => {
  if (!flow) return;
  const a = flow.agenda;
  if (!Array.isArray(a) || a.length < 5) return fail('agenda 不是陣列或少於 5 段');
  const total = a.reduce((s, x) => s + (Number(x.minutes) || 0), 0);
  if (total !== 120) fail(`議程分鐘合計應為 120，目前 ${total}`);
  if (typeof flow.totalMinutes === 'function' && flow.totalMinutes() !== 120) fail(`flow.totalMinutes() 回 ${flow.totalMinutes()}，不是 120`);
  const toMin = t => { const r = /^(\d{1,2}):(\d{2})$/.exec(String(t)); return r ? Number(r[1]) * 60 + Number(r[2]) : NaN; };
  const blockIds = new Set((flow.blocks || []).map(b => b.id));
  a.forEach((x, i) => {
    const tag = x.id || `agenda[${i}]`;
    for (const f of ['id', 'start', 'end', 'title', 'mode', 'summary', 'takeaway']) if (typeof x[f] !== 'string' || !x[f].trim()) fail(`${tag} 缺 ${f}`);
    const s = toMin(x.start), e = toMin(x.end);
    if (Number.isNaN(s) || Number.isNaN(e)) return fail(`${tag} 的時間不是 HH:MM`);
    if (e - s !== x.minutes) fail(`${tag} 宣告 ${x.minutes} 分鐘，但 ${x.start}–${x.end} 是 ${e - s} 分鐘`);
    if (i && toMin(a[i - 1].end) !== s) fail(`${tag} 從 ${x.start} 開始，接不上前一段的結束 ${a[i - 1].end}`);
    if (x.blockId && !blockIds.has(x.blockId)) fail(`${tag} 指到不存在的塊 ${x.blockId}`);
  });
  if (a[0].start !== '15:00' || a[a.length - 1].end !== '17:00') fail('議程應從 15:00 開始、17:00 結束');
});

section('資料源：四塊', () => {
  if (!flow) return;
  const b = flow.blocks;
  if (!Array.isArray(b) || b.length !== 4) return fail(`blocks 應為 4 塊，目前 ${b ? b.length : '沒有'}`);
  const figIds = new Set((flow.figures || []).map(f => f.id));
  b.forEach((blk, i) => {
    const tag = blk.id || `blocks[${i}]`;
    for (const f of ['id', 'num', 'title', 'mode', 'why', 'concept', 'behind', 'rescue', 'figureId']) if (typeof blk[f] !== 'string' || !blk[f].trim()) fail(`${tag} 的 ${f} 是空的`);
    if (!Array.isArray(blk.steps) || blk.steps.length < 3) fail(`${tag} 的 steps 少於 3 步`);
    else blk.steps.forEach((st, j) => { for (const f of ['say', 'ai', 'human']) if (typeof st[f] !== 'string' || !st[f].trim()) fail(`${tag} 第 ${j + 1} 步的「${f}」是空的`); });
    if (blk.figureId && !figIds.has(blk.figureId)) fail(`${tag} 的 figureId ${blk.figureId} 不在 figures 清單`);
  });
  if (b.map(x => x.id).join(',') !== 'B1,B2,B3,B4') fail('四塊順序應為 B1,B2,B3,B4');
});

section('資料源：提示詞卡', () => {
  if (!flow) return;
  const ps = flow.prompts;
  if (!Array.isArray(ps) || ps.length < 6) return fail(`prompts 應至少 6 張，目前 ${ps ? ps.length : '沒有'}`);
  const tag = /<\/?[a-zA-Z][a-zA-Z0-9]*(\s[^>]*)?\/?>/;
  const blockIds = new Set((flow.blocks || []).map(b => b.id));
  const seen = new Set();
  for (const p of ps) {
    for (const f of ['id', 'title', 'block', 'text']) if (typeof p[f] !== 'string' || !p[f].trim()) fail(`提示詞卡 ${p.id || '?'} 的 ${f} 是空的`);
    if (seen.has(p.id)) fail(`提示詞卡 id 重複：${p.id}`); seen.add(p.id);
    if (tag.test(p.text || '')) fail(`${p.id} 的提示詞混進 HTML 標籤——這段會被老師整段複製貼給 AI，只能是純文字`);
    if (!(blockIds.has(p.block) || p.block === 'after')) fail(`${p.id} 的 block「${p.block}」既不是四塊之一也不是 after`);
  }
});

section('資料源：一頁設計 11 欄', () => {
  if (!flow) return;
  const d = flow.designFields;
  if (!Array.isArray(d) || d.length !== 11) return fail(`designFields 應為 11 欄，目前 ${d ? d.length : '沒有'}`);
  const seen = new Set();
  d.forEach((f, i) => {
    for (const k of ['id', 'label', 'planLabel', 'hint', 'demo']) if (typeof f[k] !== 'string' || !f[k].trim()) fail(`designFields[${i}]（${f.id || '?'}）的 ${k} 是空的`);
    if (seen.has(f.id)) fail(`designFields id 重複：${f.id}`); seen.add(f.id);
  });
});

section('資料源：8 張圖', () => {
  if (!flow) return;
  const g = flow.figures;
  if (!Array.isArray(g) || g.length !== 6) return fail(`figures 應為 6 張（簡化版：議程、時間軸、Rubric 並列、落差、抽查、一頁設計），目前 ${g ? g.length : '沒有'}`);
  const seen = new Set();
  for (const f of g) {
    for (const k of ['id', 'title', 'note']) if (typeof f[k] !== 'string' || !f[k].trim()) fail(`figure ${f.id || '?'} 的 ${k} 是空的`);
    if (!/^F-[a-z-]+$/.test(f.id || '')) fail(`figure id 格式應為 F-xxx：${f.id}`);
    if (seen.has(f.id)) fail(`figure id 重複：${f.id}`); seen.add(f.id);
  }
});

section('資料源：紅線、路線、桌牌、範例、課後手冊', () => {
  if (!flow) return;
  const r = flow.redlines;
  if (!Array.isArray(r) || r.length !== 1) fail(`redlines 簡化版只剩 1 句底線，目前 ${r ? r.length : '沒有'}`);
  else r.forEach(x => { for (const k of ['id', 'title', 'text']) if (typeof x[k] !== 'string' || !x[k].trim()) fail(`紅線 ${x.id || '?'} 的 ${k} 是空的`); });
  const rt = flow.routes;
  if (!Array.isArray(rt) || rt.map(x => x.id).join(',') !== 'agent') fail('routes 只能有一條 agent（Ted 2026-10-02：全員用 AI agent、不留瀏覽器路線）');
  else rt.forEach(x => {
    for (const k of ['label', 'promise', 'rescue']) if (typeof x[k] !== 'string' || !x[k].trim()) fail(`路線 ${x.id} 的 ${k} 是空的`);
    for (const k of ['needs', 'how']) if (!Array.isArray(x[k]) || !x[k].length) fail(`路線 ${x.id} 的 ${k} 是空的`);
  });
  if (rt && rt[0] && !/AI 助手/.test(rt[0].label)) fail('routes[0] 的 label 應講到「AI 助手」');
  if (flow.tableCards !== undefined) fail('tableCards 已在簡化版刪除（Ted 2026-10-02：桌牌不要），資料源不該再有這個鍵');
  const ex = flow.examples || {};
  for (const k of ['presentation', 'pe', 'lab']) {
    if (!ex[k]) { fail(`examples 缺 ${k}`); continue; }
    for (const f of ['label', 'task', 'medium', 'disagreeExample', 'whyChanged']) if (typeof ex[k][f] !== 'string' || !ex[k][f].trim()) fail(`examples.${k}.${f} 是空的`);
    if (!Array.isArray(ex[k].criteria) || ex[k].criteria.length !== 4) fail(`examples.${k}.criteria 應為 4 個規準`);
  }
  const ac = flow.afterCourse;
  if (!Array.isArray(ac) || ac.length !== 5) fail(`afterCourse 應為 5 節，目前 ${ac ? ac.length : '沒有'}`);
  else {
    if (ac[0].title !== AC1_TITLE) fail(`afterCourse[0].title 應為「${AC1_TITLE}」`);
    ac.forEach(x => { for (const k of ['id', 'title', 'text']) if (typeof x[k] !== 'string' || !x[k].trim()) fail(`課後手冊 ${x.id || '?'} 的 ${k} 是空的`); });
  }
});

/* ───────── 2. 全文掃描：占位符、禁用詞、代號格式 ───────── */
const PLACEHOLDERS = [
  { re: /【待補】/g, label: '【待補】' },
  { re: /【TODO】/g, label: '【TODO】' },
  { re: /\bTODO\b/g, label: 'TODO' },
  { re: /\blorem\b/gi, label: 'lorem' },
  { re: /\bXXX\b/g, label: 'XXX' }
];
// 禁用詞（陸式用語）→ 建議改法。「通過」只擋當介詞用的那種（當動詞「通過審查」放行）；「程序」放行「程序正義」。
const BANNED = [
  ['软件', '軟體'], ['視頻', '影片'], ['视频', '影片'], ['激活', '啟用'], ['信息', '資訊'], ['数据库', '資料庫'], ['默认', '預設'],
  ['屏幕', '螢幕'], ['哈希', '雜湊'], ['質量', '品質'], ['優化', '改善'], ['用戶', '使用者'], ['網絡', '網路'],
  ['鼠標', '滑鼠'], ['硬件', '硬體'], ['服務器', '伺服器'], ['程序', '程式'], ['軟件', '軟體']
];
const BANNED_ALLOW = {
  '程序': ctx => /程序正義/.test(ctx)
};
const PASS_THROUGH_OK = ctx => /(審查|沒|未|不|能|會|都|有|否|難|易|順利)通過|通過(了|率|與否|審查|的|。|，|！|？|$)/.test(ctx);

function listFiles(dir, pred, out = []) {
  if (!fs.existsSync(P(dir))) return out;
  for (const ent of fs.readdirSync(P(dir), { withFileTypes: true })) {
    const rel = dir ? `${dir}/${ent.name}` : ent.name;
    // 跳過：版本庫、相依套件、檢查輸出、CI 設定、AI 助手的 skill 安裝（.claude／.agents，本機用、gitignore）、派工暫放（_brief）
    if (ent.isDirectory()) { if (!/^(\.git|node_modules|_qa|\.github|\.claude|\.agents|_brief)$/.test(ent.name)) listFiles(rel, pred, out); }
    else if (pred(rel)) out.push(rel);
  }
  return out;
}
const htmlFiles = listFiles('', f => /\.html$/.test(f)).sort();
const mdFiles = listFiles('', f => /\.md$/.test(f)).sort();
const scanFiles = [...htmlFiles, ...mdFiles, ...(have('workflow-data.js') ? ['workflow-data.js'] : [])];

section('全文掃描', () => {
  for (const rel of scanFiles) {
    const src = read(rel);
    for (const { re, label } of PLACEHOLDERS) {
      re.lastIndex = 0; let m, n = 0;
      while ((m = re.exec(src)) && n < 3) { fail(`${rel} 有占位符「${label}」：…${snippet(src, m.index)}…`); n++; }
    }
    for (const [bad, good] of BANNED) {
      let idx = -1, n = 0;
      while ((idx = src.indexOf(bad, idx + 1)) !== -1 && n < 3) {
        const ctx = src.slice(Math.max(0, idx - 4), idx + bad.length + 4);
        if (BANNED_ALLOW[bad] && BANNED_ALLOW[bad](ctx)) continue;
        fail(`${rel} 有禁用詞「${bad}」→ 改「${good}」：…${snippet(src, idx)}…`); n++;
      }
    }
    { // 通過（當介詞）
      let idx = -1, n = 0;
      while ((idx = src.indexOf('通過', idx + 1)) !== -1 && n < 3) {
        const ctx = src.slice(Math.max(0, idx - 3), idx + 6);
        if (PASS_THROUGH_OK(ctx)) continue;
        fail(`${rel} 的「通過」像是當介詞用 → 改「透過」（當動詞「通過審查」可以）：…${snippet(src, idx)}…`); n++;
      }
    }
    for (const m of src.matchAll(/DEMO-S(\d+)/g)) {
      const n = m[1];
      if (!/^\d{2}$/.test(n) || Number(n) < 1 || Number(n) > 24) { fail(`${rel} 的示範代號格式錯（應為 DEMO-S01…DEMO-S24）：${m[0]}`); break; }
    }
    if (/\.html$|\.md$/.test(rel) && /瀏覽器路線[^。\n]{0,6}主線/.test(src)) fail(`${rel} 把瀏覽器路線寫成主線——v2.1 是 AI agent 路線＝主線、瀏覽器＝逃生門`);
    if (/免費額度\s*\d|每(日|天|週|月)\s*\d+\s*(次|則|筆|requests)/i.test(src)) warn(`${rel} 疑似寫了免費額度數字（規矩：額度與版本號一律不寫）：…${snippet(src, src.search(/免費額度\s*\d|每(日|天|週|月)\s*\d+\s*(次|則|筆|requests)/i))}…`);
  }
});

/* ───────── 3. 四頁共同規矩＋必要錨點 ───────── */
const FOOTER = '© 2026 陳文盛（國立東華大學通識教育中心）× AI 協作團隊——洄瀾（組長・Claude）、立霧（Codex）、秀姑巒（Gemini）、木瓜溪（OpenCode）、美崙溪（Grok）｜本教材以 CC BY-NC-SA 4.0 授權——歡迎教學與自學使用；改作請同樣開放，請勿商用。';
const FEES = '工具費用與方案會變動，開始前請以各官方頁面現況為準。';
const PAGES = ['index.html', 'start.html', 'material.html', 'studio.html'];
const TABS = ['Rubric 工作台', '證據儀表板', '一頁設計'];
const BUTTONS = ['複製', '看範例輸出', '比較兩版', '匯出這一輪', '抽 3 筆回查', '匯出抽查紀錄', '帶入示範課', '匯出 Markdown', '講師模式', '清除暫存'];
const REQUIRED_FIELDS = ['為什麼改', '三句結論'];

const siteTokens = new Set();
if (have('assets/site.css')) for (const m of read('assets/site.css').matchAll(/--([\w-]+)\s*:/g)) siteTokens.add(m[1]);

function basicHtmlChecks(rel, src, { needSiteCss = false, needDeck = false } = {}) {
  if ((src.match(/<!DOCTYPE html>/gi) || []).length !== 1) fail(`${rel} 的 <!DOCTYPE html> 應恰好一個`);
  if (!/<html[^>]*\blang="zh-Hant-TW"/.test(src)) fail(`${rel} 的 <html> 缺 lang="zh-Hant-TW"`);
  if (!/<meta[^>]*name="viewport"/.test(src)) fail(`${rel} 缺 viewport`);
  const t = /<title>([^<]*)<\/title>/.exec(src);
  if (!t || !t[1].trim()) fail(`${rel} 缺 <title>`);
  if (needSiteCss && !/href="assets\/site\.css"/.test(src)) fail(`${rel} 沒載 assets/site.css`);
  if (needDeck && !/href="deck\.css"/.test(src)) fail(`${rel} 沒載 deck.css`);
  const ids = [...src.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
  const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
  if (dup.length) fail(`${rel} 有重複 id：${[...new Set(dup)].join('、')}`);
  // inline script 語法（略過 module）
  for (const m of src.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (/type="module"/.test(m[1]) || /type="application\/json"/.test(m[1])) continue;
    try { new Function(m[2]); } catch (e) { fail(`${rel} 的 inline script 語法錯誤：${e.message}`); }
  }
  // 本機連結存在
  const dir = path.dirname(rel);
  for (const m of src.matchAll(/\bhref="([^"#]+)(?:#[^"]*)?"/g)) {
    const href = m[1];
    if (/^(?:https?:|mailto:|tel:|javascript:|data:)/i.test(href) || /[${}+'()]/.test(href)) continue; // 用 JS 拼出來的連結跳過
    const target = path.normalize(path.join(dir === '.' ? '' : dir, href));
    if (!fs.existsSync(P(target))) fail(`${rel} 連到不存在的本機檔：${href}`);
  }
  for (const m of src.matchAll(/\bhref="(https?:\/\/[^"]+)"/g)) {
    if (/example\.(com|org|net)|localhost|127\.0\.0\.1|your-|placeholder|\bxxx\b|tbd/i.test(m[1])) fail(`${rel} 有假連結：${m[1]}`);
  }
}

const pageSrc = {};
section('四頁共同規矩', () => {
  for (const rel of PAGES) {
    if (!have(rel)) continue;
    const src = read(rel); pageSrc[rel] = src;
    basicHtmlChecks(rel, src, { needSiteCss: true });
    if (!/<script src="workflow-data\.js"><\/script>/.test(src)) fail(`${rel} 沒載 workflow-data.js（清單類內容要從資料源渲染）`);
    // 2026-10-02 UI 打磨：兩顆鈕改成內嵌 SVG＋可見文字（「投影」「深色」），用 id 認；舊的表情符號寫法仍放行（learn.html 還是舊寫法）
    if (!src.includes('🔎 投影') && !/id="projToggle"[^>]*>[\s\S]*?<span class="txt">投影<\/span>/.test(src)) fail(`${rel} 導覽列缺「投影」鈕（id="projToggle"＋可見字「投影」，或舊寫法「🔎 投影」）`);
    if (!src.includes('🌗') && !/id="themeToggle"[^>]*>[\s\S]*?<span class="txt">深色<\/span>/.test(src)) fail(`${rel} 導覽列缺「深色」鈕（id="themeToggle"＋可見字「深色」，或舊寫法「🌗」）`);
    if (!/\.projector\b/.test(src) && !/classList\.toggle\('projector'\)/.test(src) && !/projector/.test(src)) fail(`${rel} 看不到投影模式（:root.projector）的切換`);
    if (!/data-theme|dataset\.theme/.test(src)) fail(`${rel} 看不到深淺色（data-theme）的切換`);
    const text = squash(stripTags(src));
    if (!text.includes(FOOTER)) fail(`${rel} 頁尾不是固定文字（去掉標籤後找不到整句「© 2026 陳文盛…請勿商用。」，請逐字對工單）`);
    if (!text.includes(FEES)) fail(`${rel} 頁尾缺「${FEES}」`);
    // CSS 變數都有定義（site.css ＋ 頁內）
    const defined = new Set(siteTokens);
    for (const m of src.matchAll(/--([\w-]+)\s*:/g)) defined.add(m[1]);
    const undef = new Set();
    for (const m of src.matchAll(/var\(--([\w-]+)/g)) if (!defined.has(m[1])) undef.add(m[1]);
    if (undef.size) fail(`${rel} 用了沒定義的 CSS 變數：--${[...undef].join('、--')}`);
  }
});

const hasLiteral = (src, s) => src.includes(s);
const escapeRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// 「從資料源渲染」兩種寫法都認：
//   (a) JS 的 <別名>.xxx——別名＝該檔自己取的（`var X = window.WORKSHOP_FLOW`；material.html 用 F、其餘頁用 FLOW），
//       沒取別名的檔退回認 FLOW／WORKSHOP_FLOW（2026-10-02 補：原本只認 FLOW，講義的 F.blocks 永遠對不上）
//   (b) 投影片 deck.js 的 data-fill="xxx"／data-list="xxx"
function flowAliases(src) {
  const names = new Set(['WORKSHOP_FLOW']);
  for (const m of src.matchAll(/([A-Za-z_$][\w$]*)\s*=\s*window\.WORKSHOP_FLOW\b/g)) names.add(m[1]);
  if (names.size === 1) names.add('FLOW');
  return [...names];
}
const hasData = (src, key) => {
  const alias = flowAliases(src).map(escapeRe).join('|');
  const keyRe = key.split('.').map(escapeRe).join('\\s*\\.\\s*');
  return new RegExp(`(?<![\\w$])(?:${alias})\\s*\\.\\s*${keyRe}\\b`).test(src)
    || new RegExp(`data-(?:fill|list|pairs)="${escapeRe(key)}(?:[."]|\\b)`).test(src);
};
// 工作台的分頁／按鈕／必填欄名稱要是「看得見的文字」：>名稱<（靜態標籤或 JS 模板裡的標籤都算），
// aria-label、訊息字串、註解不算（2026-10-02 補：原本整檔 includes，可見字改了 aria-label 還在就放行）
const hasVisibleLabel = (src, name) => new RegExp(`>\\s*${escapeRe(name)}\\s*<`).test(src.replace(/<!--[\s\S]*?-->/g, ' '));

section('必要錨點：硬規矩句', () => {
  for (const rel of ['material.html', 'studio.html']) {
    if (!have(rel)) continue;
    const src = pageSrc[rel];
    if (hasLiteral(src, RULE_CORE)) continue;
    if (hasData(src, 'meta.rule')) { note(`${rel} 的硬規矩句是從 meta.rule 渲染的（沒有原文字串）`); continue; }
    fail(`${rel} 找不到硬規矩句「${RULE_FULL}」（原文或 meta.rule 都沒有）`);
  }
  if (slideFiles.length) {
    const hit = slideFiles.some(f => hasLiteral(read(`slides/${f}`), RULE_CORE) || hasData(read(`slides/${f}`), 'meta.rule'));
    if (!hit) fail(`slides/*.html 沒有任何一頁寫硬規矩句「${RULE_FULL}」`);
  }
  if (have('index.html') && !hasLiteral(pageSrc['index.html'], RULE_CORE)) fail(`index.html 應有硬規矩句原文`);
});

section('必要錨點：兩種紀錄', () => {
  if (!have('material.html')) return;
  const src = pageSrc['material.html'];
  if (hasLiteral(src, AC1_TITLE)) return;
  if (hasData(src, 'afterCourse')) return note(`material.html 的課後手冊是從 afterCourse 渲染的（「${AC1_TITLE}」沒有原文字串）`);
  fail(`material.html 找不到「${AC1_TITLE}」（原文或 afterCourse 都沒有）`);
});

section('必要錨點：紅線三句', () => {
  if (!flow) return;
  for (const rel of ['index.html', 'start.html', 'material.html']) {
    if (!have(rel)) continue;
    const src = pageSrc[rel];
    const miss = flow.redlines.filter(r => !hasLiteral(src, r.title));
    if (!miss.length) continue;
    if (hasData(src, 'redlines')) { note(`${rel} 的紅線是從 redlines 渲染的（標題沒有原文字串：${miss.map(r => r.title).join('、')}）`); continue; }
    fail(`${rel} 缺紅線標題：${miss.map(r => r.title).join('、')}`);
  }
});

section('講師自己的例子（teacherExample）與一頁設計的第二套示範（demoTalk）', () => {
  if (!flow) return;
  const t = flow.teacherExample;
  if (!t) return fail('workflow-data.js 缺 teacherExample（講師自己的例子：演講課學習單）');
  for (const f of ['label', 'course', 'task', 'scoring', 'evidence', 'v1', 'v2', 'whyChanged', 'note']) if (typeof t[f] !== 'string' || !t[f].trim()) fail(`teacherExample.${f} 空的`);
  if (!Array.isArray(t.sections) || t.sections.length !== 5) fail('teacherExample.sections 應為 5 區（學習單的五個區）');
  if (typeof t.v2 === 'string' && !/草案/.test(t.v2)) fail('teacherExample.v2 要寫明是草案（第 2 版還沒換，不寫不實資料）');
  for (const d of flow.designFields || []) if (typeof d.demoTalk !== 'string' || !d.demoTalk.trim()) fail(`designFields.${d.id} 缺 demoTalk（「帶入演講課」要填的字）`);
  if (have('studio.html') && !hasVisibleLabel(pageSrc['studio.html'], '帶入演講課')) fail('studio.html 缺「帶入演講課」按鈕（可見文字要一字不差）');
  if (have('material.html')) {
    const src = pageSrc['material.html'];
    if (!hasData(src, 'teacherExample')) fail('material.html 沒有從 teacherExample 渲染講師自己的例子卡');
    if (!src.includes('帶入演講課')) fail('material.html 工作台按鈕表要列「帶入演講課」');
  }
  if (!have('assets/worksheet-template.png')) fail('assets/worksheet-template.png 不在（講師例子卡的空白學習單圖）');
});

section('產線實況頁（pipeline.html）：只准有計數、導覽列全站都有它', () => {
  if (!have('pipeline.html')) return fail('缺 pipeline.html（講師的成績產線實況）');
  const src = pageSrc['pipeline.html'] || read('pipeline.html');
  if (!src.includes('沒有任何學號、姓名或個別分數')) fail('pipeline.html 要寫明「沒有任何學號、姓名或個別分數」');
  if (!src.includes('data/pipeline-stats.js')) fail('pipeline.html 沒載 data/pipeline-stats.js');
  if (!have('data/pipeline-stats.js')) return fail('缺 data/pipeline-stats.js（計數統計檔）');
  const data = read('data/pipeline-stats.js');
  if (new RegExp('[0-9]{6,}').test(data)) fail('data/pipeline-stats.js 出現 6 位以上連續數字（像學號或 cmid）——統計檔只准有計數');
  for (const bad of ['"學號"', '"姓名"', 'student_id', 'cmid']) if (data.includes(bad)) fail(`data/pipeline-stats.js 出現 ${bad}`);
  if (!/window\.PIPELINE_STATS\s*=/.test(data)) fail('data/pipeline-stats.js 沒有 window.PIPELINE_STATS');
  for (const rel of ['index.html', 'learn.html', 'start.html', 'material.html', 'studio.html', 'pipeline.html']) {
    if (have(rel) && !(pageSrc[rel] || read(rel)).includes('href="pipeline.html"')) fail(`${rel} 導覽列缺「產線實況」（href="pipeline.html"）`);
  }
  const typeIds = [...data.matchAll(/"id": "([a-z0-9_]+)",\s*"title"/g)].map(m => m[1]);
  const typePages = fs.readdirSync(P('.')).filter(f => /^pipeline-[a-z0-9_]+\.html$/.test(f));
  if (typeIds.length && typePages.length !== typeIds.length) fail(`一種作業一頁：統計檔有 ${typeIds.length} 種作業、頁面有 ${typePages.length} 張（重跑 data/make_pipeline_pages.py）`);
  for (const id of typeIds) if (!typePages.includes(`pipeline-${id}.html`)) fail(`缺 pipeline-${id}.html`);
  for (const f of typePages) {
    const s = read(f);
    if (!s.includes('沒有任何學號、姓名或個別分數')) fail(`${f} 缺「沒有任何學號、姓名或個別分數」`);
    if (new RegExp('[0-9]{6,}').test(s)) fail(`${f} 出現 6 位以上連續數字（像學號或平台編號）`);
    if (!s.includes('href="pipeline.html"')) fail(`${f} 缺回總覽的連結`);
    if (!s.includes('評分表不是先寫好再收作業')) fail(`${f} 缺「評分表是讀完全班材料後才定」那一句`);
  }
});

section('必要錨點：工作台分頁與按鈕名稱', () => {
  const names = [...TABS, ...BUTTONS, ...REQUIRED_FIELDS];
  if (have('studio.html')) {
    const src = pageSrc['studio.html'];
    const miss = names.filter(n => !hasVisibleLabel(src, n));
    if (miss.length) fail(`studio.html 找不到這些分頁／按鈕／必填欄名稱（可見文字要一字不差＝標籤裡恰好是這幾個字；只寫在 aria-label 或訊息字串裡不算）：${miss.map(n => `「${n}」`).join('')}`);
    if (/XMLHttpRequest|new\s+WebSocket\(|<script[^>]*src="https?:/.test(src)) fail('studio.html 不得呼叫網路或載外部腳本（純前端、離線可開）');
    if (/\bfetch\s*\(/.test(src)) warn('studio.html 出現 fetch(——工作台不該抓網路；如果只是註解提到，改個寫法');
    if (/api\.openai\.com|generativelanguage\.googleapis|api\.anthropic\.com/.test(src)) fail('studio.html 出現 AI API 網址——工作台不呼叫任何 AI');
  }
  if (have('material.html')) {
    const src = pageSrc['material.html'];
    const data = have('workflow-data.js') ? read('workflow-data.js') : '';
    const miss = [], viaData = [];
    for (const n of names) { if (src.includes(n)) continue; if (data.includes(n) && hasData(src, 'blocks')) viaData.push(n); else miss.push(n); }
    if (viaData.length) note(`material.html 這些名稱只在資料源裡、靠 blocks 渲染出來：${viaData.map(n => `「${n}」`).join('')}`);
    if (miss.length) fail(`material.html 找不到這些分頁／按鈕／必填欄名稱（講義提到工作台時要照工單那張表）：${miss.map(n => `「${n}」`).join('')}`);
  }
  if (have('index.html')) {
    const miss = TABS.filter(n => !pageSrc['index.html'].includes(n));
    if (miss.length) fail(`index.html 介紹工作台時缺分頁名：${miss.join('、')}`);
  }
});

section('index.html 內容', () => {
  if (!have('index.html') || !flow) return;
  const src = pageSrc['index.html'];
  for (const [k, v] of [['meta.title', flow.meta.title], ['meta.tagline', flow.meta.tagline], ['meta.date', flow.meta.date]]) if (!src.includes(v)) fail(`index.html 沒有 ${k} 的原文「${v}」`);
  for (const dest of ['start.html', 'material.html', 'studio.html', 'slides/index.html']) if (!new RegExp(`href="${dest.replace('.', '\\.')}"`).test(src)) fail(`index.html 缺去處連結：${dest}`);
  for (const key of ['redlines', 'agenda']) if (!hasData(src, key)) fail(`index.html 沒有從資料源渲染 ${key}`);
  if (!src.includes(flow.meta.siteUrl)) fail('index.html 沒寫站台網址（meta.siteUrl）');
});

/* ───────── 4. 投影片 ───────── */
section('投影片', () => {
  if (!slideFiles.length) return;
  if (slideFiles.length < 12 || slideFiles.length > 16) fail(`slides/ 頁數應在 12–16（簡化版 14 頁為準），目前 ${slideFiles.length}`);
  const expected = slideFiles.map((_, i) => String(i + 1).padStart(2, '0') + '.html');
  if (slideFiles.join(',') !== expected.join(',')) fail(`slides/ 頁碼不連續：${slideFiles.join(',')}`);
  const all = {};
  for (const f of slideFiles) { all[f] = read(`slides/${f}`); basicHtmlChecks(`slides/${f}`, all[f], { needDeck: true }); }
  if (flow) for (const fig of flow.figures) {
    const where = slideFiles.filter(f => all[f].includes(`data-figure="${fig.id}"`));
    if (!where.length) fail(`投影片沒有任何一頁標 data-figure="${fig.id}"（${fig.title}）`);
  }
  if (have('slides/index.html')) basicHtmlChecks('slides/index.html', read('slides/index.html'));
});

/* ───────── 5. 示範資料 ───────── */
function parseCsvLine(line) {
  const out = []; let cur = '', q = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (q) { if (ch === '"') { if (line[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += ch; }
    else if (ch === '"') q = true;
    else if (ch === ',') { out.push(cur); cur = ''; }
    else cur += ch;
  }
  out.push(cur); return out;
}
const CSV_COLS = ['student_id', 'task', 'evidence_medium', 'self_score', 'peer_score', 'teacher_score', 'teacher_weakest_criterion', 'reflection_text', 'synthetic_note'];
const DATASETS = [
  ['project-presentation', 'data/project-presentation-scores.csv'],
  ['pe-squat', 'data/pe-squat-scores.csv'],
  ['lab-report', 'data/lab-report-scores.csv']
];
const csvRows = {};
section('示範資料：CSV', () => {
  for (const [key, rel] of DATASETS) {
    if (!have(rel)) continue;
    const lines = read(rel).split(/\r?\n/).filter((l, i, arr) => !(i === arr.length - 1 && l === ''));
    if (!/^#\s*合成資料/.test(lines[0] || '')) fail(`${rel} 第一行應為合成宣告（# 合成資料…）`);
    const header = parseCsvLine(lines[1] || '');
    if (header.join(',') !== CSV_COLS.join(',')) fail(`${rel} 欄位應為 ${CSV_COLS.join(',')}，目前 ${header.join(',')}`);
    const rows = lines.slice(2).map(parseCsvLine);
    if (rows.length !== 24) fail(`${rel} 應為 24 筆，目前 ${rows.length}`);
    const ids = rows.map(r => r[0]);
    const expect = Array.from({ length: 24 }, (_, i) => `DEMO-S${String(i + 1).padStart(2, '0')}`);
    if (ids.join(',') !== expect.join(',')) fail(`${rel} 的代號應為 DEMO-S01…DEMO-S24 依序`);
    rows.forEach((r, i) => {
      if (r.length !== CSV_COLS.length) return fail(`${rel} 第 ${i + 1} 筆欄位數 ${r.length}，應為 ${CSV_COLS.length}`);
      for (const c of [3, 4, 5]) { const v = Number(r[c]); if (!Number.isInteger(v) || v < 4 || v > 16) fail(`${rel} ${r[0]} 的 ${CSV_COLS[c]}=${r[c]} 不在 4–16`); }
      if (!r[7].trim()) fail(`${rel} ${r[0]} 的反思是空的`);
      if (r[8] !== '合成資料') fail(`${rel} ${r[0]} 的 synthetic_note 應為「合成資料」`);
      if (!r[1].trim() || !r[2].trim() || !r[6].trim()) fail(`${rel} ${r[0]} 的 task／evidence_medium／teacher_weakest_criterion 有空值`);
    });
    csvRows[key] = rows.map(r => Object.fromEntries(CSV_COLS.map((c, i) => [c, r[i]])));
  }
});

let analysis = null;
section('示範資料：sample-analysis.json', () => {
  if (!have('data/sample-analysis.json')) return;
  analysis = JSON.parse(read('data/sample-analysis.json'));
  for (const [key] of DATASETS) {
    const a = analysis[key];
    if (!a) { fail(`sample-analysis.json 缺 ${key}`); continue; }
    if (typeof a.ai_wrong_on !== 'string' || !/^DEMO-S\d{2}$/.test(a.ai_wrong_on)) fail(`${key} 缺 ai_wrong_on`);
    for (const f of ['ai_category', 'true_category']) if (!a[f] || Object.keys(a[f]).length !== 24) fail(`${key}.${f} 應有 24 筆`);
    if (!Array.isArray(a.gaps) || a.gaps.length !== 24) fail(`${key}.gaps 應有 24 筆`);
    if (!a.answer_key || !Object.keys(a.answer_key).length) fail(`${key} 缺 answer_key`);
    if (a.ai_category && a.true_category && a.ai_wrong_on) {
      if (a.ai_category[a.ai_wrong_on] === a.true_category[a.ai_wrong_on]) fail(`${key} 的 ai_wrong_on=${a.ai_wrong_on} 可是 AI 分類跟真分類一樣——沒有故意分錯`);
      const otherWrong = Object.keys(a.true_category).filter(id => id !== a.ai_wrong_on && a.ai_category[id] !== a.true_category[id]);
      if (otherWrong.length) fail(`${key} 除了 ${a.ai_wrong_on} 之外還有分類不一致：${otherWrong.join('、')}`);
      if (a.answer_key && !a.answer_key[a.ai_wrong_on]) fail(`${key} 的 answer_key 沒寫到故意分錯的 ${a.ai_wrong_on}`);
    }
    const flagged = (a.gaps || []).filter(g => g.flag).map(g => g.student_id);
    if (flagged.length !== 6) fail(`${key} 的 gaps 應有 6 筆 flag=true（埋設落差），目前 ${flagged.length}`);
    if (a.answer_key) for (const id of flagged) if (!a.answer_key[id]) fail(`${key} 埋設落差 ${id} 在 answer_key 裡沒有說明`);
    // 落差數字跟 CSV 對得上
    if (csvRows[key] && Array.isArray(a.gaps)) {
      const byId = Object.fromEntries(csvRows[key].map(r => [r.student_id, r]));
      for (const g of a.gaps) {
        const r = byId[g.student_id]; if (!r) { fail(`${key}.gaps 有 CSV 裡沒有的代號 ${g.student_id}`); continue; }
        const smt = Number(r.self_score) - Number(r.teacher_score), pmt = Number(r.peer_score) - Number(r.teacher_score);
        if (g.self_minus_teacher !== smt || g.peer_minus_teacher !== pmt) fail(`${key} ${g.student_id} 的落差跟 CSV 算出來的不一樣（json ${g.self_minus_teacher}/${g.peer_minus_teacher}，csv ${smt}/${pmt}）——重跑 make_demo_data.py`);
      }
    }
  }
});

section('示範資料：data/README.md 答案卡', () => {
  if (!have('data/README.md') || !analysis) return;
  const src = read('data/README.md');
  if (!/合成/.test(src)) fail('data/README.md 缺合成宣告');
  for (const c of CSV_COLS) if (!src.includes(c)) fail(`data/README.md 欄位說明缺 ${c}`);
  for (const [key, rel] of DATASETS) {
    const a = analysis[key]; if (!a) continue;
    if (!src.includes(path.basename(rel))) fail(`data/README.md 沒提到 ${path.basename(rel)}`);
    for (const [id, text] of Object.entries(a.answer_key || {})) {
      if (!src.includes(id)) fail(`data/README.md 答案卡缺 ${key} 的 ${id}`);
      else if (!src.includes(text)) fail(`data/README.md 答案卡 ${key} ${id} 的說明跟 sample-analysis.json 不一字不差`);
    }
    if (!new RegExp(`${a.ai_wrong_on}[\\s\\S]{0,200}故意`).test(src) && !new RegExp(`故意[\\s\\S]{0,200}${a.ai_wrong_on}`).test(src)) fail(`data/README.md 沒標出 ${key} 故意分錯的那筆 ${a.ai_wrong_on}`);
  }
  if (!/1016/.test(src)) warn('data/README.md 沒寫固定種子（make_demo_data.py 的 SEED=1016）');
});

section('工作台內嵌示範資料', () => {
  if (!have('studio.html')) return;
  const src = pageSrc['studio.html'];
  for (const [key, rel] of DATASETS) {
    const rows = csvRows[key]; if (!rows) continue;
    const probe = rows.find(r => r.student_id === 'DEMO-S07');
    if (probe && !src.includes(probe.reflection_text)) warn(`studio.html 找不到 ${path.basename(rel)} 的 DEMO-S07 反思原文——三份 CSV 要內嵌成 JS 常數（不用 fetch）`);
  }
  if (analysis) for (const [key] of DATASETS) {
    const a = analysis[key]; if (!a) continue;
    if (!src.includes('ai_wrong_on') && !src.includes(a.ai_wrong_on)) warn(`studio.html 看不到 ${key} 的 ai_wrong_on（講師模式要顯示答案卡）`);
  }
});

/* ───────── 6. 提示詞卡 md ───────── */
section('prompts/*.md', () => {
  if (!flow) return;
  const files = exists('prompts') ? fs.readdirSync(P('prompts')).filter(f => /\.md$/.test(f)) : [];
  const readme = have('prompts/README.md') ? read('prompts/README.md') : '';
  for (const p of flow.prompts) {
    const f = files.find(x => x.startsWith(`${p.id}-`));
    if (!f) { fail(`prompts/ 缺 ${p.id} 的 md（檔名 ${p.id}-xxx.md）`); continue; }
    const src = read(`prompts/${f}`);
    if (!src.includes(p.text)) fail(`prompts/${f} 的提示詞跟 workflow-data.js 的 ${p.id}.text 不一字不差——重跑生成、別手改`);
    if (!src.includes(p.title)) fail(`prompts/${f} 缺標題「${p.title}」`);
    if (!src.includes(RULE_CORE)) fail(`prompts/${f} 缺硬規矩句`);
    if (readme && !readme.includes(p.id)) fail(`prompts/README.md 沒列 ${p.id}`);
  }
});

/* ───────── 7. README.md ───────── */
section('README.md', () => {
  if (!have('README.md') || !flow) return;
  const src = read('README.md');
  if (!src.includes(flow.meta.siteUrl)) fail('README.md 缺線上版網址');
  for (const f of ['start.html', 'material.html', 'studio.html', 'slides/', 'workflow-data.js', 'validate-workshop.mjs', 'data/', 'prompts/']) if (!src.includes(f)) fail(`README.md 的頁面表缺 ${f}`);
  if (!/CC BY-NC-SA 4\.0/.test(src)) fail('README.md 缺授權');
  if (!src.includes(flow.meta.title)) fail('README.md 缺題目');
});

/* ───────── 收尾 ───────── */
for (const n of notes) console.log('NOTE  ' + n);
for (const w of warns) console.log('WARN  ' + w);
for (const f of fails) console.log('FAIL  ' + f);
const checked = scanFiles.length + (have('assets/site.css') ? 1 : 0) + DATASETS.filter(([, rel]) => have(rel)).length + (have('data/sample-analysis.json') ? 1 : 0);
console.log(`\n${fails.length ? 'FAIL' : 'PASS'}：${fails.length} 個 FAIL、${warns.length} 個 WARN、${notes.length} 個 NOTE（掃了 ${checked} 個檔；投影片 ${slideFiles.length} 頁）`);
process.exit(fails.length ? 1 : 0);
