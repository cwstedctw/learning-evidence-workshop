/* slides/deck.js — 投影片的執行期渲染
   每頁先載 ../workflow-data.js（window.WORKSHOP_FLOW，唯一資料源），再載這支：
   把頁面上標了 data-fill／data-list／data-pairs 的位置，從資料源重新填一次。
   _build/make_slides.py 在建置時已經用「同一套規則」把內容烤進 HTML（沒有 JS 也看得到）；
   這裡是同一份資料源的執行期版本——資料改了，頁面不用重做；兩邊填出來的字必須一模一樣
   （_build/verify_slides.py 會對）。

   支援的標記：
   - data-fill="a.b.0.c"          把路徑上的值填成 textContent
       data-sep="・" data-part="1"   先用 sep 切、取第 part 段
       data-rx="改成「(.+?)」" data-nth="0"   用正規式取第 1 個群組（第 nth 個符合）
       data-wrap="15"               SVG <text> 用：依「中文 1 格、英數 0.6 格」折行成 <tspan>
   - data-list="blocks.1.steps"   容器裡第一個 <template> 是每筆的樣板；{{欄位}}、{{欄位|ui}}、{{欄位|join}}、{{@n}}
   - data-pairs="afterCourse.3.text"  「A → B；C → D」這種句子拆成對照列（接到計畫書哪一章）
   - data-sum="agenda.minutes"    把陣列某欄加總（議程合計）；data-where="mode=動手" 只加符合的那幾筆
   純資料、無相依。 */
