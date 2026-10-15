"""Synthetic completion practice. Standard library only; no student systems."""
import argparse
import csv
import hashlib
import io
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

BASE = Path(__file__).resolve().parents[1]
NOTE = "合成示範、不是學生作答"
FIELDS = ['record_id','week_id','synthetic_note','pre_question','reflection_text','facet_text','ai_disclosure','message_to_speaker']
SCORE_FIELDS = ['pre_score','reflection_score','facets_score','ai_score','message_score']
AI_FIELDS = ['record_id'] + SCORE_FIELDS + ['practice_total100']
FACETS = ['AI 倫理與法律素養','權益尊重（智財／個資／隱私）','資安辨識與風險管理','資訊查核與 AI 內容判讀','社會影響與公平性','人類判斷與當責']

def read_csv(path, fields):
    raw = path.read_bytes()
    reader = csv.DictReader(io.StringIO(raw.decode('utf-8-sig'), newline=''), strict=True)
    if reader.fieldnames != fields:
        raise ValueError('CSV 欄名或順序不符：' + ','.join(fields))
    rows = list(reader)
    if any(None in r or any(v is None for v in r.values()) for r in rows):
        raise ValueError('CSV 每列欄數必須與標頭相同')
    return rows, raw

def load_inputs(path, rubric_path, count):
    rows, raw = read_csv(path, FIELDS)
    rubric_raw = rubric_path.read_bytes()
    rubric = json.loads(rubric_raw.decode('utf-8-sig'))
    if rubric != {'id':'synthetic-five-sections-v1','version':'1.0.0','synthetic_note':NOTE,'points_per_section':20,'total':100,'score_fields':SCORE_FIELDS,'facets':FACETS,'scope':'合成完成度演練；非正式成績，不做常態對齊'}:
        raise ValueError('rubric.json 不符合本版規準；請勿靜靜更換規則')
    if len(rows) != count:
        raise ValueError(f'必須有 {count} 筆，實際 {len(rows)} 筆')
    ids = [r['record_id'] for r in rows]
    if len(set(ids)) != count or any(not re.fullmatch(r'DEMO-W01-S(?:0[1-9]|1[0-5])', x) for x in ids):
        raise ValueError('代號重複或不是合法合成代號')
    if {r['week_id'] for r in rows} != {'DEMO-W01'}:
        raise ValueError('只接受同一週 DEMO-W01')
    for r in rows:
        if r['synthetic_note'] != NOTE:
            raise ValueError('每列都必須有合成宣告')
        choices = r['facet_text'].split('；') if r['facet_text'] else []
        if len(choices) != len(set(choices)) or any(x not in FACETS for x in choices):
            raise ValueError(r['record_id'] + ' 六面向不合法或重複')
        ai = r['ai_disclosure'].strip()
        if ai not in ('', '否') and not re.fullmatch(r'是[：:]\s*\S.*', ai):
            raise ValueError(r['record_id'] + ' AI 揭露須為否、是：用途，或留空')
    return rows, raw, rubric_raw

def calculate(rows):
    output = []
    for r in rows:
        flags = [bool(r['pre_question'].strip()), bool(r['reflection_text'].strip()), bool(r['facet_text']), bool(r['ai_disclosure'].strip()), bool(r['message_to_speaker'].strip())]
        scores = [20 * int(x) for x in flags]
        output.append(dict(record_id=r['record_id'], **dict(zip(SCORE_FIELDS, scores)), completed_sections=sum(flags), practice_total100=sum(scores)))
    return output

def compare(path, expected):
    rows, raw = read_csv(path, AI_FIELDS)
    byid = {}
    for r in rows:
        if r['record_id'] in byid:
            raise ValueError('AI 試評有重複代號')
        values = []
        for key in SCORE_FIELDS:
            if r[key] not in ('0', '20'):
                raise ValueError('AI 五區分數只接受 0 或 20，不接受公式或文字')
            values.append(int(r[key]))
        if not re.fullmatch(r'0|[1-9][0-9]?|100', r['practice_total100']):
            raise ValueError('AI 總分必須是 0–100 整數')
        if sum(values) != int(r['practice_total100']):
            raise ValueError('AI 總分不等於五區加總')
        byid[r['record_id']] = dict(zip(SCORE_FIELDS, values)) | {'practice_total100': int(r['practice_total100'])}
    if set(byid) != {r['record_id'] for r in expected}:
        raise ValueError('AI 代號集合與輸入不同：有缺列或多列')
    differences = []
    for r in expected:
        for key in SCORE_FIELDS + ['practice_total100']:
            if r[key] != byid[r['record_id']][key]:
                differences.append(dict(record_id=r['record_id'], field=key, program_value=r[key], ai_value=byid[r['record_id']][key]))
    return differences, raw

