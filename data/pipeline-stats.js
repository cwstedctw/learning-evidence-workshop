// 由講師本機的批改資料彙總而成，只有計數與比例；沒有任何學號、姓名或個別分數。產生：2026-10-10
window.PIPELINE_STATS = {
 "semester": "115-1",
 "as_of": "2026-10-10",
 "generated_by": "講師本機的彙總程式（只輸出計數、比例與評分表文字）",
 "courses": [
  "人工智慧概論",
  "資訊科技與應用",
  "和AI一起寫程式",
  "AI未來應用與趨勢探索",
  "創客入門",
  "AIoT智慧裝置實作"
 ],
 "mode_label": {
  "three_aligned": "三位評分者各打一份 → 平均 → 對齊到 80–100",
  "three_raw": "三位評分者各打一份 → 平均（原始分，不對齊）",
  "program": "程式判定（開連結、檢查電路）",
  "completion": "完成度（準時／遲交／沒交）"
 },
 "totals": {
  "individual_no_summary": 0,
  "individual_roster_from_grades": 2,
  "individual_assignments": 23,
  "individual_roster_sum": 752,
  "individual_submitted_sum": 509,
  "individual_late_sum": 44,
  "group_assignments": 4,
  "courses": 6,
  "gradebooks": 8,
  "assignments": 27,
  "assignments_graded": 26,
  "assignments_pushed": 26,
  "modes": {
   "three_aligned": 20,
   "program": 3,
   "completion": 1,
   "three_raw": 2,
   "other": 1
  },
  "roster_sum": 891,
  "submitted_sum": 573,
  "missing_sum": 304,
  "late_sum": 45,
  "three_judge_assignments": 23,
  "judged_sum": 464,
  "gap_ge15_sum": 52,
  "overrides_sum": 2,
  "gap_bins": {
   "0–4": 303,
   "5–9": 50,
   "10–14": 59,
   "15–24": 24,
   "25+": 28
  },
  "no_submissions_yet": 7,
  "rubric_types": 17
 },
 "assignments": [
  {
   "course": "人工智慧概論",
   "course_key": "ai_intro",
   "title": "E1判斷卡與圖",
   "week": 2,
   "cls": "AA",
   "due": "2026-09-14",
   "mode": "three_aligned",
   "group": true,
   "roster": 43,
   "submitted": 37,
   "missing": 6,
   "late": 0,
   "links": 0,
   "roster_from_grades": false,
   "graded": true,
   "pushed": true,
   "n_dims": 6,
   "dims": [
    "圖像產出與版本",
    "決定與理由",
    "一個看得見的細節與位置",
    "為什麼影響需求或讀者",
    "下一步與再確認",
    "來源／工具／模擬素材與自己的修改"
   ],
   "overrides": 0,
   "judges": [
    "liwu",
    "wailan",
    "xiuguluan"
   ],
   "judged": 37,
   "mean_pair_diff": 6.6,
   "median_gap": 8.0,
   "gap_ge15": 2,
   "gap_bins": {
    "0–4": 5,
    "5–9": 16,
    "10–14": 14,
    "15–24": 2,
    "25+": 0
   },
   "dim_gap": {
    "decision": 4.2,
    "detail": 1.3,
    "image": 0.4,
    "next": 1.1,
    "source": 1.0,
    "why": 2.1
   },
   "rubric_id": "e1_image_card",
   "rubric_version": "1.0.0",
   "grading_text": "三方評分（e1_image_card）→ 對齊 80–100；同組同分（分組來源：定版分組表／HackMD）"
  },
  {
   "course": "人工智慧概論",
   "course_key": "ai_intro",
   "title": "E1判斷卡與圖",
   "week": 2,
   "cls": "AB",
   "due": "2026-09-15",
   "mode": "three_aligned",
   "group": true,
   "roster": 22,
   "submitted": 5,
   "missing": 17,
   "late": 0,
   "links": 0,
   "roster_from_grades": false,
   "graded": true,
   "pushed": true,
   "n_dims": 6,
   "dims": [
    "圖像產出與版本",
    "決定與理由",
    "一個看得見的細節與位置",
    "為什麼影響需求或讀者",
    "下一步與再確認",
    "來源／工具／模擬素材與自己的修改"
   ],
   "overrides": 0,
   "judges": [
    "liwu",
    "wailan",
    "xiuguluan"
   ],
   "judged": 5,
   "mean_pair_diff": 6.5,
   "median_gap": 5.0,
   "gap_ge15": 1,
   "gap_bins": {
    "0–4": 2,
    "5–9": 1,
    "10–14": 1,
    "15–24": 1,
    "25+": 0
   },
   "dim_gap": {
    "decision": 0.4,
    "detail": 1.2,
    "image": 4.0,
    "next": 2.7,
    "source": 0.4,
    "why": 2.7
   },
   "rubric_id": "e1_image_card",
   "rubric_version": "1.0.0",
   "grading_text": "三方評分（e1_image_card）→ 對齊 80–100；同組同分（分組來源：定版分組表／HackMD）"
  },
  {
   "course": "人工智慧概論",
   "course_key": "ai_intro",
   "title": "裝好四樣",
   "week": 2,
   "cls": "AA",
   "due": "2026-09-21",
   "mode": "three_aligned",
   "group": false,
   "roster": 43,
   "submitted": 30,
   "missing": 13,
   "late": 7,
   "links": 1,
   "roster_from_grades": false,
   "graded": true,
   "pushed": true,
   "n_dims": 5,
   "dims": [
    "GitHub 帳號名（線上文字填了、或截圖看得到）",
    "GitHub 個人頁截圖",
    "Student Pack 送出後的畫面",
    "ChatGPT 桌面版切到 Codex 的畫面",
    "Antigravity 登入後的畫面"
   ],
   "overrides": 0,
   "judges": [
    "liwu",
    "wailan",
    "xiuguluan"
   ],
   "judged": 30,
   "mean_pair_diff": 1.6,
   "median_gap": 0.0,
   "gap_ge15": 1,
   "gap_bins": {
    "0–4": 24,
    "5–9": 0,
    "10–14": 5,
    "15–24": 1,
    "25+": 0
   },
   "dim_gap": {
    "antigravity": 0.2,
    "chatgpt": 0.7,
    "github": 1.3,
    "pack": 0.0,
    "username": 0.0
   },
   "rubric_id": "setup_four",
   "rubric_version": "1.1.0",
   "grading_text": "三方評分（ 1.1.0：五樣各 20、辦不成寫原因也給、帳號名截圖看得到就算）→ 對齊 80–100"
  },
  {
   "course": "人工智慧概論",
   "course_key": "ai_intro",
   "title": "裝好四樣",
   "week": 2,
   "cls": "AB",
   "due": "2026-09-22",
   "mode": "three_aligned",
   "group": false,
   "roster": 22,
   "submitted": 15,
   "missing": 7,
   "late": 2,
   "links": 0,
   "roster_from_grades": false,
   "graded": true,
   "pushed": true,
   "n_dims": 5,
   "dims": [
    "GitHub 帳號名（線上文字填了、或截圖看得到）",
    "GitHub 個人頁截圖",
    "Student Pack 送出後的畫面",
    "ChatGPT 桌面版切到 Codex 的畫面",
    "Antigravity 登入後的畫面"
   ],
   "overrides": 0,
   "judges": [
    "liwu",
    "wailan",
    "xiuguluan"
   ],
   "judged": 15,
   "mean_pair_diff": 1.3,
   "median_gap": 0.0,
   "gap_ge15": 0,
   "gap_bins": {
    "0–4": 12,
    "5–9": 0,
    "10–14": 3,
    "15–24": 0,
    "25+": 0
   },
   "dim_gap": {
    "antigravity": 0.4,
    "chatgpt": 0.9,
    "github": 0.4,
    "pack": 0.0,
    "username": 0.4
   },
   "rubric_id": "setup_four",
   "rubric_version": "1.1.0",
   "grading_text": "三方評分（ 1.1.0：五樣各 20、辦不成寫原因也給、帳號名截圖看得到就算）→ 對齊 80–100"
  },
  {
   "course": "人工智慧概論",
   "course_key": "ai_intro",
   "title": "commit三次push一次",
   "week": 3,
   "cls": "AA",
   "due": "2026-10-05",
   "mode": "three_aligned",
   "group": false,
   "roster": 43,
   "submitted": 27,
   "missing": 16,
   "late": 2,
   "links": 24,
   "roster_from_grades": false,
   "graded": true,
   "pushed": true,
   "n_dims": 5,
   "dims": [
    "repo 網址與歸屬",
    "三筆 commit 看得到",
    "線上文字列出三筆 commit 訊息",
    "貼給 Antigravity 的原文",
    "它做的跟它說的哪裡不一樣／我退回它那次"
   ],
   "overrides": 0,
   "judges": [
    "liwu",
    "wailan",
    "xiuguluan"
   ],
   "judged": 27,
   "mean_pair_diff": 3.0,
   "median_gap": 2.0,
   "gap_ge15": 2,
   "gap_bins": {
    "0–4": 19,
    "5–9": 6,
    "10–14": 0,
    "15–24": 1,
    "25+": 1
   },
   "dim_gap": {
    "commits": 1.0,
    "messages": 0.2,
    "prompts": 1.3,
    "reflect": 0.3,
    "repo": 0.3
   },
   "rubric_id": "three_commits",
   "rubric_version": "1.0.0",
   "grading_text": "三方評分（）→ 對齊 80–100"
  },
  {
   "course": "人工智慧概論",
   "course_key": "ai_intro",
   "title": "commit三次push一次",
   "week": 3,
   "cls": "AB",
   "due": "2026-09-29",
   "mode": "three_aligned",
   "group": false,
   "roster": 22,
   "submitted": 2,
   "missing": 20,
   "late": 0,
   "links": 2,
   "roster_from_grades": false,
   "graded": true,
   "pushed": false,
   "n_dims": 5,
   "dims": [
    "repo 網址與歸屬",
    "三筆 commit 看得到",
    "線上文字列出三筆 commit 訊息",
    "貼給 Antigravity 的原文",
    "它做的跟它說的哪裡不一樣／我退回它那次"
   ],
   "overrides": 0,
   "judges": [
    "liwu",
    "wailan",
    "xiuguluan"
   ],
   "judged": 2,
   "mean_pair_diff": 2.7,
   "median_gap": 4.0,
   "gap_ge15": 0,
   "gap_bins": {
    "0–4": 1,
    "5–9": 1,
    "10–14": 0,
    "15–24": 0,
    "25+": 0
   },
   "dim_gap": {
    "commits": 0.0,
    "messages": 0.0,
    "prompts": 2.7,
    "reflect": 0.0,
    "repo": 0.0
   },
   "rubric_id": "three_commits",
   "rubric_version": "1.0.0",
   "grading_text": "三方評分（）→ 對齊 80–100"
  },
  {
   "course": "資訊科技與應用",
   "course_key": "info_tech",
   "title": "AI生圖與小組討論",
   "week": 2,
   "cls": "AA",
   "due": "2026-09-14",
   "mode": "three_aligned",
   "group": true,
   "roster": 40,
   "submitted": 8,
   "missing": 32,
   "late": 0,
   "links": 0,
   "roster_from_grades": false,
   "graded": true,
   "pushed": true,
   "n_dims": 5,
   "dims": [
    "自己產生的圖",
    "提示原文（整段照貼）",
    "改了什麼、為什麼（提示→結果的對應）",
    "組別與組裡討論結果",
    "反思：下次要改哪一句"
   ],
   "overrides": 0,
   "judges": [
    "liwu",
    "wailan",
    "xiuguluan"
   ],
   "judged": 8,
   "mean_pair_diff": 3.4,
   "median_gap": 3.0,
   "gap_ge15": 1,
   "gap_bins": {
    "0–4": 4,
    "5–9": 2,
    "10–14": 1,
    "15–24": 1,
    "25+": 0
   },
   "dim_gap": {
    "group": 0.0,
    "image": 0.0,
    "iteration": 1.0,
    "prompt": 1.8,
    "reflection": 1.7
   },
   "rubric_id": "ai_image_prompt_group",
   "rubric_version": "1.0.0",
   "grading_text": "三方評分（）→ 對齊 80–100；同組同分（分組來源：定版分組表／HackMD）"
  },
  {
   "course": "資訊科技與應用",
   "course_key": "info_tech",
   "title": "新聞判斷討論",
   "week": 2,
   "cls": "AB",
   "due": "2026-09-15",
   "mode": "three_aligned",
   "group": true,
   "roster": 34,
   "submitted": 14,
   "missing": 20,
   "late": 1,
   "links": 8,
   "roster_from_grades": false,
   "graded": true,
   "pushed": true,
   "n_dims": 5,
   "dims": [
    "找到新聞並追到源頭",
    "被放大的那一句",
    "反面／較保留的說法",
    "我的判斷與理由",
    "呈現、來源標註、AI 與自己的答案分開"
   ],
   "overrides": 0,
   "judges": [
    "liwu",
    "wailan",
    "xiuguluan"
   ],
   "judged": 14,
   "mean_pair_diff": 7.3,
   "median_gap": 9.0,
   "gap_ge15": 4,
   "gap_bins": {
    "0–4": 2,
    "5–9": 5,
    "10–14": 3,
    "15–24": 4,
    "25+": 0
   },
   "dim_gap": {
    "amplified": 0.7,
    "counter": 2.7,
    "judgment": 3.2,
    "presentation": 1.0,
    "source": 1.3
   },
   "rubric_id": "news_check",
   "rubric_version": "1.0.0",
   "grading_text": "三方評分（）→ 對齊 80–100；同組同分"
  },
  {
   "course": "資訊科技與應用",
   "course_key": "info_tech",
   "title": "裝好四樣",
   "week": 2,
   "cls": "AA",
   "due": "2026-09-21",
   "mode": "three_aligned",
   "group": false,
   "roster": 40,
   "submitted": 25,
   "missing": 15,
   "late": 4,
   "links": 1,
   "roster_from_grades": false,
   "graded": true,
   "pushed": true,
   "n_dims": 5,
   "dims": [
    "GitHub 帳號名（線上文字填了、或截圖看得到）",
    "GitHub 個人頁截圖",
    "Student Pack 送出後的畫面",
    "ChatGPT 桌面版切到 Codex 的畫面",
    "Antigravity 登入後的畫面"
   ],
   "overrides": 0,
   "judges": [
    "liwu",
    "wailan",
    "xiuguluan"
   ],
   "judged": 25,
   "mean_pair_diff": 4.5,
   "median_gap": 0.0,
   "gap_ge15": 4,
   "gap_bins": {
    "0–4": 17,
    "5–9": 0,
    "10–14": 4,
    "15–24": 1,
    "25+": 3
   },
   "dim_gap": {
    "antigravity": 2.1,
    "chatgpt": 2.1,
    "github": 0.8,
    "pack": 0.0,
    "username": 0.3
   },
   "rubric_id": "setup_four",
   "rubric_version": "1.1.0",
   "grading_text": "三方評分（ 1.1.0：五樣各 20、辦不成寫原因也給、帳號名截圖看得到就算）→ 對齊 80–100"
  },
  {
   "course": "資訊科技與應用",
   "course_key": "info_tech",
   "title": "裝好四樣",
   "week": 2,
   "cls": "AB",
   "due": "2026-09-22",
   "mode": "three_aligned",
   "group": false,
   "roster": 34,
   "submitted": 23,
   "missing": 11,
   "late": 2,
   "links": 1,
   "roster_from_grades": false,
   "graded": true,
   "pushed": true,
   "n_dims": 5,
   "dims": [
    "GitHub 帳號名（線上文字填了、或截圖看得到）",
    "GitHub 個人頁截圖",
    "Student Pack 送出後的畫面",
    "ChatGPT 桌面版切到 Codex 的畫面",
    "Antigravity 登入後的畫面"
   ],
   "overrides": 0,
   "judges": [
    "liwu",
    "wailan",
    "xiuguluan"
   ],
   "judged": 23,
   "mean_pair_diff": 2.6,
   "median_gap": 0.0,
   "gap_ge15": 2,
   "gap_bins": {
    "0–4": 16,
    "5–9": 0,
    "10–14": 5,
    "15–24": 2,
    "25+": 0
   },
   "dim_gap": {
    "antigravity": 0.6,
    "chatgpt": 1.7,
    "github": 0.3,
    "pack": 0.0,
    "username": 0.0
   },
   "rubric_id": "setup_four",
   "rubric_version": "1.1.0",
   "grading_text": "三方評分（ 1.1.0：五樣各 20、辦不成寫原因也給、帳號名截圖看得到就算）→ 對齊 80–100"
  },
  {
   "course": "資訊科技與應用",
   "course_key": "info_tech",
   "title": "commit三次push一次",
   "week": 3,
   "cls": "AA",
   "due": "2026-10-05",
   "mode": "three_aligned",
   "group": false,
   "roster": 40,
   "submitted": 12,
   "missing": 28,
   "late": 0,
   "links": 21,
   "roster_from_grades": false,
   "graded": true,
   "pushed": true,
   "n_dims": 5,
   "dims": [
    "repo 網址與歸屬",
    "三筆 commit 看得到",
    "線上文字列出三筆 commit 訊息",
    "貼給 Antigravity 的原文",
    "它做的跟它說的哪裡不一樣／我退回它那次"
   ],
   "overrides": 0,
   "judges": [
    "liwu",
    "wailan",
    "xiuguluan"
   ],
   "judged": 12,
   "mean_pair_diff": 7.2,
   "median_gap": 7.5,
   "gap_ge15": 2,
   "gap_bins": {
    "0–4": 4,
    "5–9": 3,
    "10–14": 3,
    "15–24": 1,
    "25+": 1
   },
   "dim_gap": {
    "commits": 2.2,
    "messages": 2.2,
    "prompts": 1.8,
    "reflect": 0.6,
    "repo": 1.2
   },
   "rubric_id": "three_commits",
   "rubric_version": "1.0.0",
   "grading_text": "三方評分（）→ 對齊 80–100"
  },
  {
   "course": "和AI一起寫程式",
   "course_key": "ai_coding",
   "title": "裝好四樣",
   "week": 2,
   "cls": "",
   "due": "2026-09-21",
   "mode": "three_aligned",
   "group": false,
   "roster": 39,
   "submitted": 29,
   "missing": 10,
   "late": 1,
   "links": 1,
   "roster_from_grades": false,
   "graded": true,
   "pushed": true,
   "n_dims": 5,
   "dims": [
    "GitHub 帳號名（線上文字填了、或截圖看得到）",
    "GitHub 個人頁截圖",
    "Student Pack 送出後的畫面",
    "ChatGPT 桌面版切到 Codex 的畫面",
    "Antigravity 登入後的畫面"
   ],
   "overrides": 0,
   "judges": [
    "liwu",
    "wailan",
    "xiuguluan"
   ],
   "judged": 29,
   "mean_pair_diff": 3.9,
   "median_gap": 0.0,
   "gap_ge15": 4,
   "gap_bins": {
    "0–4": 20,
    "5–9": 0,
    "10–14": 5,
    "15–24": 2,
    "25+": 2
   },
   "dim_gap": {
    "antigravity": 0.7,
    "chatgpt": 0.9,
    "github": 1.6,
    "pack": 0.2,
    "username": 0.9
   },
   "rubric_id": "setup_four",
   "rubric_version": "1.1.0",
   "grading_text": "三方評分（ 1.1.0：五樣各 20、辦不成寫原因也給、帳號名截圖看得到就算）→ 對齊 80–100"
  },
  {
   "course": "和AI一起寫程式",
   "course_key": "ai_coding",
   "title": "我的第一個網址",
   "week": 3,
   "cls": "",
   "due": "2026-09-21",
   "mode": "program",
   "group": false,
   "roster": 39,
   "submitted": 19,
   "missing": 20,
   "late": 0,
   "links": 28,
   "roster_from_grades": false,
   "graded": true,
   "pushed": true,
   "n_dims": 1,
   "dims": [
    "活著的網址"
   ],
   "overrides": 0,
   "judges": [],
   "judged": null,
   "mean_pair_diff": null,
   "median_gap": null,
   "gap_ge15": null,
   "gap_bins": null,
   "dim_gap": {},
   "rubric_id": "links_required",
   "rubric_version": "1.1.0",
   "grading_text": "真的開連結：活著 ≥1 條＝100、全死 50、沒網址 0（ 1.1.0，老師 9/25「（英文原話略）」）"
  },
  {
   "course": "AI未來應用與趨勢探索",
   "course_key": "ai_future",
   "title": "課前／課後學習單（第 1 場）",
   "week": 2,
   "cls": "",
   "due": "2026-09-18",
   "mode": "completion",
   "group": false,
   "roster": 69,
   "submitted": 63,
   "missing": 6,
   "late": 11,
   "links": 0,
   "roster_from_grades": false,
   "graded": false,
   "pushed": true,
   "n_dims": null,
   "dims": [],
   "overrides": null,
   "judges": [],
   "judged": null,
   "mean_pair_diff": null,
   "median_gap": null,
   "gap_ge15": null,
   "gap_bins": null,
   "dim_gap": {},
   "rubric_id": "completion",
   "rubric_version": "1.0.0",
   "grading_text": "準時 100／遲交 80／沒交 0（9/18 已推）；五欄品質評分表待老師確認"
  },
  {
   "course": "創客入門",
   "course_key": "maker",
   "title": "Wokwi LED亮與滅",
   "week": 2,
   "cls": "",
   "due": "2026-09-15",
   "mode": "program",
   "group": false,
   "roster": 23,
   "submitted": 23,
   "missing": 0,
   "late": 0,
   "links": 45,
   "roster_from_grades": false,
   "graded": true,
   "pushed": true,
   "n_dims": 5,
   "dims": [
    "交了自己的 Wokwi 專案連結",
    "零件：板子＋LED＋電阻",
    "接線：LED 一端到 GPIO、另一端經電阻到 GND",
    "程式會閃（設腳位＋切換＋延時＋迴圈）",
    "多做：第二個專案（按鈕／多燈）或自己的變化"
   ],
   "overrides": 0,
   "judges": [],
   "judged": null,
   "mean_pair_diff": null,
   "median_gap": null,
   "gap_ge15": null,
   "gap_bins": null,
   "dim_gap": {},
   "rubric_id": "wokwi_led_blink",
   "rubric_version": "1.0.0",
   "grading_text": "程式判定（）用 原始分"
  },
  {
   "course": "創客入門",
   "course_key": "maker",
   "title": "裝好四樣",
   "week": 2,
   "cls": "",
   "due": "2026-09-22",
   "mode": "three_aligned",
   "group": false,
   "roster": 23,
   "submitted": 20,
   "missing": 3,
   "late": 2,
   "links": 1,
   "roster_from_grades": false,
   "graded": true,
   "pushed": true,
   "n_dims": 5,
   "dims": [
    "GitHub 帳號名（線上文字填了、或截圖看得到）",
    "GitHub 個人頁截圖",
    "Student Pack 送出後的畫面",
    "ChatGPT 桌面版切到 Codex 的畫面",
    "Antigravity 登入後的畫面"
   ],
   "overrides": 0,
   "judges": [
    "liwu",
    "wailan",
    "xiuguluan"
   ],
   "judged": 20,
   "mean_pair_diff": 5.3,
   "median_gap": 0.0,
   "gap_ge15": 4,
   "gap_bins": {
    "0–4": 11,
    "5–9": 0,
    "10–14": 5,
    "15–24": 3,
    "25+": 1
   },
   "dim_gap": {
    "antigravity": 0.3,
    "chatgpt": 2.0,
    "github": 2.3,
    "pack": 0.3,
    "username": 1.0
   },
   "rubric_id": "setup_four",
   "rubric_version": "1.1.0",
   "grading_text": "三方評分（ 1.1.0：五樣各 20、辦不成寫原因也給、帳號名截圖看得到就算）→ 對齊 80–100"
  },
  {
   "course": "創客入門",
   "course_key": "maker",
   "title": "Wokwi 閃爍節奏",
   "week": 3,
   "cls": "",
   "due": "2026-09-22",
   "mode": "program",
   "group": false,
   "roster": 23,
   "submitted": 4,
   "missing": 19,
   "late": 0,
   "links": 4,
   "roster_from_grades": false,
   "graded": true,
   "pushed": true,
   "n_dims": 5,
   "dims": [
    "交了自己的 Wokwi 專案連結",
    "零件：板子＋LED＋電阻",
    "接線：LED 到 GPIO、另一端經電阻到 GND",
    "程式會閃（設腳位＋切換＋延時＋迴圈）",
    "節奏：有自己的變化（兩種等待時間、for 數幾次、if 快慢、print 亮滅）"
   ],
   "overrides": 0,
   "judges": [],
   "judged": null,
   "mean_pair_diff": null,
   "median_gap": null,
   "gap_ge15": null,
   "gap_bins": null,
   "dim_gap": {},
   "rubric_id": "wokwi_rhythm",
   "rubric_version": "1.0.0",
   "grading_text": "程式判定（＋節奏維）用 原始分"
  },
  {
   "course": "AIoT智慧裝置實作",
   "course_key": "aiot",
   "title": "裝好四樣",
   "week": 2,
   "cls": "",
   "due": "2026-09-24",
   "mode": "three_aligned",
   "group": false,
   "roster": 26,
   "submitted": 21,
   "missing": 5,
   "late": 1,
   "links": 0,
   "roster_from_grades": false,
   "graded": true,
   "pushed": true,
   "n_dims": 5,
   "dims": [
    "GitHub 帳號名（線上文字填了、或截圖看得到）",
    "GitHub 個人頁截圖",
    "Student Pack 送出後的畫面",
    "ChatGPT 桌面版切到 Codex 的畫面",
    "Antigravity 登入後的畫面"
   ],
   "overrides": 0,
   "judges": [
    "liwu",
    "wailan",
    "xiuguluan"
   ],
   "judged": 21,
   "mean_pair_diff": 1.0,
   "median_gap": 0.0,
   "gap_ge15": 0,
   "gap_bins": {
    "0–4": 18,
    "5–9": 0,
    "10–14": 3,
    "15–24": 0,
    "25+": 0
   },
   "dim_gap": {
    "antigravity": 0.0,
    "chatgpt": 1.0,
    "github": 0.0,
    "pack": 0.0,
    "username": 0.0
   },
   "rubric_id": "setup_four",
   "rubric_version": "1.1.0",
   "grading_text": "三方評分（ 1.1.0：五樣各 20、辦不成寫原因也給、帳號名截圖看得到就算）→ 對齊 80–100"
  },
  {
   "course": "AIoT智慧裝置實作",
   "course_key": "aiot",
   "title": "板子動起來了 照片",
   "week": 2,
   "cls": "",
   "due": "2026-09-17",
   "mode": "three_aligned",
   "group": false,
   "roster": 26,
   "submitted": 26,
   "missing": 0,
   "late": 2,
   "links": 0,
   "roster_from_grades": false,
   "graded": true,
   "pushed": true,
   "n_dims": 1,
   "dims": [
    "照片看得出自己的板子在動"
   ],
   "overrides": 0,
   "judges": [
    "liwu",
    "wailan",
    "xiuguluan"
   ],
   "judged": 26,
   "mean_pair_diff": 0.0,
   "median_gap": 0.0,
   "gap_ge15": 0,
   "gap_bins": {
    "0–4": 26,
    "5–9": 0,
    "10–14": 0,
    "15–24": 0,
    "25+": 0
   },
   "dim_gap": {
    "photo": 0.0
   },
   "rubric_id": "board_photo",
   "rubric_version": "1.1.0",
   "grading_text": "三方評分（ 1.1.0：只看照片；老師 9/25 拿掉「卡在哪一步」）→ 對齊 80–100"
  },
  {
   "course": "AIoT智慧裝置實作",
   "course_key": "aiot",
   "title": "點陣亮了 照片",
   "week": 3,
   "cls": "",
   "due": "2026-09-24",
   "mode": "three_aligned",
   "group": false,
   "roster": 26,
   "submitted": 23,
   "missing": 3,
   "late": 1,
   "links": 0,
   "roster_from_grades": false,
   "graded": true,
   "pushed": true,
   "n_dims": 2,
   "dims": [
    "照片看得出點陣亮了",
    "看得出是自己做的（終端機、程式碼或多張連拍）"
   ],
   "overrides": 0,
   "judges": [
    "liwu",
    "wailan",
    "xiuguluan"
   ],
   "judged": 23,
   "mean_pair_diff": 9.1,
   "median_gap": 25.0,
   "gap_ge15": 13,
   "gap_bins": {
    "0–4": 10,
    "5–9": 0,
    "10–14": 0,
    "15–24": 1,
    "25+": 12
   },
   "dim_gap": {
    "evidence": 0.4,
    "lit": 8.7
   },
   "rubric_id": "matrix_photo",
   "rubric_version": "1.0.0",
   "grading_text": "三方評分（：點陣亮 70／自己做的證據 30）→ 對齊 80–100"
  },
  {
   "course": "資訊科技與應用",
   "course_key": "info_tech",
   "title": "Antigravity再做W2作業",
   "week": 3,
   "cls": "AB",
   "due": "2026-09-29",
   "mode": "three_aligned",
   "group": false,
   "roster": 34,
   "submitted": 27,
   "missing": 7,
   "late": 3,
   "links": 1,
   "roster_from_grades": false,
   "graded": true,
   "pushed": true,
   "n_dims": 4,
   "dims": [
    "交了簡報",
    "簡報照 W2 四步拆一則新聞",
    "線上文字①：貼給 Antigravity 的話（原文）",
    "線上文字②：它做的跟你要的哪裡不一樣、你改了什麼"
   ],
   "overrides": 0,
   "judges": [
    "liwu",
    "wailan",
    "xiuguluan"
   ],
   "judged": 27,
   "mean_pair_diff": 3.5,
   "median_gap": 0.0,
   "gap_ge15": 3,
   "gap_bins": {
    "0–4": 23,
    "5–9": 1,
    "10–14": 0,
    "15–24": 0,
    "25+": 3
   },
   "dim_gap": {
    "content": 0.4,
    "prompts": 0.0,
    "reflect": 0.0,
    "slides": 3.1
   },
   "rubric_id": "antigravity_slides",
   "rubric_version": "1.1.0",
   "grading_text": "三方評分（ 1.1.0：簡報50／四步20／原文15／差異15）→ 對齊 80–100；9/25 前交且線上文字空白者①②各8"
  },
  {
   "course": "創客入門",
   "course_key": "maker",
   "title": "紅綠燈閂鎖去彈跳",
   "week": 3,
   "cls": "",
   "due": "2026-09-29",
   "mode": "three_raw",
   "group": false,
   "roster": 23,
   "submitted": 16,
   "missing": 7,
   "late": 1,
   "links": 28,
   "roster_from_grades": false,
   "graded": true,
   "pushed": true,
   "n_dims": 5,
   "dims": [
    "專案一 紅綠燈：Wokwi 專案＋投影片三件事",
    "專案二 閂鎖去彈跳：兩顆 NAND 閂鎖＋證明擋住了＋投影片",
    "必答一：SR 閂鎖為什麼要接三腳的開關、兩腳的按鈕行不行",
    "必答二：閂鎖為什麼不會抖",
    "遇到的問題"
   ],
   "overrides": 0,
   "judges": [
    "liwu",
    "wailan"
   ],
   "judged": 16,
   "mean_pair_diff": 7.8,
   "median_gap": 5.0,
   "gap_ge15": 5,
   "gap_bins": {
    "0–4": 7,
    "5–9": 2,
    "10–14": 2,
    "15–24": 3,
    "25+": 2
   },
   "dim_gap": {
    "p1_traffic": 1.2,
    "p2_latch": 6.2,
    "problems": 0.0,
    "q1_three_pin": 0.3,
    "q2_no_bounce": 0.6
   },
   "rubric_id": "wokwi_traffic_latch",
   "rubric_version": "1.0.0",
   "grading_text": "三方評分（ 1.0.0：30/40/10/10/10）用 原始分；遲交不扣"
  },
  {
   "course": "和AI一起寫程式",
   "course_key": "ai_coding",
   "title": "commit三次push一次",
   "week": 3,
   "cls": "",
   "due": "2026-10-05",
   "mode": "three_aligned",
   "group": false,
   "roster": 39,
   "submitted": 21,
   "missing": 18,
   "late": 3,
   "links": 23,
   "roster_from_grades": false,
   "graded": true,
   "pushed": true,
   "n_dims": 5,
   "dims": [
    "repo 網址與歸屬",
    "三筆 commit 看得到",
    "線上文字列出三筆 commit 訊息",
    "貼給 Antigravity 的原文",
    "它做的跟它說的哪裡不一樣／我退回它那次"
   ],
   "overrides": 0,
   "judges": [
    "liwu",
    "wailan",
    "xiuguluan"
   ],
   "judged": 21,
   "mean_pair_diff": 5.1,
   "median_gap": 2.0,
   "gap_ge15": 2,
   "gap_bins": {
    "0–4": 12,
    "5–9": 4,
    "10–14": 3,
    "15–24": 0,
    "25+": 2
   },
   "dim_gap": {
    "commits": 2.2,
    "messages": 1.7,
    "prompts": 1.8,
    "reflect": 0.3,
    "repo": 0.9
   },
   "rubric_id": "three_commits",
   "rubric_version": "1.0.0",
   "grading_text": "三方評分（）→ 對齊 80–100"
  },
  {
   "course": "和AI一起寫程式",
   "course_key": "ai_coding",
   "title": "LINEBot第一版",
   "week": 5,
   "cls": "",
   "due": "2026-10-05",
   "mode": "other",
   "group": false,
   "roster": 39,
   "submitted": 27,
   "missing": 12,
   "late": 2,
   "links": 34,
   "roster_from_grades": false,
   "graded": true,
   "pushed": true,
   "n_dims": 5,
   "dims": [
    "Bot 程式（GitHub）",
    "專題計畫",
    "簡報或成果文件",
    "開發紀錄",
    "測試或進度說明"
   ],
   "overrides": 1,
   "judges": [
    "wailan",
    "xiuguluan"
   ],
   "judged": 27,
   "mean_pair_diff": 3.3,
   "median_gap": 0.0,
   "gap_ge15": 1,
   "gap_bins": {
    "0–4": 20,
    "5–9": 6,
    "10–14": 0,
    "15–24": 0,
    "25+": 1
   },
   "dim_gap": {
    "bot": 0.6,
    "plan": 0.4,
    "progress": 1.3,
    "slides": 1.7,
    "webpage": 0.2
   },
   "rubric_id": "linebot_v1",
   "rubric_version": "1.1.0",
   "grading_text": "評分（linebot_v1 1.1.0 寬鬆版；洄瀾＋秀姑巒，立霧沒連網看 repo 不採）→ 對齊 80–100"
  },
  {
   "course": "人工智慧概論",
   "course_key": "ai_intro",
   "title": "TM三類模型",
   "week": 4,
   "cls": "AB（課堂＋回家）",
   "due": "2026-10-06",
   "mode": "three_aligned",
   "group": false,
   "roster": 22,
   "submitted": 16,
   "missing": null,
   "late": null,
   "links": null,
   "roster_from_grades": true,
   "graded": true,
   "pushed": true,
   "n_dims": 5,
   "dims": [
    ".tm 專案檔（課堂或回家任一份）",
    "Preview 判類截圖（課堂或回家任一份）",
    "投影片①：選了哪三類、每類幾張、參數怎麼設",
    "投影片②：測試結果，判對、判錯各一張",
    "投影片③：判錯的原因"
   ],
   "overrides": 0,
   "judges": [
    "liwu",
    "wailan",
    "xiuguluan"
   ],
   "judged": 16,
   "mean_pair_diff": 0.9,
   "median_gap": 0.0,
   "gap_ge15": 0,
   "gap_bins": {
    "0–4": 14,
    "5–9": 1,
    "10–14": 1,
    "15–24": 0,
    "25+": 0
   },
   "dim_gap": {
    "preview": 0.3,
    "reason": 0.3,
    "results": 0.3,
    "setup": 0.0,
    "tm_file": 0.0
   },
   "rubric_id": "tm_three_class",
   "rubric_version": "1.1.0",
   "grading_text": "三方評分（ 1.1.0 定案；課堂＋回家合併）→ 對齊 80–99"
  },
  {
   "course": "資訊科技與應用",
   "course_key": "info_tech",
   "title": "skill改版簡報",
   "week": 4,
   "cls": "AB（課堂＋回家）",
   "due": "2026-10-06",
   "mode": "three_aligned",
   "group": false,
   "roster": 34,
   "submitted": 26,
   "missing": null,
   "late": null,
   "links": null,
   "roster_from_grades": true,
   "graded": true,
   "pushed": true,
   "n_dims": 4,
   "dims": [
    "交了改版後的簡報",
    "看得出改版成形（整份套同一套新版面、沒做壞）",
    "線上文字①：用了哪句提示詞",
    "線上文字②：改了哪裡"
   ],
   "overrides": 0,
   "judges": [
    "liwu",
    "wailan",
    "xiuguluan"
   ],
   "judged": 26,
   "mean_pair_diff": 0.0,
   "median_gap": 0.0,
   "gap_ge15": 0,
   "gap_bins": {
    "0–4": 26,
    "5–9": 0,
    "10–14": 0,
    "15–24": 0,
    "25+": 0
   },
   "dim_gap": {
    "changes": 0.2,
    "prompt": 0.2,
    "redesign": 0.0,
    "slides": 0.0
   },
   "rubric_id": "skill_slides_redo",
   "rubric_version": "1.1.0",
   "grading_text": "三方評分（ 1.1.0 定案；課堂＋回家合併）→ 對齊 80–99"
  },
  {
   "course": "創客入門",
   "course_key": "maker",
   "title": "紅綠燈自動手動",
   "week": 4,
   "cls": "",
   "due": "2026-10-06",
   "mode": "three_raw",
   "group": false,
   "roster": 23,
   "submitted": 14,
   "missing": 9,
   "late": 0,
   "links": 14,
   "roster_from_grades": false,
   "graded": true,
   "pushed": true,
   "n_dims": 5,
   "dims": [
    "兩種模式：自動自己輪、手動按一下換燈、兩者能切換",
    "規定一：燈的時間交給 machine.Timer、按鈕交給 Pin.irq",
    "規定二：按鈕去彈跳＋主程式不用 sleep 等燈",
    "線上文字前兩句：怎麼切換模式、計時器和中斷各做什麼",
    "線上文字第三句：怎麼證明沒有漏按"
   ],
   "overrides": 1,
   "judges": [
    "liwu",
    "wailan",
    "xiuguluan"
   ],
   "judged": 14,
   "mean_pair_diff": 2.0,
   "median_gap": 0.0,
   "gap_ge15": 1,
   "gap_bins": {
    "0–4": 10,
    "5–9": 2,
    "10–14": 1,
    "15–24": 1,
    "25+": 0
   },
   "dim_gap": {
    "debounce_nosleep": 0.3,
    "explain": 0.5,
    "modes": 0.5,
    "proof": 1.0,
    "timer_irq": 0.0
   },
   "rubric_id": "wokwi_traffic_modes",
   "rubric_version": "1.1.0",
   "grading_text": "三方評分（ 1.1.0 定案）用 原始分、上限 99"
  }
 ],
 "attendance": {
  "as_of": "2026-10-10",
  "sessions_logged": {
   "人工智慧概論 AA": 2,
   "人工智慧概論 AB": 3,
   "資訊科技與應用 AA": 1,
   "資訊科技與應用 AB": 3,
   "和AI一起寫程式": 2,
   "創客入門": 2,
   "AIoT智慧裝置實作": 3,
   "AI未來應用與趨勢探索": 2
  }
 },
 "types": [
  {
   "id": "setup_four",
   "title": "W2 作業：裝好四樣（GitHub 帳號、Student Pack、ChatGPT 桌面版、Antigravity）",
   "version": "1.1.0",
   "mode": "three_aligned",
   "courses": [
    "AIoT智慧裝置實作",
    "人工智慧概論",
    "創客入門",
    "和AI一起寫程式",
    "資訊科技與應用"
   ],
   "instances": 7,
   "roster": 227,
   "submitted": 163,
   "late": 19,
   "group": false,
   "judged": 163,
   "gap_ge15": 15,
   "gap_bins": {
    "0–4": 118,
    "5–9": 0,
    "10–14": 30,
    "15–24": 9,
    "25+": 6
   },
   "dim_gap": [
    {
     "id": "chatgpt",
     "label": "ChatGPT 桌面版切到 Codex 的畫面",
     "gap": 1.3
    },
    {
     "id": "github",
     "label": "GitHub 個人頁截圖",
     "gap": 1.0
    },
    {
     "id": "antigravity",
     "label": "Antigravity 登入後的畫面",
     "gap": 0.6
    },
    {
     "id": "username",
     "label": "GitHub 帳號名（線上文字填了、或截圖看得到）",
     "gap": 0.4
    },
    {
     "id": "pack",
     "label": "Student Pack 送出後的畫面",
     "gap": 0.1
    }
   ],
   "overrides": 0,
   "rubric": {
    "id": "setup_four",
    "version": "1.1.0",
    "title": "W2 作業：裝好四樣（GitHub 帳號、Student Pack、ChatGPT 桌面版、Antigravity）",
    "total_points": 100,
    "note": "2026-09-25 老師拍板「帳號名空白的放寬」：線上文字沒填 GitHub 帳號名、但截圖裡看得到自己的帳號（GitHub 個人頁那維拿 20）就算填了。做法＝各評分者 1.0.0 的分數不重評，username := max(username, github) 換算後沿用。其餘四維同 1.0.0：截圖看得出是那個畫面＝20、辦不成但線上文字寫了原因＝20、只到登入頁／下載頁＝10、沒有＝0。取平均後對齊 80–100；原始分低於 40 落 60–79。",
    "mode": "llm_assisted",
    "analyzer": "judge_panel",
    "dims": [
     {
      "id": "username",
      "label": "GitHub 帳號名（線上文字填了、或截圖看得到）",
      "points": 20,
      "note": "20＝線上文字有帳號名，或 GitHub 個人頁截圖看得到自己的帳號名（放寬）；10＝有寫字但不是帳號名且截圖也只到首頁；0＝兩邊都沒有。"
     },
     {
      "id": "github",
      "label": "GitHub 個人頁截圖",
      "points": 20,
      "note": "20＝看得到自己的 GitHub 個人頁（頭像／帳號名／repo 分頁）或設定頁；10＝只是 GitHub 登入頁、首頁或看不出是誰的；0＝沒有。辦不成而線上文字寫了原因＝20。"
     },
     {
      "id": "pack",
      "label": "Student Pack 送出後的畫面",
      "points": 20,
      "note": "20＝Student Developer Pack 申請送出／審核中／已核准的畫面；10＝只是 Pack 介紹頁或申請表還沒送；0＝沒有。辦不成（年齡、學校信箱、審核）而線上文字寫了原因＝20。"
     },
     {
      "id": "chatgpt",
      "label": "ChatGPT 桌面版切到 Codex 的畫面",
      "points": 20,
      "note": "20＝桌面版（不是瀏覽器分頁）且看得到 Codex 側欄或 Codex 頁；10＝只有 ChatGPT 桌面版一般對話畫面、或瀏覽器版 Codex；0＝沒有。辦不成而線上文字寫了原因＝20。"
     },
     {
      "id": "antigravity",
      "label": "Antigravity 登入後的畫面",
      "points": 20,
      "note": "20＝Antigravity 主畫面且看得出已登入（帳號、agent 面板、專案）；10＝只有下載頁、安裝畫面或登入頁；0＝沒有。辦不成（學校信箱不能登、地區限制）而線上文字寫了原因＝20。"
     }
    ],
    "disagree_flag": 15,
    "normal_map": {
     "mean": 90,
     "sd": 5,
     "min": 80,
     "max": 100,
     "floor_raw": 40
    }
   },
   "versions": [
    {
     "version": "1.0.0",
     "title": "W2 作業：裝好四樣（GitHub 帳號、Student Pack、ChatGPT 桌面版、Antigravity）",
     "note": "2026-09-25 洄瀾草擬（由老師確認；老師 9/25 晚：有交即 100 不夠、要真的批）。作業說明：線上文字填 GitHub 帳號名＋最多 4 張截圖（GitHub 個人頁／Student Pack 送出後畫面／ChatGPT 桌面版切到 Codex／Antigravity 登入後畫面）；「辦不成補一句原因也算完成」。所以每一樣：截圖看得出是那個畫面＝滿分；沒截圖但線上文字寫了辦不成的原因＝滿分；截圖看不出是哪個畫面／只有登入頁或下載頁＝一半；沒有＝0。七班同一份。評分者依本表打分取平均後對齊 80–100；原始分低於 40 落 60–79。"
    },
    {
     "version": "1.1.0",
     "title": "W2 作業：裝好四樣（GitHub 帳號、Student Pack、ChatGPT 桌面版、Antigravity）",
     "note": "2026-09-25 老師拍板「帳號名空白的放寬」：線上文字沒填 GitHub 帳號名、但截圖裡看得到自己的帳號（GitHub 個人頁那維拿 20）就算填了。做法＝各評分者 1.0.0 的分數不重評，username := max(username, github) 換算後沿用。其餘四維同 1.0.0：截圖看得出是那個畫面＝20、辦不成但線上文字寫了原因＝20、只到登入頁／下載頁＝10、沒有＝0。取平均後對齊 80–100；原始分低於 40 落 60–79。"
    }
   ]
  },
  {
   "id": "three_commits",
   "title": "W3 作業：commit 三次，push 一次（Antigravity 裝 git／gh、Python 小程式改三版、GitHub 截圖）",
   "version": "1.0.0",
   "mode": "three_aligned",
   "courses": [
    "人工智慧概論",
    "和AI一起寫程式",
    "資訊科技與應用"
   ],
   "instances": 4,
   "roster": 144,
   "submitted": 62,
   "late": 5,
   "group": false,
   "judged": 62,
   "gap_ge15": 6,
   "gap_bins": {
    "0–4": 36,
    "5–9": 14,
    "10–14": 6,
    "15–24": 2,
    "25+": 4
   },
   "dim_gap": [
    {
     "id": "prompts",
     "label": "貼給 Antigravity 的原文",
     "gap": 1.9
    },
    {
     "id": "commits",
     "label": "三筆 commit 看得到",
     "gap": 1.4
    },
    {
     "id": "messages",
     "label": "線上文字列出三筆 commit 訊息",
     "gap": 1.0
    },
    {
     "id": "repo",
     "label": "repo 網址與歸屬",
     "gap": 0.6
    },
    {
     "id": "reflect",
     "label": "它做的跟它說的哪裡不一樣／我退回它那次",
     "gap": 0.3
    }
   ],
   "overrides": 0,
   "rubric": {
    "id": "three_commits",
    "version": "1.0.0",
    "title": "W3 作業：commit 三次，push 一次（Antigravity 裝 git／gh、Python 小程式改三版、GitHub 截圖）",
    "total_points": 100,
    "note": "2026-09-25 洄瀾草擬（草擬後由老師確認）。四班同一份作業（P10）：線上文字四點（repo 網址／三筆 commit 訊息／貼給 Antigravity 的原文 ≥3 段／一句「它做的跟它說的有沒有不一樣或你退回它那次」）＋ GitHub 歷史頁截圖必交。夠了線＝網址活著＋三筆 commit＋截圖。三條路線（Antigravity／自己敲指令／本機模擬）同分：本機模擬以截圖裡的資料夾與 git log 替代網址。評分者依本表打分，取平均後對齊 80–100；原始分低於 40 落 60–79。",
    "mode": "llm_assisted",
    "analyzer": "judge_panel",
    "dims": [
     {
      "id": "repo",
      "label": "repo 網址與歸屬",
      "points": 25,
      "note": "25＝線上文字有 GitHub repo 網址，且截圖或網址看得出是自己的公開 repo（帳號名對得上）；15＝網址在但打不開／私有看不到內容；8＝只有截圖沒網址（或只有網址、截圖完全沒有）；0＝都沒有。本機模擬路線：截圖看得到本機 git log 且線上文字寫明「本機模擬」＝25。"
     },
     {
      "id": "commits",
      "label": "三筆 commit 看得到",
      "points": 30,
      "note": "30＝截圖（或 GitHub 歷史）看得到 ≥3 筆 commit，訊息各不相同、看得出三個版本；20＝只看得到 2 筆；10＝1 筆；0＝看不到任何 commit。⚠️三筆訊息完全一樣（如都叫 update）最多 20。"
     },
     {
      "id": "messages",
      "label": "線上文字列出三筆 commit 訊息",
      "points": 15,
      "note": "15＝列了三筆且與截圖對得上；10＝列了但只有兩筆或與截圖對不上；5＝只寫一句帶過；0＝沒寫。"
     },
     {
      "id": "prompts",
      "label": "貼給 Antigravity 的原文",
      "points": 20,
      "note": "20＝原文 ≥3 段、看得出逐步（查裝／init 與 commit／push）；12＝1–2 段或濃縮成描述；5＝只寫「我叫它做」；0＝沒有。自己敲指令的路線：貼出自己下的指令 ≥3 條＝20。"
     },
     {
      "id": "reflect",
      "label": "它做的跟它說的哪裡不一樣／我退回它那次",
      "points": 10,
      "note": "10＝一句具體（指得出哪一步、差在哪、或退回了什麼）；6＝有寫但籠統（含「沒有不一樣」但有說怎麼確認的）；3＝只寫「沒有」；0＝沒寫。"
     }
    ],
    "disagree_flag": 15,
    "normal_map": {
     "mean": 90,
     "sd": 5,
     "min": 80,
     "max": 100,
     "floor_raw": 40
    }
   },
   "versions": [
    {
     "version": "1.0.0",
     "title": "W3 作業：commit 三次，push 一次（Antigravity 裝 git／gh、Python 小程式改三版、GitHub 截圖）",
     "note": "2026-09-25 洄瀾草擬（草擬後由老師確認）。四班同一份作業（P10）：線上文字四點（repo 網址／三筆 commit 訊息／貼給 Antigravity 的原文 ≥3 段／一句「它做的跟它說的有沒有不一樣或你退回它那次」）＋ GitHub 歷史頁截圖必交。夠了線＝網址活著＋三筆 commit＋截圖。三條路線（Antigravity／自己敲指令／本機模擬）同分：本機模擬以截圖裡的資料夾與 git log 替代網址。評分者依本表打分，取平均後對齊 80–100；原始分低於 40 落 60–79。"
    }
   ]
  },
  {
   "id": "e1_image_card",
   "title": "W2 E1 圖像判斷卡＋自己產生的圖（人工智慧概論）",
   "version": "1.0.0",
   "mode": "three_aligned",
   "courses": [
    "人工智慧概論"
   ],
   "instances": 2,
   "roster": 65,
   "submitted": 42,
   "late": 0,
   "group": true,
   "judged": 42,
   "gap_ge15": 3,
   "gap_bins": {
    "0–4": 7,
    "5–9": 17,
    "10–14": 15,
    "15–24": 3,
    "25+": 0
   },
   "dim_gap": [
    {
     "id": "why",
     "label": "為什麼影響需求或讀者",
     "gap": 2.4
    },
    {
     "id": "decision",
     "label": "決定與理由",
     "gap": 2.3
    },
    {
     "id": "image",
     "label": "圖像產出與版本",
     "gap": 2.2
    },
    {
     "id": "next",
     "label": "下一步與再確認",
     "gap": 1.9
    },
    {
     "id": "detail",
     "label": "一個看得見的細節與位置",
     "gap": 1.2
    },
    {
     "id": "source",
     "label": "來源／工具／模擬素材與自己的修改",
     "gap": 0.7
    }
   ],
   "overrides": 0,
   "rubric": {
    "id": "e1_image_card",
    "version": "1.0.0",
    "title": "W2 E1 圖像判斷卡＋自己產生的圖（人工智慧概論）",
    "total_points": 100,
    "note": "2026-09-16 洄瀾讀完 39 份材料後定；對應 E1 卡六欄（e1-aa/e1-ab.html）＋作業要求「交 E1 卡 PDF＋你產生的圖」。評分者（洄瀾／立霧／秀姑巒）各自依本表打分，取平均後再對齊 80–100 常態分布（教師最終分數可覆寫）。 2026-09-16 老師 加地板：原始分低於 40 不對齊、按 原始分 線性落在 60–79，且不算進對齊母體的平均／標準差。",
    "mode": "llm_assisted",
    "analyzer": "judge_panel",
    "dims": [
     {
      "id": "image",
      "label": "圖像產出與版本",
      "points": 20,
      "note": "20＝交了自己產生的圖，且看得出 v0→v1（或多版）的改動；14＝只有一張圖或改動看不出來；8＝圖不是自己產的／只有卡的截圖；0＝沒有圖。"
     },
     {
      "id": "decision",
      "label": "決定與理由",
      "points": 20,
      "note": "20＝採用／修改／拒絕三選一，理由對照需求（五項固定資訊、虛構標示、讀者）；14＝有決定、理由籠統；8＝只寫決定沒理由；0＝空白。⚠️把固定資訊（時間 16:30、日期 22 SEPT）當成可以改的東西去改，理由再順也最多 12。"
     },
     {
      "id": "detail",
      "label": "一個看得見的細節與位置",
      "points": 20,
      "note": "20＝指得出圖上哪裡、寫了什麼／長什麼樣（可對照圖驗證）；14＝有細節但位置模糊；8＝只有「整體感覺」；0＝空白。"
     },
     {
      "id": "why",
      "label": "為什麼影響需求或讀者",
      "points": 15,
      "note": "15＝連到需求（固定資訊、手機可讀、新生／外籍生、虛構標示）；10＝有講影響但泛泛；5＝一句話帶過；0＝空白。"
     },
     {
      "id": "next",
      "label": "下一步與再確認",
      "points": 15,
      "note": "15＝具體下一步＋怎麼驗證（逐項對固定資訊、縮到手機寬度看…）；10＝只有下一步沒有驗證法；5＝空泛（「再檢查」）；0＝空白。"
     },
     {
      "id": "source",
      "label": "來源／工具／模擬素材與自己的修改",
      "points": 10,
      "note": "10＝工具名＋自己改了什麼（或明說沒改、只檢查）；6＝只有工具名；3＝含糊；0＝空白。"
     }
    ],
    "disagree_flag": 15,
    "normal_map": {
     "mean": 90,
     "sd": 5,
     "min": 80,
     "max": 100,
     "floor_raw": 40
    }
   },
   "versions": [
    {
     "version": "1.0.0",
     "title": "W2 E1 圖像判斷卡＋自己產生的圖（人工智慧概論）",
     "note": "2026-09-16 洄瀾讀完 39 份材料後定；對應 E1 卡六欄（e1-aa/e1-ab.html）＋作業要求「交 E1 卡 PDF＋你產生的圖」。評分者（洄瀾／立霧／秀姑巒）各自依本表打分，取平均後再對齊 80–100 常態分布（教師最終分數可覆寫）。 2026-09-16 老師 加地板：原始分低於 40 不對齊、按 原始分 線性落在 60–79，且不算進對齊母體的平均／標準差。"
    }
   ]
  },
  {
   "id": "ai_image_prompt_group",
   "title": "W2 AI 生圖與小組討論：你的圖、你的提示、組裡討論出什麼（資訊科技與應用 AA）",
   "version": "1.0.0",
   "mode": "three_aligned",
   "courses": [
    "資訊科技與應用"
   ],
   "instances": 1,
   "roster": 40,
   "submitted": 8,
   "late": 0,
   "group": true,
   "judged": 8,
   "gap_ge15": 1,
   "gap_bins": {
    "0–4": 4,
    "5–9": 2,
    "10–14": 1,
    "15–24": 1,
    "25+": 0
   },
   "dim_gap": [
    {
     "id": "prompt",
     "label": "提示原文（整段照貼）",
     "gap": 1.8
    },
    {
     "id": "reflection",
     "label": "反思：下次要改哪一句",
     "gap": 1.7
    },
    {
     "id": "iteration",
     "label": "改了什麼、為什麼（提示→結果的對應）",
     "gap": 1.0
    },
    {
     "id": "group",
     "label": "組別與組裡討論結果",
     "gap": 0.0
    },
    {
     "id": "image",
     "label": "自己產生的圖",
     "gap": 0.0
    }
   ],
   "overrides": 0,
   "rubric": {
    "id": "ai_image_prompt_group",
    "version": "1.0.0",
    "title": "W2 AI 生圖與小組討論：你的圖、你的提示、組裡討論出什麼（資訊科技與應用 AA）",
    "total_points": 100,
    "note": "2026-09-16 洄瀾讀完 8 份材料後定；作業說明＝主題自訂產一張圖→帶到組裡每人講一次→交圖＋提示原文＋組裡討論結果；重點是「你寫了什麼、它就給你什麼」。評分者各自打分取平均，再對齊 80–100 常態分布。 2026-09-16 老師 加地板：原始分低於 40 不對齊、按 原始分 線性落在 60–79，且不算進對齊母體的平均／標準差。",
    "mode": "llm_assisted",
    "analyzer": "judge_panel",
    "dims": [
     {
      "id": "image",
      "label": "自己產生的圖",
      "points": 20,
      "note": "20＝交了自己產的圖（若有前後版更好）；12＝圖來源不明或只有別人的原圖；0＝沒有圖。"
     },
     {
      "id": "prompt",
      "label": "提示原文（整段照貼）",
      "points": 25,
      "note": "25＝整段提示照貼，看得出主體／風格／構圖等具體要求；18＝有提示但是濃縮成一兩句；10＝只描述圖、不是提示；0＝沒有。⚠️貼的是 AI 對圖的描述而不是自己下的提示，最多 12。"
     },
     {
      "id": "iteration",
      "label": "改了什麼、為什麼（提示→結果的對應）",
      "points": 20,
      "note": "20＝寫出 v0→v1 改了哪句提示、畫面跟著怎麼變；14＝有改動但沒說對應；8＝只說「改了」；0＝沒有。"
     },
     {
      "id": "group",
      "label": "組別與組裡討論結果",
      "points": 20,
      "note": "20＝寫組別＋討論出什麼（選了誰的圖、為什麼、共同結論）；14＝有組別＋一句結論；8＝只寫組別；0＝沒有。"
     },
     {
      "id": "reflection",
      "label": "反思：下次要改哪一句",
      "points": 15,
      "note": "15＝說得出結果哪裡不如預期、下次提示要怎麼改；10＝有感想但不具體；5＝一句帶過；0＝沒有。"
     }
    ],
    "disagree_flag": 15,
    "normal_map": {
     "mean": 90,
     "sd": 5,
     "min": 80,
     "max": 100,
     "floor_raw": 40
    }
   },
   "versions": [
    {
     "version": "1.0.0",
     "title": "W2 AI 生圖與小組討論：你的圖、你的提示、組裡討論出什麼（資訊科技與應用 AA）",
     "note": "2026-09-16 洄瀾讀完 8 份材料後定；作業說明＝主題自訂產一張圖→帶到組裡每人講一次→交圖＋提示原文＋組裡討論結果；重點是「你寫了什麼、它就給你什麼」。評分者各自打分取平均，再對齊 80–100 常態分布。 2026-09-16 老師 加地板：原始分低於 40 不對齊、按 原始分 線性落在 60–79，且不算進對齊母體的平均／標準差。"
    }
   ]
  },
  {
   "id": "antigravity_slides",
   "title": "W3 作業：用 Antigravity 把 W2 的新聞判斷簡報再做一次（資訊科技與應用 AB）",
   "version": "1.1.0",
   "mode": "three_aligned",
   "courses": [
    "資訊科技與應用"
   ],
   "instances": 1,
   "roster": 34,
   "submitted": 27,
   "late": 3,
   "group": false,
   "judged": 27,
   "gap_ge15": 3,
   "gap_bins": {
    "0–4": 23,
    "5–9": 1,
    "10–14": 0,
    "15–24": 0,
    "25+": 3
   },
   "dim_gap": [
    {
     "id": "slides",
     "label": "交了簡報",
     "gap": 3.1
    },
    {
     "id": "content",
     "label": "簡報照 W2 四步拆一則新聞",
     "gap": 0.4
    },
    {
     "id": "prompts",
     "label": "線上文字①：貼給 Antigravity 的話（原文）",
     "gap": 0.0
    },
    {
     "id": "reflect",
     "label": "線上文字②：它做的跟你要的哪裡不一樣、你改了什麼",
     "gap": 0.0
    }
   ],
   "overrides": 0,
   "rubric": {
    "id": "antigravity_slides",
    "version": "1.1.0",
    "title": "W3 作業：用 Antigravity 把 W2 的新聞判斷簡報再做一次（資訊科技與應用 AB）",
    "total_points": 100,
    "note": "2026-10-02 依 27 份實際繳交擬（18 份細讀、9 份快讀），老師 2026-10-02 確認「兩份照這樣」。由 1.0.0 改來：W2 四步只占 20（W2 已用 評過一次），作業說明要的線上文字兩項各 15；交 HTML／PDF／截圖不分高下，也不靠檔案痕跡判斷用了什麼工具。評分前置：洄瀾把每份附的網址實測一次，點不開或對不上的寫成「查核附記」，附在 該生段落末尾。地板照 9/16 定的 原始分低於 40→60–79；簡報交齊的人最低 50，落不到地板。遲交不在本表扣，推簿時 ×0.8。",
    "mode": "llm_assisted",
    "analyzer": "judge_panel",
    "dims": [
     {
      "id": "slides",
      "label": "交了簡報",
      "points": 50,
      "note": "50＝簡報交齊：5 頁以上、有標題有內容、打得開；HTML、PDF、截圖都算，少一兩頁、離線跑版這類小瑕疵不扣。25＝只有 2–4 頁，或多頁只有標題沒內容。15＝只交到封面一頁；或沒有簡報檔、只有大綱（只把大綱貼在線上文字也算這級）。0＝沒有簡報，或檔案打不開。"
     },
     {
      "id": "content",
      "label": "簡報照 W2 四步拆一則新聞",
      "points": 20,
      "note": "四步＝①追到原話出處 ②被放大的那一句 ③反面說法 ④先自己判斷再比 AI；「做到」＝簡報裡看得到那一步的實際內容，不是只講方法。20＝針對一則具體新聞（媒體＋標題或網址），四步做到三步以上。12＝有拆具體新聞，但只做到一兩步；或拆的不是「AI 會毀滅人類」這類新聞；或查核附記寫新聞／出處網址點不開、對不上。6＝沒拆特定新聞，只整理正反觀點、專家說法（主題泛論），或只教方法。0＝沒有相關內容。用自己的 W2 當素材不扣分。"
     },
     {
      "id": "prompts",
      "label": "線上文字①：貼給 Antigravity 的話（原文）",
      "points": 15,
      "note": "15＝原文兩則以上（兩次給它的話，例如先交代任務、再要它修改）。8＝原文只有一則（一則裡列了好幾項要求，還是算一則）；或沒貼原文，但具體寫出交代了它哪些事。0＝都沒有。寫在線上文字、投影片、對話截圖裡都算；用不了 Antigravity、改用別的 AI 並寫明原因的，照同一套標準評。"
     },
     {
      "id": "reflect",
      "label": "線上文字②：它做的跟你要的哪裡不一樣、你改了什麼",
      "points": 15,
      "note": "15＝寫出差在哪（哪一頁或哪部分）＋自己改了什麼或要它改什麼。8＝只寫差在哪、沒寫改了什麼，或很籠統。3＝只寫「沒有不一樣」。0＝沒寫。寫在線上文字或投影片裡都算。"
     }
    ],
    "disagree_flag": 15,
    "normal_map": {
     "mean": 90,
     "sd": 5,
     "min": 80,
     "max": 100,
     "floor_raw": 40
    }
   },
   "versions": [
    {
     "version": "1.0.0",
     "title": "W3 作業：用 Antigravity 把 W2 簡報作業再做一次（資訊科技與應用 AB）",
     "note": "2026-09-25 洄瀾草擬（草擬後由老師確認）。老師 9/25 拍板：這份作業「（英文原話略）」——把 W2 的簡報作業（討論「AI 會毀滅人類」的新聞：追源頭／找被放大的那句／查反面說法／自己判斷再比 AI）改用 Antigravity（AI 代理）再做一次；不是 git 那套（9/22 e學苑 說明寫錯、9/25 git 版評分作廢）。等 9/29 到期全班交齊再批。評分者依本表打分，取平均後對齊 80–100；原始分低於 40 落 60–79。"
    },
    {
     "version": "1.1.0",
     "title": "W3 作業：用 Antigravity 把 W2 的新聞判斷簡報再做一次（資訊科技與應用 AB）",
     "note": "2026-10-02 依 27 份實際繳交擬（18 份細讀、9 份快讀），老師 2026-10-02 確認「兩份照這樣」。由 1.0.0 改來：W2 四步只占 20（W2 已用 評過一次），作業說明要的線上文字兩項各 15；交 HTML／PDF／截圖不分高下，也不靠檔案痕跡判斷用了什麼工具。評分前置：洄瀾把每份附的網址實測一次，點不開或對不上的寫成「查核附記」，附在 該生段落末尾。地板照 9/16 定的 原始分低於 40→60–79；簡報交齊的人最低 50，落不到地板。遲交不在本表扣，推簿時 ×0.8。"
    }
   ]
  },
  {
   "id": "board_photo",
   "title": "W2 我的板子動起來了（上傳一張照片）（AIoT 智慧裝置實作）",
   "version": "1.1.0",
   "mode": "three_aligned",
   "courses": [
    "AIoT智慧裝置實作"
   ],
   "instances": 1,
   "roster": 26,
   "submitted": 26,
   "late": 2,
   "group": false,
   "judged": 26,
   "gap_ge15": 0,
   "gap_bins": {
    "0–4": 26,
    "5–9": 0,
    "10–14": 0,
    "15–24": 0,
    "25+": 0
   },
   "dim_gap": [
    {
     "id": "photo",
     "label": "照片看得出自己的板子在動",
     "gap": 0.0
    }
   ],
   "overrides": 0,
   "rubric": {
    "id": "board_photo",
    "version": "1.1.0",
    "title": "W2 我的板子動起來了（上傳一張照片）（AIoT 智慧裝置實作）",
    "total_points": 100,
    "note": "2026-09-25 老師拍板「全班沒寫，拿掉這一維」：1.0.0 的「卡在哪一步」40 分全班線上文字都空白（作業名只寫上傳一張照片），拿掉、只看照片。評分者 1.0.0 的 photo 分數（滿分 60）按比例換成滿分 100 沿用，不重評。取平均後對齊 80–100；原始分低於 40 落 60–79。",
    "mode": "llm_assisted",
    "analyzer": "judge_panel",
    "dims": [
     {
      "id": "photo",
      "label": "照片看得出自己的板子在動",
      "points": 100,
      "note": "100＝照片有板子（UNO Q／Arduino 類）且看得出有動靜（LED 亮、接著電腦與線、螢幕上有終端機或 IDE 輸出）；67＝有板子但看不出有沒有動（沒亮、沒接線）；33＝只有螢幕截圖沒板子、或只有盒子；0＝沒照片。"
     }
    ],
    "disagree_flag": 15,
    "normal_map": {
     "mean": 90,
     "sd": 5,
     "min": 80,
     "max": 100,
     "floor_raw": 40
    }
   },
   "versions": [
    {
     "version": "1.0.0",
     "title": "W2 我的板子動起來了（上傳一張照片＋寫卡在哪一步）（AIoT 智慧裝置實作）",
     "note": "2026-09-25 洄瀾草擬（草擬後由老師確認）。W2 當堂：接上 UNO Q、統一版本、跑 Blink、裝 Antigravity；證據＝一張照片（板子亮起來／終端機畫面）＋線上文字「卡在哪一步」。評分者依本表打分取平均後對齊 80–100；原始分低於 40 落 60–79。"
    },
    {
     "version": "1.1.0",
     "title": "W2 我的板子動起來了（上傳一張照片）（AIoT 智慧裝置實作）",
     "note": "2026-09-25 老師拍板「全班沒寫，拿掉這一維」：1.0.0 的「卡在哪一步」40 分全班線上文字都空白（作業名只寫上傳一張照片），拿掉、只看照片。評分者 1.0.0 的 photo 分數（滿分 60）按比例換成滿分 100 沿用，不重評。取平均後對齊 80–100；原始分低於 40 落 60–79。"
    }
   ]
  },
  {
   "id": "completion",
   "title": "完成度（截圖/隨堂繳交：有交即滿分）",
   "version": "1.0.0",
   "mode": "completion",
   "courses": [
    "AI未來應用與趨勢探索"
   ],
   "instances": 1,
   "roster": 69,
   "submitted": 63,
   "late": 11,
   "group": false,
   "judged": 0,
   "gap_ge15": 0,
   "gap_bins": {
    "0–4": 0,
    "5–9": 0,
    "10–14": 0,
    "15–24": 0,
    "25+": 0
   },
   "dim_gap": [],
   "overrides": 0,
   "rubric": {
    "id": "completion",
    "version": "1.0.0",
    "title": "完成度（截圖/隨堂繳交：有交即滿分）",
    "total_points": 100,
    "note": "用於截圖型/隨堂繳交作業（如 GitHub 登入截圖、操作截圖）：有繳交（任何檔案）即給滿分，未繳=0。確定性、不靠 LLM。可調 給分參數（預設100）。",
    "mode": "deterministic",
    "analyzer": "completion",
    "dims": [
     {
      "id": "completion",
      "label": "完成度",
      "points": 100,
      "note": "有繳交即滿分；未繳=0"
     }
    ],
    "disagree_flag": null,
    "normal_map": {}
   },
   "versions": [
    {
     "version": "1.0.0",
     "title": "完成度（截圖/隨堂繳交：有交即滿分）",
     "note": "用於截圖型/隨堂繳交作業（如 GitHub 登入截圖、操作截圖）：有繳交（任何檔案）即給滿分，未繳=0。確定性、不靠 LLM。可調 給分參數（預設100）。"
    }
   ]
  },
  {
   "id": "linebot_v1",
   "title": "W5 課堂作業：LINE Bot 第一版（寬鬆版：通識課，有做就有分）（和AI一起寫程式）",
   "version": "1.1.0",
   "mode": "other",
   "courses": [
    "和AI一起寫程式"
   ],
   "instances": 1,
   "roster": 39,
   "submitted": 27,
   "late": 2,
   "group": false,
   "judged": 27,
   "gap_ge15": 1,
   "gap_bins": {
    "0–4": 20,
    "5–9": 6,
    "10–14": 0,
    "15–24": 0,
    "25+": 1
   },
   "dim_gap": [
    {
     "id": "slides",
     "label": "簡報或成果文件",
     "gap": 1.7
    },
    {
     "id": "progress",
     "label": "測試或進度說明",
     "gap": 1.3
    },
    {
     "id": "bot",
     "label": "Bot 程式（GitHub）",
     "gap": 0.6
    },
    {
     "id": "plan",
     "label": "專題計畫",
     "gap": 0.4
    },
    {
     "id": "webpage",
     "label": "開發紀錄",
     "gap": 0.2
    }
   ],
   "overrides": 1,
   "rubric": {
    "id": "linebot_v1",
    "version": "1.1.0",
    "title": "W5 課堂作業：LINE Bot 第一版（寬鬆版：通識課，有做就有分）（和AI一起寫程式）",
    "total_points": 100,
    "note": "2026-10-09 老師「（英文原話略）」→ 取代 1.0.0（1.0.0 全班原始分平均 45、一半以上低於 40）。精神：第一版重在「動手做了、誠實寫出做到哪」；每一樣有交就拿大半分數，做得完整才拿滿分；不看計畫是否六項齊、網頁是否發布、測試是否寫成輸入／預期／實際三欄。配分重心放在 Bot 程式本身（repo 裡看得到 Bot 程式就 35）。只放在 repo 裡、線上文字沒指到的東西也算交（上課日當天以前 commit 的），不再打折。門檻 降到 30：做出 Bot 程式的人都進 80–100 對齊帶；只有幾乎沒交東西的才落 60–79。",
    "mode": "llm_assisted",
    "analyzer": "judge_panel",
    "dims": [
     {
      "id": "bot",
      "label": "Bot 程式（GitHub）",
      "points": 35,
      "note": "35＝看得到這個專題的 Bot 程式（GitHub repo、上傳的程式檔、或 repo 子頁／commit 頁連到的 repo 都算），不論能不能跑、功能多少、有沒有串生成式 AI、是不是沿用之前練習的 repo。25＝有 repo 或程式相關檔，但看不出 Bot 程式（只有 README、說明、範例或設定檔）；或沒有程式但有清楚的 Bot 執行畫面截圖。10＝repo 是空的、跟這個專題無關（可能貼錯），或只有文字說做了 Bot、沒有任何程式或畫面。0＝完全沒有。"
     },
     {
      "id": "plan",
      "label": "專題計畫",
      "points": 15,
      "note": "15＝有計畫，看得出要做什麼 Bot、給誰用或解決什麼問題（不必六項齊；寫在計畫檔、簡報、網頁、README、線上文字都算；AI 產出的企劃書也算）。10＝只有題目加一兩句功能描述。5＝只有題目；或計畫檔是作業說明原檔沒填、但從別處看得出題目。0＝完全看不出要做什麼。"
     },
     {
      "id": "slides",
      "label": "簡報或成果文件",
      "points": 15,
      "note": "15＝有簡報或成果文件（PDF、PPTX、HTML 投影片、報告、多頁文件都算，不限頁數，內容講這個專題）。8＝沒有成形的簡報，只有幾張截圖加說明。0＝沒有。同一份文件可以同時算計畫與簡報。"
     },
     {
      "id": "webpage",
      "label": "開發紀錄",
      "points": 10,
      "note": "10＝有開發紀錄（發布的網頁、GitHub Pages、README 當紀錄、沒發布的 HTML 檔都算；有沒有貼連結都算）。5＝貼的不是紀錄（伺服器健康檢查頁、程式檔、跟專題無關的測試頁）。0＝沒有。"
     },
     {
      "id": "progress",
      "label": "測試或進度說明",
      "points": 25,
      "note": "25＝有任何實際跑過的痕跡（一張 Bot 對話截圖、終端機或部署 log、一句「傳了 X、Bot 回了 Y」），或誠實寫出做到哪、卡在哪、下一步要做什麼（任一種就滿分；本機測試、還沒接 LINE 真機都算）。15＝只有籠統的「完成／測試過關」，或只有測試計畫、沒有結果。8＝只有一句「暫無／之後補」。0＝完全沒有測試或進度的文字。"
     }
    ],
    "disagree_flag": 15,
    "normal_map": {
     "mean": 90,
     "sd": 5,
     "min": 80,
     "max": 100,
     "floor_raw": 30
    }
   },
   "versions": [
    {
     "version": "1.0.0",
     "title": "W5 課堂作業：LINE Bot 第一版（專題計畫、GitHub、AI 製作的開發紀錄網頁、簡報 PDF、實測證明）（和AI一起寫程式）",
     "note": "2026-10-09 洄瀾依 27 份實際繳交擬（草擬後由老師確認）。五維對應作業說明的五件事：專題計畫（附件六項）、GitHub 專案、開發紀錄網頁、簡報、實測證明與如實進度。設計要點：①「如實寫出目前進度、測試結果、待改善問題」本身就是得分點，所以 evidence 配最重（35），而且「還沒實測但寫出卡在哪＋下一步」有 20；②格式不拘：PDF、PPTX、HTML、Markdown、DOCX 都算，計畫寫在計畫檔、簡報或網頁裡都算；③不苛求美觀、功能多寡、有沒有串生成式 AI；本機測試（不經 LINE）算實測；④AI 產出的企劃書照六項逐項看，篇幅長、用詞華麗不加分，無根據的效益數字不扣分；⑤連結是活的、很多人課後已改成改善版，評分看交件內容，連結現況只確認打得開、是不是這個專題、有沒有實測段落。評分者依本表打 原始分，取平均後照 對齊；原始分低於 40 落 60–79。"
    },
    {
     "version": "1.1.0",
     "title": "W5 課堂作業：LINE Bot 第一版（寬鬆版：通識課，有做就有分）（和AI一起寫程式）",
     "note": "2026-10-09 老師「（英文原話略）」→ 取代 1.0.0（1.0.0 全班原始分平均 45、一半以上低於 40）。精神：第一版重在「動手做了、誠實寫出做到哪」；每一樣有交就拿大半分數，做得完整才拿滿分；不看計畫是否六項齊、網頁是否發布、測試是否寫成輸入／預期／實際三欄。配分重心放在 Bot 程式本身（repo 裡看得到 Bot 程式就 35）。只放在 repo 裡、線上文字沒指到的東西也算交（上課日當天以前 commit 的），不再打折。門檻 降到 30：做出 Bot 程式的人都進 80–100 對齊帶；只有幾乎沒交東西的才落 60–79。"
    }
   ]
  },
  {
   "id": "links_required",
   "title": "交網址型作業（真的開連結：活著的網址 ≥1 條即滿分）",
   "version": "1.1.0",
   "mode": "program",
   "courses": [
    "和AI一起寫程式"
   ],
   "instances": 1,
   "roster": 39,
   "submitted": 19,
   "late": 0,
   "group": false,
   "judged": 0,
   "gap_ge15": 0,
   "gap_bins": {
    "0–4": 0,
    "5–9": 0,
    "10–14": 0,
    "15–24": 0,
    "25+": 0
   },
   "dim_gap": [],
   "overrides": 0,
   "rubric": {
    "id": "links_required",
    "version": "1.1.0",
    "title": "交網址型作業（真的開連結：活著的網址 ≥1 條即滿分）",
    "total_points": 100,
    "note": "2026-09-25 老師拍板「（英文原話略）」：不再看條數，實際開每條網址（HEAD→GET、跟隨轉址、15 秒逾時），2xx／3xx＝活著；活著 ≥1 條＝100，有網址但全死＝50，沒網址＝0。理由那句只記進「主要問題」欄、不扣分。確定性、不靠 LLM；每條活／死寫進主要問題欄，老師可逐條核。",
    "mode": "deterministic",
    "analyzer": "links_required",
    "dims": [
     {
      "id": "links",
      "label": "活著的網址",
      "points": 100,
      "note": "活著 ≥1 條＝100；有網址但全打不開＝50；沒網址＝0"
     }
    ],
    "disagree_flag": null,
    "normal_map": {}
   },
   "versions": [
    {
     "version": "1.0.0",
     "title": "交網址型作業（線上文字貼 N 條網址即滿分）",
     "note": "2026-09-25 建。用於「交兩行網址（網站＋倉庫）＋一句理由」這類作業：線上文字裡不同的 http(s) 網址 ≥ required 條＝滿分；只有 1 條＝；0 條＝0。理由那句只記進「主要問題」欄、不扣分（老師 2026-09-20：前兩行有了就滿分）。確定性、不靠 LLM。"
    },
    {
     "version": "1.1.0",
     "title": "交網址型作業（真的開連結：活著的網址 ≥1 條即滿分）",
     "note": "2026-09-25 老師拍板「（英文原話略）」：不再看條數，實際開每條網址（HEAD→GET、跟隨轉址、15 秒逾時），2xx／3xx＝活著；活著 ≥1 條＝100，有網址但全死＝50，沒網址＝0。理由那句只記進「主要問題」欄、不扣分。確定性、不靠 LLM；每條活／死寫進主要問題欄，老師可逐條核。"
    }
   ]
  },
  {
   "id": "matrix_photo",
   "title": "W3 我的點陣亮了（上傳照片）（AIoT 智慧裝置實作）",
   "version": "1.0.0",
   "mode": "three_aligned",
   "courses": [
    "AIoT智慧裝置實作"
   ],
   "instances": 1,
   "roster": 26,
   "submitted": 23,
   "late": 1,
   "group": false,
   "judged": 23,
   "gap_ge15": 13,
   "gap_bins": {
    "0–4": 10,
    "5–9": 0,
    "10–14": 0,
    "15–24": 1,
    "25+": 12
   },
   "dim_gap": [
    {
     "id": "lit",
     "label": "照片看得出點陣亮了",
     "gap": 8.7
    },
    {
     "id": "evidence",
     "label": "看得出是自己做的（終端機、程式碼或多張連拍）",
     "gap": 0.4
    }
   ],
   "overrides": 0,
   "rubric": {
    "id": "matrix_photo",
    "version": "1.0.0",
    "title": "W3 我的點陣亮了（上傳照片）（AIoT 智慧裝置實作）",
    "total_points": 100,
    "note": "2026-09-25 洄瀾草擬（草擬後由老師確認）。W3 當堂：SSH 進板子、板上裝 agy、請 AI 寫點陣程式，證據＝點陣亮起來的照片（最多 3 張，不收文字）。評分者依本表打分取平均後對齊 80–100；原始分低於 40 落 60–79。",
    "mode": "llm_assisted",
    "analyzer": "judge_panel",
    "dims": [
     {
      "id": "lit",
      "label": "照片看得出點陣亮了",
      "points": 70,
      "note": "70＝板上 LED 點陣有圖樣或文字在亮（跑馬燈、圖案、單字）；45＝點陣只亮出廠預設或一兩顆、看不出是自己的程式；20＝有板子但點陣沒亮、或只有終端機截圖；0＝沒照片／照片開不了。"
     },
     {
      "id": "evidence",
      "label": "看得出是自己做的（終端機、程式碼或多張連拍）",
      "points": 30,
      "note": "30＝照片或另一張截圖看得到終端機／程式碼／agy 對話，跟點陣畫面對得上；15＝只有一張點陣照片；0＝什麼都看不出。"
     }
    ],
    "disagree_flag": 15,
    "normal_map": {
     "mean": 90,
     "sd": 5,
     "min": 80,
     "max": 100,
     "floor_raw": 40
    }
   },
   "versions": [
    {
     "version": "1.0.0",
     "title": "W3 我的點陣亮了（上傳照片）（AIoT 智慧裝置實作）",
     "note": "2026-09-25 洄瀾草擬（草擬後由老師確認）。W3 當堂：SSH 進板子、板上裝 agy、請 AI 寫點陣程式，證據＝點陣亮起來的照片（最多 3 張，不收文字）。評分者依本表打分取平均後對齊 80–100；原始分低於 40 落 60–79。"
    }
   ]
  },
  {
   "id": "news_check",
   "title": "W2 討論：「AI 會毀滅人類」的新聞，你怎麼判斷？（資訊科技與應用 AB）",
   "version": "1.0.0",
   "mode": "three_aligned",
   "courses": [
    "資訊科技與應用"
   ],
   "instances": 1,
   "roster": 34,
   "submitted": 14,
   "late": 1,
   "group": true,
   "judged": 14,
   "gap_ge15": 4,
   "gap_bins": {
    "0–4": 2,
    "5–9": 5,
    "10–14": 3,
    "15–24": 4,
    "25+": 0
   },
   "dim_gap": [
    {
     "id": "judgment",
     "label": "我的判斷與理由",
     "gap": 3.2
    },
    {
     "id": "counter",
     "label": "反面／較保留的說法",
     "gap": 2.7
    },
    {
     "id": "source",
     "label": "找到新聞並追到源頭",
     "gap": 1.3
    },
    {
     "id": "presentation",
     "label": "呈現、來源標註、AI 與自己的答案分開",
     "gap": 1.0
    },
    {
     "id": "amplified",
     "label": "被放大的那一句",
     "gap": 0.7
    }
   ],
   "overrides": 0,
   "rubric": {
    "id": "news_check",
    "version": "1.0.0",
    "title": "W2 討論：「AI 會毀滅人類」的新聞，你怎麼判斷？（資訊科技與應用 AB）",
    "total_points": 100,
    "note": "2026-09-16 洄瀾讀完 13 份材料後定；作業四步驟＝追源頭／找被放大的那句／查反面說法／下判斷（示範頁 news-check-example.html 五頁）。多為一人代交的小組作業，同組同分。評分者各自打分取平均，再對齊 80–100 常態分布。 2026-09-16 老師 加地板：原始分低於 40 不對齊、按 原始分 線性落在 60–79，且不算進對齊母體的平均／標準差。",
    "mode": "llm_assisted",
    "analyzer": "judge_panel",
    "dims": [
     {
      "id": "source",
      "label": "找到新聞並追到源頭",
      "points": 25,
      "note": "25＝有新聞出處（媒體＋日期／網址）且追到原話出自誰、在哪個場合，追不到就誠實寫追不到；18＝有新聞但源頭只到報導層；10＝只有主題沒有出處；0＝沒做。"
     },
     {
      "id": "amplified",
      "label": "被放大的那一句",
      "points": 20,
      "note": "20＝並列「原話 對 報導寫法」、指出差在哪個字（可能→一定）；14＝指出被放大但沒並列原文；8＝只說標題誇大；0＝沒做。"
     },
     {
      "id": "counter",
      "label": "反面／較保留的說法",
      "points": 20,
      "note": "20＝找到點得進去的反面來源（有名有姓、可查）並說明差在哪；14＝有反面觀點但來源不明；8＝只寫「也有人不同意」；0＝沒做。"
     },
     {
      "id": "judgment",
      "label": "我的判斷與理由",
      "points": 20,
      "note": "20＝有明確立場（信幾分）＋理由對到前三步的證據；14＝有立場、理由泛泛；8＝只有感想；0＝沒有。"
     },
     {
      "id": "presentation",
      "label": "呈現、來源標註、AI 與自己的答案分開",
      "points": 15,
      "note": "15＝結構照四步、來源列得出、分得清哪段是 AI 說的哪段是自己的；10＝結構清楚但來源不全；5＝只有一段文字或純簡報美工；0＝空白。"
     }
    ],
    "disagree_flag": 15,
    "normal_map": {
     "mean": 90,
     "sd": 5,
     "min": 80,
     "max": 100,
     "floor_raw": 40
    }
   },
   "versions": [
    {
     "version": "1.0.0",
     "title": "W2 討論：「AI 會毀滅人類」的新聞，你怎麼判斷？（資訊科技與應用 AB）",
     "note": "2026-09-16 洄瀾讀完 13 份材料後定；作業四步驟＝追源頭／找被放大的那句／查反面說法／下判斷（示範頁 news-check-example.html 五頁）。多為一人代交的小組作業，同組同分。評分者各自打分取平均，再對齊 80–100 常態分布。 2026-09-16 老師 加地板：原始分低於 40 不對齊、按 原始分 線性落在 60–79，且不算進對齊母體的平均／標準差。"
    }
   ]
  },
  {
   "id": "skill_slides_redo",
   "title": "W4 作業：用 skill（UI UX Pro Max）把新聞判斷簡報改版（課堂＋回家合併）（資訊科技與應用 AB）",
   "version": "1.1.0",
   "mode": "three_aligned",
   "courses": [
    "資訊科技與應用"
   ],
   "instances": 1,
   "roster": 34,
   "submitted": 26,
   "late": 0,
   "group": false,
   "judged": 26,
   "gap_ge15": 0,
   "gap_bins": {
    "0–4": 26,
    "5–9": 0,
    "10–14": 0,
    "15–24": 0,
    "25+": 0
   },
   "dim_gap": [
    {
     "id": "changes",
     "label": "線上文字②：改了哪裡",
     "gap": 0.2
    },
    {
     "id": "prompt",
     "label": "線上文字①：用了哪句提示詞",
     "gap": 0.2
    },
    {
     "id": "redesign",
     "label": "看得出改版成形（整份套同一套新版面、沒做壞）",
     "gap": 0.0
    },
    {
     "id": "slides",
     "label": "交了改版後的簡報",
     "gap": 0.0
    }
   ],
   "overrides": 0,
   "rubric": {
    "id": "skill_slides_redo",
    "version": "1.1.0",
    "title": "W4 作業：用 skill（UI UX Pro Max）把新聞判斷簡報改版（課堂＋回家合併）（資訊科技與應用 AB）",
    "total_points": 100,
    "note": "2026-10-09 洄瀾依 26 份實際繳交擬（草擬後由老師確認）。課堂（上傳改版後的新簡報）與回家（改到滿意再交＋線上文字一兩句：用了哪句提示詞、改了哪裡）合併成一份分數：**課堂／回家兩份取較好的那份評**，兩份一樣好取回家（最後交的版本）；回家交同一份、或回家只貼連結指向課堂那份檔，都算「課堂那份已滿意、再交一次」，不扣。設計要點：①改版不比誰漂亮，比有沒有真的改、有沒有交代怎麼改——簡報本身占 70（交了 40＋改版成形 30），作業說明要的線上文字兩項各 15。②簡報內容（新聞四步拆解）W2／W3 已評過，這次不評；換了別則新聞、改成推演情境都不扣。③改版前的原稿不在材料裡，「跟原本差多少」無從比對，不扣；有沒有交代改了什麼由 prompt、changes 兩維評。④不看用了哪個工具、不比美醜。地板照 9/16 定的 原始分低於 40→60–79；交了完整改版簡報的人最低 70，落不到地板。遲交不在本表扣，推簿時照課程既有規則處理。｜2026-10-09 老師 定案（1.1.0）：上限 99（「（英文原話略）」完美不可能）；其餘照 1.0.0（只交課堂那份的人缺兩句說明維持、HTML 簡報 10/09 渲染確認皆為真投影片）。",
    "mode": "llm_assisted",
    "analyzer": "judge_panel",
    "dims": [
     {
      "id": "slides",
      "label": "交了改版後的簡報",
      "points": 40,
      "note": "40＝交了改版後的簡報：5 頁以上、每頁有標題有內容、打得開；HTML、PDF、PPTX、截圖都算。少一兩頁、破一張圖、一頁標題重複這類小瑕疵不扣。25＝只有 2–4 頁，或多頁只有標題沒內容。15＝只交一頁（例如單張投影片截圖）。0＝沒交簡報，或檔案打不開。課堂、回家兩份取較好的那份評。"
     },
     {
      "id": "redesign",
      "label": "看得出改版成形（整份套同一套新版面、沒做壞）",
      "points": 30,
      "note": "30＝整份看得出套了同一套版面：有頁圖時，看配色、標題層次、卡片或圖片版位前後一致；沒有頁圖時，看檔案裡一致的版面結構（分區小標、頁碼、卡片標題、風格名稱、做了兩種風格方案等）；而且沒有做壞的頁。20＝有改但沒改完或做壞了：只有部分頁換了風格、多頁跑版／破圖／文字擠出框、留下空白頁或佔位字。10＝只有一頁看得出新版面（例如只交一張截圖）；或整份是沒有任何版面設計的純文字條列。0＝沒交簡報。不比美醜、不比工具；看不出「跟原稿差多少」不扣（原稿不在材料裡）；課堂與回家兩份相同不扣。"
     },
     {
      "id": "prompt",
      "label": "線上文字①：用了哪句提示詞",
      "points": 15,
      "note": "15＝貼出給 skill／AI 的提示詞原文，一則就夠（作業只要「用了哪句」）；原文看得出叫了 skill，或指定了要改成什麼樣子。8＝沒貼原文，但寫出交代它做了什麼（例：叫它把背景改亮、換成某種風格）。0＝沒寫：線上文字空白、只貼自己檔案的連結，或沒交回家作業。學生自己寫在投影片裡的提示詞也算；AI 自動放在頁首頁尾的風格標示不算學生交代。"
     },
     {
      "id": "changes",
      "label": "線上文字②：改了哪裡",
      "points": 15,
      "note": "15＝寫出改了哪裡，至少點名一項具體改變（換成什麼風格、配色或背景、字級、刪字留重點、版面重排、加了什麼）；提示詞已點名風格、另外再寫一句「改了風格」也算。8＝只貼提示詞、沒另外寫改了哪裡；或只有空泛一句（「改好看了」「有改」）。0＝沒寫（線上文字空白、只貼連結、沒交回家作業）。寫在投影片的改版說明頁也算。"
     }
    ],
    "disagree_flag": 15,
    "normal_map": {
     "mean": 90,
     "sd": 5,
     "min": 80,
     "max": 99,
     "floor_raw": 40
    }
   },
   "versions": [
    {
     "version": "1.0.0",
     "title": "W4 作業：用 skill（UI UX Pro Max）把新聞判斷簡報改版（課堂＋回家合併）（資訊科技與應用 AB）",
     "note": "2026-10-09 洄瀾依 26 份實際繳交擬（草擬後由老師確認）。課堂（上傳改版後的新簡報）與回家（改到滿意再交＋線上文字一兩句：用了哪句提示詞、改了哪裡）合併成一份分數：**課堂／回家兩份取較好的那份評**，兩份一樣好取回家（最後交的版本）；回家交同一份、或回家只貼連結指向課堂那份檔，都算「課堂那份已滿意、再交一次」，不扣。設計要點：①改版不比誰漂亮，比有沒有真的改、有沒有交代怎麼改——簡報本身占 70（交了 40＋改版成形 30），作業說明要的線上文字兩項各 15。②簡報內容（新聞四步拆解）W2／W3 已評過，這次不評；換了別則新聞、改成推演情境都不扣。③改版前的原稿不在材料裡，「跟原本差多少」無從比對，不扣；有沒有交代改了什麼由 prompt、changes 兩維評。④不看用了哪個工具、不比美醜。地板照 9/16 定的 原始分低於 40→60–79；交了完整改版簡報的人最低 70，落不到地板。遲交不在本表扣，推簿時照課程既有規則處理。"
    },
    {
     "version": "1.1.0",
     "title": "W4 作業：用 skill（UI UX Pro Max）把新聞判斷簡報改版（課堂＋回家合併）（資訊科技與應用 AB）",
     "note": "2026-10-09 洄瀾依 26 份實際繳交擬（草擬後由老師確認）。課堂（上傳改版後的新簡報）與回家（改到滿意再交＋線上文字一兩句：用了哪句提示詞、改了哪裡）合併成一份分數：**課堂／回家兩份取較好的那份評**，兩份一樣好取回家（最後交的版本）；回家交同一份、或回家只貼連結指向課堂那份檔，都算「課堂那份已滿意、再交一次」，不扣。設計要點：①改版不比誰漂亮，比有沒有真的改、有沒有交代怎麼改——簡報本身占 70（交了 40＋改版成形 30），作業說明要的線上文字兩項各 15。②簡報內容（新聞四步拆解）W2／W3 已評過，這次不評；換了別則新聞、改成推演情境都不扣。③改版前的原稿不在材料裡，「跟原本差多少」無從比對，不扣；有沒有交代改了什麼由 prompt、changes 兩維評。④不看用了哪個工具、不比美醜。地板照 9/16 定的 原始分低於 40→60–79；交了完整改版簡報的人最低 70，落不到地板。遲交不在本表扣，推簿時照課程既有規則處理。｜2026-10-09 老師 定案（1.1.0）：上限 99（「（英文原話略）」完美不可能）；其餘照 1.0.0（只交課堂那份的人缺兩句說明維持、HTML 簡報 10/09 渲染確認皆為真投影片）。"
    }
   ]
  },
  {
   "id": "tm_three_class",
   "title": "W4 作業：自己選三類，用 Teachable Machine 訓練一個模型，做投影片（人工智慧概論 AB，課堂＋回家合併）",
   "version": "1.1.0",
   "mode": "three_aligned",
   "courses": [
    "人工智慧概論"
   ],
   "instances": 1,
   "roster": 22,
   "submitted": 16,
   "late": 0,
   "group": false,
   "judged": 16,
   "gap_ge15": 0,
   "gap_bins": {
    "0–4": 14,
    "5–9": 1,
    "10–14": 1,
    "15–24": 0,
    "25+": 0
   },
   "dim_gap": [
    {
     "id": "preview",
     "label": "Preview 判類截圖（課堂或回家任一份）",
     "gap": 0.3
    },
    {
     "id": "reason",
     "label": "投影片③：判錯的原因",
     "gap": 0.3
    },
    {
     "id": "results",
     "label": "投影片②：測試結果，判對、判錯各一張",
     "gap": 0.3
    },
    {
     "id": "setup",
     "label": "投影片①：選了哪三類、每類幾張、參數怎麼設",
     "gap": 0.0
    },
    {
     "id": "tm_file",
     "label": ".tm 專案檔（課堂或回家任一份）",
     "gap": 0.0
    }
   ],
   "overrides": 0,
   "rubric": {
    "id": "tm_three_class",
    "version": "1.1.0",
    "title": "W4 作業：自己選三類，用 Teachable Machine 訓練一個模型，做投影片（人工智慧概論 AB，課堂＋回家合併）",
    "total_points": 100,
    "note": "依 16 份實際繳交擬（課堂＋回家合併夾，全讀；圖片總表與 PDF 頁圖全看）。回家作業交三樣：.tm 專案檔、一張沒用來訓練的測試圖的 Preview 截圖、投影片（三類與每類張數、參數、判對判錯各一張、判錯原因）。作業說明寫「已經交過課堂那份的同學：補傳投影片就好，前兩樣不用重交」，所以前兩維課堂或回家任一份有就算。投影片內容占 70（三維），因為那是回家作業新增的部分；只交課堂那份、沒有投影片的人，最高 30，照地板落 60–79。改參數、補資料是「可以做」不是必做，沒做不扣。投影片格式（PDF／PPTX／Word／圖片）與美觀都不計分。｜2026-10-09 老師 定案（1.1.0）：上限 99（「（英文原話略）」完美不可能）；三類沿用課堂圖片包不扣。",
    "mode": "llm_assisted",
    "analyzer": "judge_panel",
    "dims": [
     {
      "id": "tm_file",
      "label": ".tm 專案檔（課堂或回家任一份）",
      "points": 15,
      "note": "15＝課堂或回家至少交了一個 .tm 檔。5＝兩份都沒有 .tm，但截圖看得出模型確實訓練過（三個類別、Model Trained）。0＝沒有 .tm、也沒有看得出訓練過的截圖。"
     },
     {
      "id": "preview",
      "label": "Preview 判類截圖（課堂或回家任一份）",
      "points": 15,
      "note": "15＝有一張 Preview 截圖，看得到測試圖和各類的判斷結果（長條或百分比）；單獨的截圖檔、或放在投影片裡的 Preview 畫面都算。8＝有截圖，但只看得到一半：看得到結果卻看不到測試圖、或看得到圖卻沒有判斷結果、或只截了訓練畫面沒有 Preview；只交測試圖檔本身、沒有 Preview 畫面也算這級。0＝沒有任何截圖。"
     },
     {
      "id": "setup",
      "label": "投影片①：選了哪三類、每類幾張、參數怎麼設",
      "points": 25,
      "note": "25＝投影片寫出三件事：三類是什麼（自己選的、不是人臉）、每類幾張、參數（Epochs、Batch Size、Learning Rate 寫出數字，或寫「都用預設值」也算）。參數只寫兩個不扣。20＝三類、張數、參數少寫一件（張數或參數），而那件在交的截圖裡看得到（投影片裡的或另外上傳的截圖都算）。12＝少一件且截圖裡也看不出；或三件只在投影片的截圖裡看得到、文字完全沒寫。5＝只寫了類別名稱，或只有一行參數。0＝沒有投影片。用了真人的臉：最多 12，並列 。（老師 2026-10-09：三類沿用課堂圖片包也算，不扣分。）"
     },
     {
      "id": "results",
      "label": "投影片②：測試結果，判對、判錯各一張",
      "points": 25,
      "note": "25＝判對一張、判錯一張都放了，而且看得到結果（Preview 畫面、或寫出各類信心度數字）。15＝只有其中一種（例如只放判對的；另外上傳的 Preview 截圖也可以當那一張）；或兩種都只用文字描述、沒有畫面也沒有數字但有說是哪張圖判成哪類；或誠實寫「試了幾張較難的圖都判對、沒測出判錯」並附判對畫面。8＝只寫一句籠統結果（例如「判對幾張、判錯幾張」），或只有一個看不出判對判錯的結果。0＝沒有測試結果。"
     },
     {
      "id": "reason",
      "label": "投影片③：判錯的原因",
      "points": 20,
      "note": "20＝針對那張判錯的圖講出具體原因：點出是哪個特徵讓模型混淆（背景、形狀與顏色、角度、外觀相似的部位、哪一類資料太少或太單一），或做了改參數、補資料的實驗來檢查自己的猜測。12＝原因籠統（只說「資料不夠」「圖片不一樣」），或寫「不太確定」但交代了自己試過什麼。8＝沒測出判錯，但寫了試過哪些較難的圖、結果仍判對。5＝只有一句看不出意思的話。0＝沒寫；或沒有判錯例子、也沒有任何說明。"
     }
    ],
    "disagree_flag": 15,
    "normal_map": {
     "mean": 90,
     "sd": 5,
     "min": 80,
     "max": 99,
     "floor_raw": 40
    }
   },
   "versions": [
    {
     "version": "1.0.0",
     "title": "W4 作業：自己選三類，用 Teachable Machine 訓練一個模型，做投影片（人工智慧概論 AB，課堂＋回家合併）",
     "note": "依 16 份實際繳交擬（課堂＋回家合併夾，全讀；圖片總表與 PDF 頁圖全看）。回家作業交三樣：.tm 專案檔、一張沒用來訓練的測試圖的 Preview 截圖、投影片（三類與每類張數、參數、判對判錯各一張、判錯原因）。作業說明寫「已經交過課堂那份的同學：補傳投影片就好，前兩樣不用重交」，所以前兩維課堂或回家任一份有就算。投影片內容占 70（三維），因為那是回家作業新增的部分；只交課堂那份、沒有投影片的人，最高 30，照地板落 60–79。改參數、補資料是「可以做」不是必做，沒做不扣。投影片格式（PDF／PPTX／Word／圖片）與美觀都不計分。"
    },
    {
     "version": "1.1.0",
     "title": "W4 作業：自己選三類，用 Teachable Machine 訓練一個模型，做投影片（人工智慧概論 AB，課堂＋回家合併）",
     "note": "依 16 份實際繳交擬（課堂＋回家合併夾，全讀；圖片總表與 PDF 頁圖全看）。回家作業交三樣：.tm 專案檔、一張沒用來訓練的測試圖的 Preview 截圖、投影片（三類與每類張數、參數、判對判錯各一張、判錯原因）。作業說明寫「已經交過課堂那份的同學：補傳投影片就好，前兩樣不用重交」，所以前兩維課堂或回家任一份有就算。投影片內容占 70（三維），因為那是回家作業新增的部分；只交課堂那份、沒有投影片的人，最高 30，照地板落 60–79。改參數、補資料是「可以做」不是必做，沒做不扣。投影片格式（PDF／PPTX／Word／圖片）與美觀都不計分。｜2026-10-09 老師 定案（1.1.0）：上限 99（「（英文原話略）」完美不可能）；三類沿用課堂圖片包不扣。"
    }
   ]
  },
  {
   "id": "wokwi_led_blink",
   "title": "W2 一顆 LED 的亮與滅（交 Wokwi 連結）（創客入門）",
   "version": "1.0.0",
   "mode": "program",
   "courses": [
    "創客入門"
   ],
   "instances": 1,
   "roster": 23,
   "submitted": 23,
   "late": 0,
   "group": false,
   "judged": 0,
   "gap_ge15": 0,
   "gap_bins": {
    "0–4": 0,
    "5–9": 0,
    "10–14": 0,
    "15–24": 0,
    "25+": 0
   },
   "dim_gap": [],
   "overrides": 0,
   "rubric": {
    "id": "wokwi_led_blink",
    "version": "1.0.0",
    "title": "W2 一顆 LED 的亮與滅（交 Wokwi 連結）（創客入門）",
    "total_points": 100,
    "note": "2026-09-16 定；全部由 抓公開專案的 與 判定，不靠人看。作業要求：ESP32＋一顆 LED＋220Ω 電阻，LED 長腳接 GPIO、短腳經電阻到 GND，按播放會一亮一滅；交自己的專案連結。 2026-09-16 老師：全對就 100，改用 原始分、不對齊。",
    "mode": "deterministic",
    "analyzer": "wokwi_led",
    "dims": [
     {
      "id": "link",
      "label": "交了自己的 Wokwi 專案連結",
      "points": 20,
      "note": "20＝連結有效、非老師示範專案；10＝連結壞掉或只交截圖；0＝沒交。"
     },
     {
      "id": "parts",
      "label": "零件：板子＋LED＋電阻",
      "points": 20,
      "note": "20＝三樣都有；12＝缺電阻；6＝只有板子；0＝空專案。"
     },
     {
      "id": "wiring",
      "label": "接線：LED 一端到 GPIO、另一端經電阻到 GND",
      "points": 25,
      "note": "25＝完整迴路；15＝LED 接了 GPIO 但沒經電阻或沒到 GND；8＝有線但接不成迴路；0＝沒接線。"
     },
     {
      "id": "code",
      "label": "程式會閃（設腳位＋切換＋延時＋迴圈）",
      "points": 25,
      "note": "25＝四件都有；15＝缺延時或迴圈（亮一次就停）；8＝有程式但沒動 LED；0＝空白程式。"
     },
     {
      "id": "extra",
      "label": "多做：第二個專案（按鈕／多燈）或自己的變化",
      "points": 10,
      "note": "10＝第二個專案且能跑（有按鈕或多顆 LED）；5＝第二個專案但跟第一個一樣；0＝只有一個。"
     }
    ],
    "disagree_flag": null,
    "normal_map": {}
   },
   "versions": [
    {
     "version": "1.0.0",
     "title": "W2 一顆 LED 的亮與滅（交 Wokwi 連結）（創客入門）",
     "note": "2026-09-16 定；全部由 抓公開專案的 與 判定，不靠人看。作業要求：ESP32＋一顆 LED＋220Ω 電阻，LED 長腳接 GPIO、短腳經電阻到 GND，按播放會一亮一滅；交自己的專案連結。 2026-09-16 老師：全對就 100，改用 原始分、不對齊。"
    }
   ]
  },
  {
   "id": "wokwi_rhythm",
   "title": "W3 我的閃爍節奏（交 Wokwi 連結）（創客入門）",
   "version": "1.0.0",
   "mode": "program",
   "courses": [
    "創客入門"
   ],
   "instances": 1,
   "roster": 23,
   "submitted": 4,
   "late": 0,
   "group": false,
   "judged": 0,
   "gap_ge15": 0,
   "gap_bins": {
    "0–4": 0,
    "5–9": 0,
    "10–14": 0,
    "15–24": 0,
    "25+": 0
   },
   "dim_gap": [],
   "overrides": 0,
   "rubric": {
    "id": "wokwi_rhythm",
    "version": "1.0.0",
    "title": "W3 我的閃爍節奏（交 Wokwi 連結）（創客入門）",
    "total_points": 100,
    "note": "2026-09-25 洄瀾草擬（草擬後由老師確認）。W3 當堂：從上週的燈出發，加 print、改 wait／、for 數幾次、if 快慢——交自己的 Wokwi 專案連結（存不了的交截圖＋貼程式）。前四維沿用 W2 的 判定（板子＋LED＋電阻＋迴路＋會閃）；第五維「節奏」看 ：有兩種以上等待時間、或 for／if 控制節奏＝有做今天的事。清單型作業：全對就是 100，不做常態對齊。",
    "mode": "deterministic",
    "analyzer": "wokwi_led",
    "dims": [
     {
      "id": "link",
      "label": "交了自己的 Wokwi 專案連結",
      "points": 20,
      "note": "20＝連結有效、非老師示範專案；10＝連結壞掉或只交截圖；0＝沒交。"
     },
     {
      "id": "parts",
      "label": "零件：板子＋LED＋電阻",
      "points": 20,
      "note": "20＝三樣都有；12＝缺電阻；6＝只有板子；0＝空專案。"
     },
     {
      "id": "wiring",
      "label": "接線：LED 到 GPIO、另一端經電阻到 GND",
      "points": 25,
      "note": "25＝完整迴路；15＝接了 GPIO 但沒經電阻或沒到 GND；8＝有線但接不成迴路；0＝沒接線。"
     },
     {
      "id": "code",
      "label": "程式會閃（設腳位＋切換＋延時＋迴圈）",
      "points": 25,
      "note": "25＝四件都有；15＝缺延時或迴圈；8＝有程式但沒動 LED；0＝空白程式。"
     },
     {
      "id": "rhythm",
      "label": "節奏：有自己的變化（兩種等待時間、for 數幾次、if 快慢、print 亮滅）",
      "points": 10,
      "note": "10＝程式有 ≥2 種等待時間、或 for／if 控制節奏、或加了 print('亮')／print('滅')；5＝程式跟示範 blink-v0 一樣只改了數字；0＝沒有程式或沒動燈。"
     }
    ],
    "disagree_flag": null,
    "normal_map": {}
   },
   "versions": [
    {
     "version": "1.0.0",
     "title": "W3 我的閃爍節奏（交 Wokwi 連結）（創客入門）",
     "note": "2026-09-25 洄瀾草擬（草擬後由老師確認）。W3 當堂：從上週的燈出發，加 print、改 wait／、for 數幾次、if 快慢——交自己的 Wokwi 專案連結（存不了的交截圖＋貼程式）。前四維沿用 W2 的 判定（板子＋LED＋電阻＋迴路＋會閃）；第五維「節奏」看 ：有兩種以上等待時間、或 for／if 控制節奏＝有做今天的事。清單型作業：全對就是 100，不做常態對齊。"
    }
   ]
  },
  {
   "id": "wokwi_traffic_latch",
   "title": "W3 回家作業：紅綠燈＋閂鎖去彈跳（交投影片 PDF＋Wokwi 連結）（創客入門",
   "version": "1.0.0",
   "mode": "three_raw",
   "courses": [
    "創客入門"
   ],
   "instances": 1,
   "roster": 23,
   "submitted": 16,
   "late": 1,
   "group": false,
   "judged": 16,
   "gap_ge15": 5,
   "gap_bins": {
    "0–4": 7,
    "5–9": 2,
    "10–14": 2,
    "15–24": 3,
    "25+": 2
   },
   "dim_gap": [
    {
     "id": "p2_latch",
     "label": "專案二 閂鎖去彈跳：兩顆 NAND 閂鎖＋證明擋住了＋投影片",
     "gap": 6.2
    },
    {
     "id": "p1_traffic",
     "label": "專案一 紅綠燈：Wokwi 專案＋投影片三件事",
     "gap": 1.2
    },
    {
     "id": "q2_no_bounce",
     "label": "必答二：閂鎖為什麼不會抖",
     "gap": 0.6
    },
    {
     "id": "q1_three_pin",
     "label": "必答一：SR 閂鎖為什麼要接三腳的開關、兩腳的按鈕行不行",
     "gap": 0.3
    },
    {
     "id": "problems",
     "label": "遇到的問題",
     "gap": 0.0
    }
   ],
   "overrides": 0,
   "rubric": {
    "id": "wokwi_traffic_latch",
    "version": "1.0.0",
    "title": "W3 回家作業：紅綠燈＋閂鎖去彈跳（交投影片 PDF＋Wokwi 連結）（創客入門",
    "total_points": 100,
    "note": "16 份全讀後定。四維、每維三級（全有／有做但缺／沒做），對應作業說明的四塊：專案一、專案二、兩題必答、遇到的問題。不用 的 ：它的零件／接線／程式維度寫死成 W2 一顆 LED 的規格，閂鎖專案沒有 LED、程式用 不用 sleep，會被誤判成不及格；只交紅綠燈的人反而前四維滿分。 只拿來抓 ／／updated 當證據。電阻、燈的輪法與秒數、多做的功能都不計分（作業說明沒要求）。",
    "mode": "llm_assisted",
    "analyzer": "judge_panel",
    "dims": [
     {
      "id": "p1_traffic",
      "label": "專案一 紅綠燈：Wokwi 專案＋投影片三件事",
      "points": 30,
      "note": "30＝線上文字有紅綠燈的 Wokwi 連結、專案裡紅黃綠三顆燈會輪流亮，而且投影片講了三件事：它做什麼、電路與程式重點、跑起來的截圖（看得出在跑：燈亮著、計時器在走，或序列埠有輸出）。20＝有做但缺：專案在，但投影片三件事少一件以上——含只有「［待填］」這類佔位字、截圖只有靜態電路圖或還沒按播放的編輯畫面、畫出來的時序圖代替模擬截圖、整份沒交投影片。0＝沒交紅綠燈專案。輪法、秒數、一次亮幾顆、有沒有電阻、多加的燈或按鈕都不管。"
     },
     {
      "id": "p2_latch",
      "label": "專案二 閂鎖去彈跳：兩顆 NAND 閂鎖＋證明擋住了＋投影片",
      "points": 40,
      "note": "40＝Wokwi 裡有兩顆 NAND 接成的閂鎖，投影片講了做什麼、電路與程式重點，而且有學生自己跑出來的結果：序列埠或截圖上的數字（例：直接接變 3 次、經過閂鎖變 1 次；或閂鎖輸出每撥一次只加 1）。輸入用三腳撥動開關（實驗台起點）＝達標，不因作業標題寫「一顆按鈕」扣分；用兩腳按鈕做、照實寫「還是會抖」並講出原因，也算 40；照實寫「Wokwi 這幾撥沒抖」也行，但要附自己跑的畫面或數字。看的是投影片上的結果，不是程式裡有沒有計數的寫法。25＝閂鎖有接，但證據不足：只有開關兩種狀態的截圖、只有理論說明或自己畫的波形圖、跑起來那頁是佔位字、序列埠只有一行看不出次數，或投影片缺做什麼／電路程式重點。0＝沒有閂鎖專案；交的連結裡沒有兩顆 NAND（例：拿另一個紅綠燈頂替）。用實驗台起點的電路或程式不扣（作業說明寫「實驗台裡有起點」；要不要扣見 待討論）。"
     },
     {
      "id": "q1_three_pin",
      "label": "必答一：SR 閂鎖為什麼要接三腳的開關、兩腳的按鈕行不行",
      "points": 10,
      "note": "10＝兩個要點都有：(a) 閂鎖要兩個分開的輸入（S̄、R̄），三腳開關的兩個接點各接一邊、一次只碰一邊；(b) 兩腳按鈕只有一個接點，直接接不行。答「要再加一顆按鈕」「兩顆按鈕可以、一顆不行」「要 ESP32 幫忙給另一邊」都算 (b) 對。5＝只講到其中一點；或結論對但理由錯（例：「按鈕鬆開會懸空」「按鈕斷開就會彈跳所以不行」）；或只有一句沒有理由。0＝沒答、只有題目或佔位字。學生把這題拆成兩小題寫的，合起來看。"
     },
     {
      "id": "q2_no_bounce",
      "label": "必答二：閂鎖為什麼不會抖",
      "points": 10,
      "note": "10＝講出「第一次碰到就把狀態設好，之後的彈跳改不了它」，而且理由裡至少有一個：兩邊都是 1 時是保持狀態／彈回來只是重複設定同一個值／碰不到另一邊所以翻不回去。5＝只說「會記住第一次」「輸出維持」，沒講為什麼彈跳改不了它。0＝沒答。把題目當標題、下面答的是別題的，算沒答。"
     },
     {
      "id": "problems",
      "label": "遇到的問題",
      "points": 10,
      "note": "10＝寫出具體卡在哪（哪裡接錯、哪個不懂、怎麼解），或誠實寫哪個專案沒做到、哪裡不會。5＝只有一句空泛的話（例：「不熟」「第一次接觸、慢慢來」）。0＝沒有。不一定要在最後一頁，有標出來就算；把「最後一頁寫遇到的問題」連同題目貼成標題、卻沒寫內容＝0。"
     }
    ],
    "disagree_flag": 15,
    "normal_map": {}
   },
   "versions": [
    {
     "version": "1.0.0",
     "title": "W3 回家作業：紅綠燈＋閂鎖去彈跳（交投影片 PDF＋Wokwi 連結）（創客入門",
     "note": "16 份全讀後定。四維、每維三級（全有／有做但缺／沒做），對應作業說明的四塊：專案一、專案二、兩題必答、遇到的問題。不用 的 ：它的零件／接線／程式維度寫死成 W2 一顆 LED 的規格，閂鎖專案沒有 LED、程式用 不用 sleep，會被誤判成不及格；只交紅綠燈的人反而前四維滿分。 只拿來抓 ／／updated 當證據。電阻、燈的輪法與秒數、多做的功能都不計分（作業說明沒要求）。"
    }
   ]
  },
  {
   "id": "wokwi_traffic_modes",
   "title": "W4 回家作業：紅綠燈自動／手動模式（Timer＋Pin.irq＋去彈跳，交 Wokwi 連結＋三句說明）（創客入門）",
   "version": "1.1.0",
   "mode": "three_raw",
   "courses": [
    "創客入門"
   ],
   "instances": 1,
   "roster": 23,
   "submitted": 14,
   "late": 0,
   "group": false,
   "judged": 14,
   "gap_ge15": 1,
   "gap_bins": {
    "0–4": 10,
    "5–9": 2,
    "10–14": 1,
    "15–24": 1,
    "25+": 0
   },
   "dim_gap": [
    {
     "id": "proof",
     "label": "線上文字第三句：怎麼證明沒有漏按",
     "gap": 1.0
    },
    {
     "id": "explain",
     "label": "線上文字前兩句：怎麼切換模式、計時器和中斷各做什麼",
     "gap": 0.5
    },
    {
     "id": "modes",
     "label": "兩種模式：自動自己輪、手動按一下換燈、兩者能切換",
     "gap": 0.5
    },
    {
     "id": "debounce_nosleep",
     "label": "規定二：按鈕去彈跳＋主程式不用 sleep 等燈",
     "gap": 0.3
    },
    {
     "id": "timer_irq",
     "label": "規定一：燈的時間交給 machine.Timer、按鈕交給 Pin.irq",
     "gap": 0.0
    }
   ],
   "overrides": 1,
   "rubric": {
    "id": "wokwi_traffic_modes",
    "version": "1.1.0",
    "title": "W4 回家作業：紅綠燈自動／手動模式（Timer＋Pin.irq＋去彈跳，交 Wokwi 連結＋三句說明）（創客入門）",
    "total_points": 100,
    "note": "依 14 份實際繳交全讀後擬：線上文字全讀、 抓回每份 Wokwi 現況的 ／ 逐份讀程式、序列埠截圖與多交的投影片頁圖都看過。五維對應作業說明的五件事：兩種模式（功能）、Timer 管燈＋Pin.irq 管按鈕（規定一）、去彈跳＋主程式不 sleep 等燈（規定二）、三句說明的前兩句、第三句「怎麼證明沒有漏按」。第三句單獨成一維，因為它是全班差最多的地方：多數人寫的是設計理由（用中斷所以不會漏），少數人真的做了計數比對。不用 的 （它的零件／接線／程式維度寫死成 W2 一顆 LED 閃爍的規格）， 只拿來抓程式與電路當證據。電阻、燈的輪法與秒數、切換用長按還是另一顆鍵、多加的顯示器或燈都不計分（作業說明寫「自己設計」或沒要求）。｜2026-10-09 老師 定案（1.1.0）：上限 99（「（英文原話略）」完美不可能）；proof 放寬（程式有印次數＝實測證明）；沒用中斷 60 照給（老師「（英文原話略）」）。",
    "mode": "llm_assisted",
    "analyzer": "judge_panel",
    "dims": [
     {
      "id": "modes",
      "label": "兩種模式：自動自己輪、手動按一下換燈、兩者能切換",
      "points": 30,
      "note": "30＝Wokwi 專案（或存不了檔時的截圖）裡三件事都有：自動模式燈會自己輪；手動模式按鈕按一下就換燈；兩種模式能互相切換（另一顆模式鍵、同一顆鍵長按／短按、按換燈鍵就進手動再用另一招回自動，都算）。20＝兩種模式都有，但缺一角：只能單向切換回不去；手動模式按了不是換燈（例如只是閃一下、或要等計時器才換）；或從程式看得出其中一個模式跑不起來。15＝只做出一種：燈會自己輪，按鈕只是讓它提早跳下一燈、計時器照走，沒有停住的手動模式，也沒有模式切換；或只有手動、沒有自動。0＝沒有 Wokwi 連結也沒有截圖，或連結裡不是紅綠燈加按鈕。"
     },
     {
      "id": "timer_irq",
      "label": "規定一：燈的時間交給 machine.Timer、按鈕交給 Pin.irq",
      "points": 25,
      "note": "25＝程式裡兩件都做到：燈亮多久由 machine.Timer 決定（ONE_SHOT 每顆燈各設時間；或 PERIODIC 固定節拍、由 callback 或主迴圈依節拍數格子倒數，都算），按鈕用 Pin.irq 接中斷。15＝只做到一件：例如按鈕在主迴圈裡一直讀 value() 輪詢、沒有 Pin.irq；或燈的時間全靠 比較、Timer 宣告了卻沒有在推進燈。5＝兩件都沒用，但線上文字誠實寫出沒用到或卡在哪。0＝兩件都沒有，也沒說明。"
     },
     {
      "id": "debounce_nosleep",
      "label": "規定二：按鈕去彈跳＋主程式不用 sleep 等燈",
      "points": 15,
      "note": "15＝兩件都做到：按鈕有去彈跳（中斷裡用 擋掉時間窗內的邊緣、中斷後啟動一次性 Timer 再確認、按住期間忽略重複邊緣、放開後穩定一段時間才算放開，都算）；主迴圈不用 sleep 等燈（while True: pass、machine.idle()、或 (1)～幾十毫秒只為輪詢或省電、燈的時間仍由 Timer 管，都不算「sleep 等燈」）。8＝只做到一件（沒有去彈跳；或主迴圈用 sleep 撐燈亮的時間）。0＝兩件都沒有。"
     },
     {
      "id": "explain",
      "label": "線上文字前兩句：怎麼切換模式、計時器和中斷各做什麼",
      "points": 15,
      "note": "15＝兩句都有、講得具體、和程式對得上：怎麼切換（哪顆鈕、長按還是短按、從哪個模式切到哪個）＋計時器管什麼、中斷管什麼。很短但指得出是哪顆鈕也算具體。10＝兩句都有，但其中一句籠統或只講一半（例如只講 Timer 沒講 Pin.irq；切換那句其實沒講到模式；把計時器回呼也叫中斷、按鈕怎麼處理沒交代）。5＝只有一句，或只有關鍵字。0＝沒寫。"
     },
     {
      "id": "proof",
      "label": "線上文字第三句：怎麼證明沒有漏按",
      "points": 15,
      "note": "15＝有實際跑出來的結果，並說明怎麼看：序列埠截圖或文字寫出實際數字（例：連按 N 次，「收到」與「處理」兩個計數都是 N；按鍵編號連續、沒有跳號），再加一句這怎麼表示沒漏。10＝寫了做得到的檢查方法或計數機制（序列埠印第幾次按、比對收到次數與處理次數、快速連按看燈是不是每次都換），但沒附結果；或只附了有計數的序列埠截圖、文字沒寫怎麼看。5＝只用設計理由說「不會漏」（例：主程式沒 sleep、用中斷所以即時、有去彈跳所以不會重複），沒有任何檢查方法；或答成去彈跳怎麼做（那是防「多算」，不是防「漏按」）。0＝沒寫。（老師 2026-10-09 寬鬆：程式裡有印出按鍵／觸發次數，也算實測證明、給滿。）"
     }
    ],
    "disagree_flag": 15,
    "normal_map": {
     "max": 99
    }
   },
   "versions": [
    {
     "version": "1.0.0",
     "title": "W4 回家作業：紅綠燈自動／手動模式（Timer＋Pin.irq＋去彈跳，交 Wokwi 連結＋三句說明）（創客入門）",
     "note": "依 14 份實際繳交全讀後擬：線上文字全讀、 抓回每份 Wokwi 現況的 ／ 逐份讀程式、序列埠截圖與多交的投影片頁圖都看過。五維對應作業說明的五件事：兩種模式（功能）、Timer 管燈＋Pin.irq 管按鈕（規定一）、去彈跳＋主程式不 sleep 等燈（規定二）、三句說明的前兩句、第三句「怎麼證明沒有漏按」。第三句單獨成一維，因為它是全班差最多的地方：多數人寫的是設計理由（用中斷所以不會漏），少數人真的做了計數比對。不用 的 （它的零件／接線／程式維度寫死成 W2 一顆 LED 閃爍的規格）， 只拿來抓程式與電路當證據。電阻、燈的輪法與秒數、切換用長按還是另一顆鍵、多加的顯示器或燈都不計分（作業說明寫「自己設計」或沒要求）。"
    },
    {
     "version": "1.1.0",
     "title": "W4 回家作業：紅綠燈自動／手動模式（Timer＋Pin.irq＋去彈跳，交 Wokwi 連結＋三句說明）（創客入門）",
     "note": "依 14 份實際繳交全讀後擬：線上文字全讀、 抓回每份 Wokwi 現況的 ／ 逐份讀程式、序列埠截圖與多交的投影片頁圖都看過。五維對應作業說明的五件事：兩種模式（功能）、Timer 管燈＋Pin.irq 管按鈕（規定一）、去彈跳＋主程式不 sleep 等燈（規定二）、三句說明的前兩句、第三句「怎麼證明沒有漏按」。第三句單獨成一維，因為它是全班差最多的地方：多數人寫的是設計理由（用中斷所以不會漏），少數人真的做了計數比對。不用 的 （它的零件／接線／程式維度寫死成 W2 一顆 LED 閃爍的規格）， 只拿來抓程式與電路當證據。電阻、燈的輪法與秒數、切換用長按還是另一顆鍵、多加的顯示器或燈都不計分（作業說明寫「自己設計」或沒要求）。｜2026-10-09 老師 定案（1.1.0）：上限 99（「（英文原話略）」完美不可能）；proof 放寬（程式有印次數＝實測證明）；沒用中斷 60 照給（老師「（英文原話略）」）。"
    }
   ]
  }
 ]
};
