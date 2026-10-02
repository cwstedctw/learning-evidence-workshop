// 把 workflow-data.js 在 node vm 裡跑一次，印出 WORKSHOP_FLOW 的 JSON（函式會被 JSON 丟掉，只留資料）。
// 用法：node dump_flow.js ../../workflow-data.js
const vm = require('vm');
const fs = require('fs');
const src = fs.readFileSync(process.argv[2], 'utf8');
const w = {};
vm.runInNewContext(src, { window: w });
process.stdout.write(JSON.stringify(w.WORKSHOP_FLOW));
