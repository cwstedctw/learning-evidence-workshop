# 10/16：用同一週合成學習單練習評分

**合成示範、不是學生作答**。先開 [成員任務](participant/ASSIGNMENT.md)，照順序完成：先人工三份→AI依原文試評→Python加總核對→教師決定→存版本。預設10份，15份選做；兩版同一週，15份包含前10份，不合併成25份。

本包是五區完成度試評：每區0或20分，合計是演練百分比。**不是演講課正式成績、不含準時／遲交或學期換算，不得套80–99常態對齊。** 空泛文字有寫仍算完成，AI揭露「否」算完成。內容分類另做分析，不影響分數。

整包解壓到可寫的位置，再在AI助手選這個資料夾作為本機工作資料夾。學員材料都在 `participant/`；`instructor/` 是講師參考，不需先看。公開repo答案可讀，沒有真正隔離，也不宣稱盲測或正式信度。

本包的合成文字沿用2026-10-09同週學習單補充，移除輸入中的完成度旗標與六面向數值旗標，只保留五區原文。CSV第一行就是標頭、UTF-8編碼，不要跳過首行。每筆及每份文字紀錄均有合成宣告。

AI使用自己已登入的助手，不需API金鑰。請AI代跑工具；沒有Python就照規準人工加總，不要求新手先安裝Python。程式只用標準函式庫、不連網、不讀校務系統。

講師可參考：

```powershell
python participant/tools/grade.py --out-dir participant/output/round-1
python participant/tools/grade.py --count 15 --out-dir participant/output/round-15
python participant/tools/grade.py --input participant/data/submissions-10.csv --compare participant/output/ai-scores.csv --out-dir participant/output/compare-1
```

輸出位置要用新資料夾，既有成果不覆寫。工具產生 `scores.csv`、`summary.md`、`run.json`；比較時另有 `differences.csv`。run.json記輸入及規準SHA-256（雜湊）、時間與份數，程式不填教師的final_score。

這條路線不相容原工作台要求的4–16分自評／互評／教師三方CSV。不要捏造三種分數；用本包的比較表即可，原工作台B4一頁設計仍能用。單週小樣本只能練流程與描述資料，不能推論跨週進步或教學介入有效。

教材使用原工作坊授權：CC BY-NC-SA 4.0。合成資料不代表任何真實學生，請勿在公開包加入學生檔案。
