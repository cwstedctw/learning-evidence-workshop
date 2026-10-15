# 分兩次貼，人工三份先做

**合成示範、不是學生作答**。先請AI印出本包完整路徑，下面【participant完整路徑】填participant資料夾，【成果完整路徑】填自己的可寫成果資料夾。先保存人工三份，再貼第一段。

## 1. AI依原文先試評

```text
這是合成完成度試評，不是正式成績。只讀【participant完整路徑】/RUBRIC.md、rubric.json及data/submissions-10.csv，不讀tools、instructor、人工表或既有output。
CSV第一行是標頭，不跳過；10份同週DEMO-W01，只用五區原文判斷。每區0或20分，有寫即完成，不因收穫空泛扣分；AI揭露否算完成，勾多項不加分。不含遲交、學期換算，不做80–99對齊。
先逐份列五區是否完成、各引用一段原文或註明留空，再給五區分數與加總。格式不合法或沒把握先標待確認，不猜分；先停下問我，不產生含非數字的評分CSV。
全部能判斷時，在【成果完整路徑】/ai-scores.csv保存以下欄位，順序固定：record_id,pre_score,reflection_score,facets_score,ai_score,message_score,practice_total100。只能是數字，不放公式或文字理由。另將逐區證據和不確定處存ai-evidence.md。
不要替我填教師final_score或判斷，不上傳。請回讀檔案核對代號與筆數。
```

15份選做：把檔名改submissions-15.csv、份數改15；原始文字沒有附完成度答案。公開repo仍可能找到講師參考，指令限制不是真正隔離。

## 2. 請AI代跑加總與比較

```text
人工三份與AI試評都保存了。請先檢查本機是否有可用Python，不安裝任何套件。若沒有，就告訴我改用RUBRIC.md人工加總，標未做程式核對。
有Python時，請用工具執行：
python "【participant完整路徑】/tools/grade.py" --count 10 --input "【participant完整路徑】/data/submissions-10.csv" --compare "【成果完整路徑】/ai-scores.csv" --out-dir "【成果完整路徑】/program-round-1"
15份版把count和檔名一起改15。輸出目錄要用新的，不覆寫上一輪。
執行失敗先回報錯誤與實際狀態，不改原始資料湊通過，不把工具失敗說成成功。成功時回讀scores.csv、differences.csv與run.json，列出差異；不要用AI試評蓋掉程式結果，也不要幫我填教師決定。
```

教師再自己填採用／改分／待確認與理由。比較是教學練習，不是正式信度檢驗。單週10／15份不能推論跨週進步。