def csv_text(rows, fields):
    buf = io.StringIO(newline='')
    writer = csv.DictWriter(buf, fieldnames=fields, lineterminator='\n')
    writer.writeheader()
    writer.writerows(rows)
    return buf.getvalue()

def run(argv=None):
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--count', choices=[10,15], type=int, default=10)
    p.add_argument('--input', type=Path)
    p.add_argument('--out-dir', type=Path)
    p.add_argument('--compare', type=Path)
    args = p.parse_args(argv)
    input_path = (args.input or BASE / f'data/submissions-{args.count}.csv').resolve()
    rubric_path = (BASE / 'rubric.json').resolve()
    out_dir = (args.out_dir or BASE / f'output/run-{args.count}').resolve()
    # Resolve every input and validate everything before making any output directory.
    rows, raw, rubric_raw = load_inputs(input_path, rubric_path, args.count)
    scores = calculate(rows)
    differences, ai_raw = compare(args.compare.resolve(), scores) if args.compare else (None, None)
    targets = ['scores.csv','summary.md','run.json'] + (['differences.csv'] if args.compare else [])
    protected = {input_path, rubric_path}
    if args.compare:
        protected.add(args.compare.resolve())
    for name in targets:
        target = (out_dir / name).resolve()
        if target in protected:
            raise ValueError('輸出不可覆寫輸入、AI 試評或規準')
        if target.exists():
            raise ValueError('輸出已存在；請用新的 --out-dir 保留上一輪：' + str(target))
    totals = [r['practice_total100'] for r in scores]
    metadata = {'synthetic_note': NOTE, 'scope':'演練百分比；非正式成績、不含遲交與學期換算、不做80–99對齊', 'utc':datetime.now(timezone.utc).isoformat(), 'input':str(input_path), 'input_sha256':hashlib.sha256(raw).hexdigest(), 'rubric':str(rubric_path), 'rubric_sha256':hashlib.sha256(rubric_raw).hexdigest(), 'count':args.count, 'compared':bool(args.compare), 'ai_sha256':hashlib.sha256(ai_raw).hexdigest() if ai_raw else None, 'difference_cells':len(differences) if differences is not None else None}
    summary = f'# 合成完成度演練\n\n{NOTE}。非正式成績，不含準時／遲交、學期換算或常態對齊。\n\n- 週次：DEMO-W01\n- 份數：{len(scores)}\n- 演練平均：{sum(totals)/len(totals):.1f}／100\n- 完成五區：{sum(r["completed_sections"]==5 for r in scores)}份\n- 待教師決定：{len(scores)}份；程式未填final_score。\n'
    if differences is not None:
        summary += f'- AI與程式不同的儲存格：{len(differences)}（含總分，非相異作答份數）。\n'
    outputs = {'scores.csv':csv_text(scores, ['record_id'] + SCORE_FIELDS + ['completed_sections','practice_total100']), 'summary.md':summary, 'run.json':json.dumps(metadata,ensure_ascii=False,indent=2)+'\n'}
    if differences is not None:
        outputs['differences.csv'] = csv_text(differences,['record_id','field','program_value','ai_value'])
    out_dir.mkdir(parents=True, exist_ok=True)
    for name, text in outputs.items():
        (out_dir/name).write_text(text,encoding='utf-8')
    print(f'PASS: {len(scores)} synthetic records; outputs: {out_dir}')

if __name__ == '__main__':
    try:
        run()
    except (ValueError, OSError, UnicodeError, json.JSONDecodeError, csv.Error) as exc:
        print('ERROR: ' + str(exc), file=sys.stderr)
        sys.exit(1)