(function () {
  'use strict';
  var F = window.WORKSHOP_FLOW;
  if (!F) return;

  /* 工作台的分頁與按鈕名稱（講義、投影片、工作台三處一字不差）；句子裡出現「名稱」就框起來 */
  var UI = ['Rubric 工作台', '證據儀表板', '一頁設計',
    '複製', '看範例輸出', '比較兩版', '匯出這一輪', '抽 3 筆回查', '匯出抽查紀錄', '帶入示範課', '帶入演講課', '匯出 Markdown', '講師模式', '清除暫存',
    '為什麼改', '三句結論'];

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function get(obj, path) {
    var parts = path.split('.');
    var o = obj;
    for (var i = 0; i < parts.length; i++) {
      if (o == null) return undefined;
      o = o[parts[i]];
    }
    return o;
  }
  function ui(s) {
    return esc(s).replace(/「([^」]+)」/g, function (m, x) {
      return UI.indexOf(x) >= 0 ? '「<span class="ui">' + x + '</span>」' : m;
    });
  }
  /* 折行：中文 10 格、英數 6 格、空白 5 格（整數算，跟 Python 端一模一樣）；英數連成一串不拆 */
  function wrap(s, max) {
    var units = max * 10;
    var tokens = [];
    var re = /[A-Za-z0-9][A-Za-z0-9\-_.…\/]*|\s|[\s\S]/g;
    var m;
    while ((m = re.exec(s)) !== null) {
      var t = m[0];
      var w = /^[A-Za-z0-9]/.test(t) ? 6 * t.length : (/^\s$/.test(t) ? 5 : 10);
      tokens.push([t, w]);
    }
    /* 行首不放閉引號與句讀（」）。，、；：！？…），行尾不留開引號（「（）——跟 Python 端一模一樣 */
    var CLOSE = /^[」』）》〉】〕。，、；：！？…]$/, OPEN = /^[「『（《〈【〔]$/;
    var lines = [], cur = '', curW = 0;
    for (var i = 0; i < tokens.length; i++) {
      var tk = tokens[i][0], tw = tokens[i][1];
      if (cur && curW + tw > units && !CLOSE.test(tk)) {
        var carry = '', carryW = 0, last = cur.slice(-1);
        if (OPEN.test(last)) { carry = last; carryW = 10; cur = cur.slice(0, -1); }
        if (cur) lines.push(cur);
        cur = carry; curW = carryW;
      }
      if (!cur && /^\s$/.test(tk)) continue;
      cur += tk; curW += tw;
    }
    if (cur) lines.push(cur);
    return lines;
  }
  function tspans(lines, x) {
    return lines.map(function (ln, i) {
      return '<tspan x="' + esc(x) + '" dy="' + (i === 0 ? '0' : '1.4em') + '">' + esc(ln) + '</tspan>';
    }).join('');
  }
  function resolve(el, path) {
    var v = get(F, path);
    if (v == null) return null;
    v = String(v);
    var sep = el.getAttribute('data-sep');
    if (sep) {
      var part = parseInt(el.getAttribute('data-part') || '0', 10);
      v = v.split(sep)[part];
      if (v == null) return null;
    }
    var rx = el.getAttribute('data-rx');
    if (rx) {
      var nth = parseInt(el.getAttribute('data-nth') || '0', 10);
      var g = new RegExp(rx, 'g');
      var mm, k = 0, hit = null;
      while ((mm = g.exec(v)) !== null) { if (k === nth) { hit = mm[1]; break; } k++; }
      if (hit == null) return null;
      v = hit;
    }
    return v;
  }
  function fillAll() {
    var els = document.querySelectorAll('[data-fill]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var v = resolve(el, el.getAttribute('data-fill'));
      if (v == null) continue;
      var w = el.getAttribute('data-wrap');
      if (w) el.innerHTML = tspans(wrap(v, parseInt(w, 10)), el.getAttribute('x') || '0');
      else el.textContent = v;
    }
  }
  function renderItem(tpl, item, idx) {
    return tpl.replace(/\{\{\s*([^}|]+?)\s*(?:\|\s*(\w+))?\s*\}\}/g, function (m, key, filt) {
      var v = key === '@n' ? String(idx + 1) : get(item, key);
      if (v == null) return '';
      if (filt === 'ui') return ui(v);
      if (filt === 'join') return esc(Array.isArray(v) ? v.join('、') : v);
      return esc(v);
    });
  }
  function listAll() {
    var cs = document.querySelectorAll('[data-list]');
    for (var i = 0; i < cs.length; i++) {
      var c = cs[i];
      var tpl = c.querySelector('template');
      var items = get(F, c.getAttribute('data-list'));
      if (!tpl || !Array.isArray(items)) continue;
      var html = tpl.innerHTML;
      var out = '';
      for (var k = 0; k < items.length; k++) out += renderItem(html, items[k], k);
      c.innerHTML = tpl.outerHTML + out;
    }
  }
  /* 「開頭一句。A → B；C → D。」→ 開頭一句＋對照列 */
  function pairs(text) {
    var s = String(text);
    var i = s.indexOf('。');
    var intro = i >= 0 ? s.slice(0, i + 1) : '';
    var rest = (i >= 0 ? s.slice(i + 1) : s).replace(/。\s*$/, '');
    var rows = rest.split('；').map(function (p) { return p.split(' → '); }).filter(function (p) { return p.length === 2; });
    return { intro: intro, rows: rows };
  }
  function pairsAll() {
    var cs = document.querySelectorAll('[data-pairs]');
    for (var i = 0; i < cs.length; i++) {
      var c = cs[i];
      var v = get(F, c.getAttribute('data-pairs'));
      if (v == null) continue;
      var p = pairs(v);
      var html = '';
      for (var k = 0; k < p.rows.length; k++) {
        html += '<div class="l">' + esc(p.rows[k][0].trim()) + '</div><div class="ar">→</div><div class="r">' + esc(p.rows[k][1].trim()) + '</div>';
      }
      c.innerHTML = html;
      var introEl = document.querySelector('[data-pairs-intro="' + c.getAttribute('data-pairs') + '"]');
      if (introEl) introEl.textContent = p.intro;
    }
  }
  /* data-sum="agenda.minutes" [data-where="mode=動手"]：加總（跟 Python 端 sum_fill 一模一樣，缺值當 0） */
  function sumAll() {
    var els = document.querySelectorAll('[data-sum]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var spec = el.getAttribute('data-sum').split('.');
      var field = spec.pop();
      var items = get(F, spec.join('.'));
      if (!Array.isArray(items)) continue;
      var where = el.getAttribute('data-where'), wk = null, wv = null;
      if (where) { var j = where.indexOf('='); wk = where.slice(0, j); wv = where.slice(j + 1); }
      var total = 0;
      for (var k = 0; k < items.length; k++) {
        if (wk && String(items[k][wk]) !== wv) continue;
        total += Number(items[k][field]) || 0;
      }
      el.textContent = String(total);
    }
  }
  fillAll();
  listAll();
  pairsAll();
  sumAll();
  document.documentElement.setAttribute('data-rendered', 'flow');
})();
