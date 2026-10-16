# 可以整句貼給 AI 助手的話（跟網頁 practice.html 同一套）

**合成示範、不是學生作答**。約定兩件事：**工作資料夾＝解壓出來的這個資料夾**（在 AI 助手「開啟資料夾」選它）；**你的成果都放它底下的 `my-results`**。這樣每一句都不用改路徑，整段複製就能貼。【】裡的換成你自己的數字跟話。

## 第 0 步｜探測一句

```text
請印出目前工作資料夾的完整路徑，確認是我選的那一個；再列出這個資料夾第一層的檔案與子資料夾。然後只在這裡新建 write-test.md，內容寫「工作坊寫入測試」；不要改其他檔、不安裝軟體、不上傳到任何地方。
```

應該看到：路徑跟你解壓的位置一樣，第一層直接有 `RUBRIC.md`、`data`、`submissions`、`templates`、`tools`；自己打開 `write-test.md` 看到那行字。

## 第 1 步｜建成果資料夾，自己先評三份（S01、S06、S10）

```text
請在目前工作資料夾裡新建子資料夾 my-results，把 templates/manual-first.csv 和 templates/teacher-review.csv 複製進去（內容一個字都不要改），然後印出 my-results 裡的檔案清單。
```

然後不要用 AI：讀 `RUBRIC.md`，打開 `submissions/` 的 S01、S06、S10 自己評（五區各 0 或 20）。評好用下面這句請 AI 寫進表（不要自己用 Excel 開 CSV，存檔會改掉編碼，第 3 步程式會拒收）：

```text
我自己評完三份了。請把下面的分數寫進 my-results/manual-first.csv 對應的列，其他列與欄位名稱都不要動，理由照我的原話、不要潤飾：
DEMO-W01-S01：課前【】、收穫【】、六面向【】、AI 揭露【】、給講者的話【】、總分【】、判斷【】、理由【】
DEMO-W01-S06：課前【】、收穫【】、六面向【】、AI 揭露【】、給講者的話【】、總分【】、判斷【】、理由【】
DEMO-W01-S10：課前【】、收穫【】、六面向【】、AI 揭露【】、給講者的話【】、總分【】、判斷【】、理由【】
寫完請把這個檔的內容原樣印給我看。
```

## 第 2 步｜提示詞 A：AI 依原文先試評（10 份）

```text
這是合成完成度試評，不是正式成績。只讀目前工作資料夾裡的 RUBRIC.md、rubric.json 和 data/submissions-10.csv；不要讀 tools、instructor、my-results 或任何既有輸出。
CSV 第一行就是標頭，不要跳過。10 份都是同一週 DEMO-W01，只用五區原文判斷。每區 0 或 20 分：有寫就算完成，不因內容空泛扣分；AI 揭露填「否」算完成；六面向勾多項不加分。不含遲交、不做學期換算、不做 80–99 對齊。
請先逐份列出五區各自「有寫／留空」，每一區引一小段原文或註明留空；再給五區分數與加總。格式不合法或你沒把握的，先標「待確認」停下來問我，不要猜分，也不要產生含非數字的分數檔。
全部能判斷之後，把結果存成 my-results/ai-scores.csv，欄位順序固定：record_id,pre_score,reflection_score,facets_score,ai_score,message_score,practice_total100，每格只能是數字，不放公式或文字。逐區證據與不確定處另存 my-results/ai-evidence.md。
不要替我填教師的 final_score 或決定，不上傳到任何地方。存完請讀回兩個檔，核對代號與筆數。
```

應該看到：`ai-scores.csv` 10 列、每格只有 0 或 20、總分＝五區相加，沒有文字或公式；`ai-evidence.md` 每份都引了原文。

## 第 3 步｜提示詞 B：請 AI 代跑加總與比對

```text
人工三份與 AI 試評都保存在 my-results 了。請先檢查這台電腦有沒有可用的 Python（試 python --version 或 python3 --version），不要安裝任何東西。沒有的話就告訴我，我會改用 RUBRIC.md 人工加總，並標「未做程式核對」。
有 Python 時，在目前工作資料夾執行：
python tools/grade.py --count 10 --input data/submissions-10.csv --compare my-results/ai-scores.csv --out-dir my-results/program-round-1
（python 不行就改 python3。）輸出資料夾要用新的，不覆寫上一輪。
執行失敗就把錯誤訊息原樣給我看，不要改原始資料湊通過，也不要把失敗說成成功。成功時讀回 my-results/program-round-1 裡的 scores.csv、differences.csv 和 run.json，用表格列出每一處差異（代號、欄位、程式值、AI 值）；不要用 AI 試評蓋掉程式結果，也不要幫我填教師決定。
```

應該看到：`summary.md` 寫 10 份、演練平均 96.0、完成五區 8 份；`differences.csv` 每一列都是 AI 跟規準表看法不同的一格。沒有差異也正常，記「本輪沒有分歧」。

## 第 4 步｜你決定：採用／改分／待確認

```text
請把我的決定寫進 my-results/teacher-review.csv，只改我說到的列，欄位名稱與列的順序不要動，理由照我的原話、不要潤飾；我沒說到的列全部留空：
DEMO-W01-S01：final_score【】、decision【】、reason【】
DEMO-W01-S02：final_score【】、decision【】、reason【】
DEMO-W01-S03：final_score【】、decision【】、reason【】
（其他代號照同一個格式接著寫）
寫完請把這個檔的內容原樣印給我看。
```

應該看到：decision 只有「採用／改分／待確認」三種字；「待確認」的 final_score 是空的；AI 沒有替你補沒說到的列。

## 第 5 步｜存成一個版本

```text
請把 my-results 這個資料夾的成果存成 Git 版本。如果目前工作資料夾還不是 Git 版本庫，就先在這裡初始化一個（只在這裡，不建立遠端、不上傳到任何地方）。只加入 my-results/ 底下的檔案，不要加入 data/、submissions/、tools/、templates/ 或其他東西。版本說明寫：「學習單試評第 1 輪：人工 3 份＋AI 試評＋程式核對＋教師決定」。做完印出版本清單，並列出這一版包含哪些檔案。
```

應該看到：版本清單一筆、檔案只有 my-results 底下的、沒有「推上去／遠端」的字眼。

## 15 份選做：換四個地方

- 提示詞 A：`data/submissions-10.csv`→`data/submissions-15.csv`、「10 份」→「15 份」、存成 `my-results/ai-scores-15.csv`、`ai-evidence-15.md`
- 提示詞 B：`--count 15 --input data/submissions-15.csv --compare my-results/ai-scores-15.csv --out-dir my-results/program-round-15`
- 第 4 步：用 `templates/teacher-review-15.csv`（先請 AI 複製到 my-results）
- 第 5 步：版本說明「學習單試評第 2 輪：15 份」

15 份包含前 10 份，不合併成 25 份；人工三份不必重評。公開 repo 的 `instructor/REFERENCE.md` 有講師參考，所以這不是正式盲評，只是練習。
