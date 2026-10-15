#!/usr/bin/env node
/**
 * 工作坊來源回歸：node tests/workshop-regressions.mjs
 * 只用 Node 內建模組，唯讀本 repo；不連網、不開瀏覽器、不寫檔。
 * 元素替身僅驗算原始函式／回呼，通過不代表瀏覽器或視覺驗收通過。
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = name => fs.readFileSync(path.join(ROOT, name), 'utf8');
const source = {
  studio: read('studio.html'), learn: read('learn.html'),
  player: read('slides/index.html'), slide05: read('slides/05.html'),
  builder: read('slides/_build/make_slides.py')
};
const checks = [];
function test(group, name, fn) {
  try { fn(); checks.push({group, name, status: 'PASS_SOURCE_CHECK'}); }
  catch (error) { checks.push({group, name, status: 'FAIL_SOURCE_CHECK', error: error.message}); }
}
function slice(text, start, end) {
  const a = text.indexOf(start), b = text.indexOf(end, a + start.length);
  assert.ok(a >= 0 && b > a, `找不到來源邊界：${start} → ${end}`);
  return text.slice(a, b);
}
function evidenceHarness() {
  const elements = new Map(), events = {}, downloads = [], messages = [];
  const element = id => {
    if (!elements.has(id)) elements.set(id, {
      value: '', hidden: false, textContent: '', innerHTML: '', focus() {},
      addEventListener(type, callback) { events[`${id}:${type}`] = callback; }
    });
    return elements.get(id);
  };
  const context = {
    $: element, save() {}, hideMsg() {},
    showMsg(id, text) { messages.push({id, text}); },
    clearCardFlags() {}, flagCard() {}, confirm() { return true; },
    stampLong() { return 'synthetic regression'; }, stampFile() { return 'test'; },
    AI_RULE: '合成測試', download(name, text) { downloads.push({name, text}); },
    FLOW: null, DS: {}, HAS_DATA: false,
    state: {evidence: {dataset: 'paste', per: {}}},
    current: {key: 'paste', records: [], analysis: null, label: '合成測試', skipped: 0},
    pasteRows: null, renderChart() {}, renderGapTable() {}, renderReflTable() {},
    renderSamples() {}, renderConclusions() {}, renderAnswer() {}
  };
  vm.createContext(context);
  for (const [start, end] of [
    ['function parseCSV(text){', 'function fillDatasetSelect(){'],
    ['function per(){', 'function drawSample(){'],
    ['function loadDataset(key){', 'function renderChart(){'],
    ["$('btnExportSampling').addEventListener('click', function(){", '/* 講師模式：']
  ]) vm.runInContext(slice(source.studio, start, end), context);
  return {context, element, events, downloads, messages};
}
const columns = ['student_id', 'self_score', 'peer_score', 'teacher_score',
  'reflection_text', 'teacher_weakest_criterion', 'task'];
const base = ['S01', '12', '11', '10', 'same reflection', 'criterion-A', 'task-A'];
const csv = row => `${columns.join(',')}\n${row.join(',')}`;
function prepared() {
  const t = evidenceHarness();
  t.element('pasteCsv').value = csv(base);
  t.events['btnLoadPaste:click']();
  Object.assign(t.context.per(), {
    ids: ['S01'], judge: {S01: {agree: 'yes', why: 'reason for criterion-A'}},
    conclusions: ['evidence', 'change', 'collect']
  });
  return t;
}

// N01：每個正規化輸入欄位改變，都必須清掉與舊資料綁定的判斷。
for (let i = 0; i < columns.length; i++) {
  test('new_functional', `N01/change/${columns[i]}`, () => {
    const t = prepared(), changed = base.slice();
    changed[i] = i === 0 ? 'S02' : i < 4 ? String(+changed[i] + 1) : `${changed[i]}-changed`;
    let confirmations = 0;
    t.context.confirm = () => { confirmations++; return true; };
    t.element('pasteCsv').value = csv(changed);
    t.events['btnLoadPaste:click']();
    t.events['btnExportSampling:click']();
    const p = t.context.per();
    assert.equal(confirmations, 1);
    assert.equal(p.ids.length, 0);
    assert.equal(Object.keys(p.judge).length, 0);
    assert.ok(p.conclusions.every(value => value === ''));
    assert.equal(t.downloads.length, 0);
  });
}
test('new_functional', 'N01/identical-reload-keeps-work', () => {
  const t = prepared(); let confirmations = 0;
  t.context.confirm = () => { confirmations++; return true; };
  t.events['btnLoadPaste:click']();
  t.events['btnExportSampling:click']();
  assert.equal(confirmations, 0);
  assert.equal(t.context.per().ids.length, 1);
  assert.equal(t.downloads.length, 1);
  assert.ok(t.downloads[0].text.includes('reason for criterion-A'));
});
test('new_functional', 'N01/cancel-keeps-old-data-and-work', () => {
  const t = prepared(), changed = base.slice(); let confirmations = 0;
  changed[5] = 'criterion-B';
  t.context.confirm = () => { confirmations++; return false; };
  t.element('pasteCsv').value = csv(changed);
  t.events['btnLoadPaste:click']();
  assert.equal(confirmations, 1);
  assert.equal(t.context.current.records[0].weakest, 'criterion-A');
  assert.equal(t.context.per().judge.S01.why, 'reason for criterion-A');
});

function playerHarness() {
  let listener, helpOpen = false, nextCount = 0, closeCount = 0;
  const context = {
    document: {addEventListener(type, callback) { listener = callback; }},
    help: {classList: {contains() { return helpOpen; }}},
    next() { nextCount++; }, prev() {}, show() {}, toggleFs() {}, TOTAL: 16,
    toggleHelp(on) {
      helpOpen = on === undefined ? !helpOpen : on;
      if (on === false) closeCount++;
    }
  };
  vm.createContext(context);
  vm.runInContext(slice(source.player, "document.addEventListener('keydown', function(e){",
    "document.getElementById('hit').addEventListener('click'"), context);
  return {
    setHelp(open) { helpOpen = open; },
    state() { return {helpOpen, nextCount, closeCount}; },
    key(key, interactive) {
      let prevented = false;
      listener({key, target: {closest() { return interactive ? {} : null; }},
        preventDefault() { prevented = true; }});
      return {prevented, helpOpen, nextCount, closeCount};
    }
  };
}
for (const target of ['button', 'a', 'input', 'textarea', 'select', 'contenteditable', 'body']) {
  test('new_functional', `N02/Escape/${target}`, () => {
    const t = playerHarness(); t.setHelp(true);
    const result = t.key('Escape', target !== 'body');
    assert.equal(result.helpOpen, false);
    assert.equal(result.closeCount, 1);
    assert.equal(result.prevented, true);
  });
}
for (const key of ['Enter', ' ']) {
  test('new_functional', `N02/native-button/${key === ' ' ? 'Space' : key}`, () => {
    const result = playerHarness().key(key, true);
    assert.equal(result.nextCount, 0);
    assert.equal(result.prevented, false);
  });
}
test('new_functional', 'N02/body-arrow-still-turns-page', () => {
  const result = playerHarness().key('ArrowRight', false);
  assert.equal(result.nextCount, 1);
  assert.equal(result.prevented, true);
});
test('new_functional', 'N02/open-help-blocks-page-flip', () => {
  const t = playerHarness(); t.setHelp(true);
  assert.equal(t.key('ArrowRight', false).nextCount, 0);
});

test('geometry_source', 'N03/card-stroke-inside-SVG-and-template-agrees', () => {
  const svg = source.slide05.match(/<svg\b([^>]*)>/);
  assert.ok(svg, '第5張沒有SVG');
  const attributes = text => Object.fromEntries([...text.matchAll(/([\w-]+)="([^"]*)"/g)]
    .map(match => [match[1], match[2]]));
  const attrs = attributes(svg[1]), height = +attrs.height;
  assert.equal(+attrs.viewBox.split(/\s+/)[3], height);
  const cards = [...source.slide05.matchAll(/<rect\b[^>]*>/g)]
    .map(match => attributes(match[0])).filter(attrs => attrs.width === '250');
  assert.equal(cards.length, 4);
  for (const card of cards) {
    const bottom = +card.y + +card.height + +(card['stroke-width'] || 0) / 2;
    assert.ok(height - bottom >= 4, `卡片含描邊下緣${bottom}，SVG高${height}，留白不足`);
  }
  const timeline = slice(source.builder, 'def fig_timeline():', 'def fig_rubric_diff():');
  const returned = timeline.match(/return svg\(1088, (\d+),/);
  assert.ok(returned, '找不到時間軸模板高度');
  assert.equal(+returned[1], height);
});

// 10/09原七項情境：修復後必須拒絕、保留基準或顯示正確狀態。
test('original_regression', 'F01/CSV-rejects-invalid-input', () => {
  const {context: c} = evidenceHarness();
  const header = 'student_id,self_score,peer_score,teacher_score,reflection_text';
  const parse = row => c.toRecords(c.parseCSV(`${header}\n${row}`));
  assert.equal(parse('S01,12,11,10,valid').records[0].self, 12);
  for (const row of ['S01,,11,10,valid', 'S01,   ,11,10,valid',
    'S01,Infinity,11,10,valid', 'S01,xxx,11,10,valid', 'S01,12,11,10,']) {
    const result = parse(row);
    assert.equal(result.records.length, 0);
    assert.equal(result.skipped, 1);
  }
  assert.throws(() => parse('S01,12,11,10,"valid'), /引號/);
});
test('original_regression', 'F02/new-reflection-does-not-use-old-reason', () => {
  const t = prepared(), changed = base.slice(); changed[4] = 'new reflection';
  t.element('pasteCsv').value = csv(changed);
  t.events['btnLoadPaste:click']();
  t.events['btnExportSampling:click']();
  assert.equal(t.context.per().ids.length, 0);
  assert.equal(Object.keys(t.context.per().judge).length, 0);
  assert.equal(t.downloads.length, 0);
});
test('original_regression', 'F03/talk-base-restored-with-fields', () => {
  const saved = {design: {base: 'talk', fields: {task: 'synthetic talk'}}};
  const c = {localStorage: {getItem() { return JSON.stringify(saved); }}};
  vm.createContext(c);
  vm.runInContext('var STORE_KEY="regression";\n' + slice(source.studio,
    'function freshState(){', '/* 貼上的資料那一份'), c);
  assert.equal(c.state.design.base, 'talk');
  assert.equal(c.state.design.fields.task, 'synthetic talk');
});
test('original_regression', 'F04/no-data-cannot-export-zero-over-zero', () => {
  const t = evidenceHarness(); t.context.per().conclusions = ['evidence', 'change', 'collect'];
  t.events['btnExportSampling:click']();
  assert.equal(t.downloads.length, 0);
  assert.ok(t.messages.some(message => message.text.includes('還沒有資料')));
});
test('original_regression', 'F05/clipboard-result-is-honest', () => {
  for (const result of [false, true, 'throw']) {
    const button = {textContent: '複製'};
    const c = {document: {
      body: {appendChild() {}, removeChild() {}},
      createElement() { return {style: {}, setAttribute() {}, select() {}}; },
      execCommand() { if (result === 'throw') throw new Error('blocked'); return result; }
    }, navigator: {}, setTimeout() {}};
    vm.createContext(c);
    vm.runInContext(slice(source.studio, 'function fallbackCopy(t){', '/* ── 分頁：'), c);
    c.copyText('synthetic test', button);
    assert.equal(button.textContent, result === true ? '已複製' : '複製失敗，請手動選取');
  }
});
test('original_regression', 'F06/focused-button-keys-are-not-global-next', () => {
  for (const key of ['Enter', ' ']) {
    const result = playerHarness().key(key, true);
    assert.equal(result.nextCount, 0);
    assert.equal(result.prevented, false);
  }
});
test('original_regression', 'F07/all-skipped-is-zero-of-four', () => {
  const elements = {where: {}, whereTitle: {}, fill: {style: {}}};
  const pills = [1, 2, 3, 4].map(n => ({dataset: {go: String(n)},
    classList: {toggle() {}}, setAttribute() {}, removeAttribute() {}, dot: {}}));
  const c = {state: {stage: 5, done: {}}, TITLES: {5: '收尾'}, ic() { return ''; },
    $$(selector) { return selector === '#progress .pill' ? pills : []; },
    $(selector, parent) { return selector === '.dot' ? parent.dot : elements[selector.slice(1)]; }};
  vm.createContext(c);
  vm.runInContext(slice(source.learn, 'var paintProgress = function(){', 'var paintFoot = function(n){'), c);
  c.paintProgress();
  assert.equal(elements.where.textContent, '已到收尾，做完 0／4 關');
  assert.equal(elements.fill.style.transform, 'scaleX(0)');
});

const failures = checks.filter(check => check.status === 'FAIL_SOURCE_CHECK');
console.log(JSON.stringify({
  method: 'Node原始函式／回呼＋元素替身，以及SVG來源幾何；不是瀏覽器／視覺驗收。',
  sourceRoot: ROOT,
  summary: {
    passed: checks.length - failures.length, failed: failures.length,
    newFunctional: checks.filter(check => check.group === 'new_functional').length,
    geometrySource: checks.filter(check => check.group === 'geometry_source').length,
    originalRegressions: checks.filter(check => check.group === 'original_regression').length
  }, checks
}, null, 2));
if (failures.length) process.exitCode = 1;
