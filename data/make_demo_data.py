# -*- coding: utf-8 -*-
"""make_demo_data.py — 產生工作坊用的三份「合成」學習證據（固定種子，跑幾次都一樣）。

三份資料共用同一張欄位表，差別只在領域與規準：
  project-presentation-scores.csv  課堂專題簡報（通用，課堂主示範用）
  pe-squat-scores.csv              體育：深蹲動作品質（自選）
  lab-report-scores.csv            實驗報告（化材／物理／環境通用，自選）

每份 24 筆，代號 DEMO-S01…DEMO-S24。每份都刻意埋了幾筆「落差」，答案卡在 README.md。
分數＝四個規準各 1–4 級的加總（4–16），自評／互評／教師評分各一欄；另有「教師認為最弱的規準」。
反思短文全部是這支程式裡的句子池，沒有任何真實學生的文字。

用法：python make_demo_data.py   （在 data/ 資料夾裡跑；會覆寫三個 CSV＋sample-analysis.json）
"""
import csv, json, random, pathlib

HERE = pathlib.Path(__file__).parent
SEED = 1016          # 10/16，固定種子
N = 24
HEADER_NOTE = "# 合成資料（synthetic）：工作坊示範用，代號、分數、反思全部由 make_demo_data.py 產生，不代表任何真實學生。"

# ── 各領域設定 ────────────────────────────────────────────────────────────────
DOMAINS = {
    "project-presentation": {
        "task": "課堂專題簡報（8 分鐘）",
        "medium": "口頭報告＋投影片（教師與同儕現場觀察紀錄）",
        "criteria": ["內容正確", "結構清楚", "表達流暢", "回應提問"],
        "pool": {
            "skill":   ["我知道自己講到一半會跳段落，下次要先把三個重點寫在紙上。",
                        "投影片字太多，台下在讀字沒在聽我講，這點我自己看錄影就發現了。",
                        "回應提問那段最弱，被問到數據來源時我答不出來。",
                        "我的結構還可以，但結論太短，沒有把前面的重點收回來。",
                        "開頭花太久在自我介紹，真正的重點到第五分鐘才出現。",
                        "圖表放上去了但我沒有解釋軸是什麼，台下應該看不懂。",
                        "練習的時候都在背稿，一緊張就忘詞，下次改成只記關鍵字。"],
            "external":["時間太短了，8 分鐘根本講不完我們準備的東西。",
                        "同組的人投影片前一天才給我，我沒時間練。",
                        "教室的投影機顏色跑掉，圖表看不清楚，不是我的問題。",
                        "我排在最後一個講，大家都累了，沒人認真聽。",
                        "麥克風一直有雜音，我的聲音被蓋掉。"],
            "emotion": ["上台前很緊張，講完覺得自己表現很差，有點不想再上台。",
                        "被問問題的時候腦袋一片空白，很挫折。",
                        "看到互評分數的時候很受傷，我明明準備了很久。"],
            "peer":    ["同學說我語速太快，我回去聽錄音真的是，這個回饋很有用。",
                        "互評表上有人寫我眼神都看投影片，我以前沒注意到。",
                        "幫別組打分數的時候，才發現自己的簡報也犯了一樣的毛病。",
                        "同學建議我把結論放到最前面講一次，試了一下真的比較清楚。"],
            "ai":      ["簡報稿是請 AI 幫我潤的，講的時候有些句子不像我自己會說的話。",
                        "我用 AI 整理了資料，但被問到細節才發現我沒真的看懂那段。",
                        "請 AI 幫我預想可能被問的問題，真的被問到兩題，這招有用。"],
            "vague":   ["這次表現還不錯，下次會更好。",
                        "學到很多，謝謝老師和同學。",
                        "整體還可以，沒什麼特別要改的。",
                        "有做完就好，下次再努力。"],
        },
    },
    "pe-squat": {
        "task": "深蹲動作品質（手機錄影 3 次）",
        "medium": "手機錄影的動作觀察紀錄（去識別化後只留評分與文字，不留影像）",
        "criteria": ["下蹲深度", "膝蓋對齊", "脊柱中立", "控制與節奏"],
        "pool": {
            "skill":   ["看影片才發現我膝蓋會往內夾，自己做的時候完全沒感覺。",
                        "深度不夠，我以為蹲到大腿平行了，影片裡差很多。",
                        "下去快、起來也快，老師說要數節奏，我回去練的時候真的有差。",
                        "背會圓，特別是最後幾下累了的時候。",
                        "腳跟會離地，看影片才知道是腳踝活動度不夠，不是用力的問題。",
                        "左右腳受力不平均，影片裡身體明顯往右偏。",
                        "前兩下還可以，第三下開始膝蓋就往內了，應該是撐不住。"],
            "external":["手機放的角度不對，看不到膝蓋，所以互評的人說不準。",
                        "那天腿很痠，不是平常的狀態。",
                        "場地太擠，後面有人經過，我分心了。",
                        "鞋子不對，穿跑鞋做深蹲本來就會不穩。",
                        "錄影的同學一直晃，影片糊掉了。"],
            "emotion": ["看到同學給我的分數比我自己打的低很多，有點難過，不太想再錄。",
                        "一直做不好，覺得自己身體就是不協調。",
                        "錄影要給別人看，我很不自在，第二次就不想認真做了。"],
            "peer":    ["同學在互評表寫我重心往前倒，我請他示範一次才懂。",
                        "互評的時候要看別人的影片，反而學到怎麼看自己的。",
                        "同學提醒我先把腳打開一點再蹲，第三次明顯穩很多。",
                        "幫同學打分的時候用了規準表，才知道「脊柱中立」原來是看這個。"],
            "ai":      ["我把影片描述給 AI 問它怎麼改，它說的跟老師說的一樣，但我還是做不出來。",
                        "AI 列了十個要點，太多了，我只記得兩個。",
                        "請 AI 幫我排了一週的練習順序，照做之後深度有進步。"],
            "vague":   ["有進步，繼續加油。",
                        "動作還可以，下次再注意一下。",
                        "謝謝老師，學到很多。",
                        "做完了，應該沒問題。"],
        },
    },
    "lab-report": {
        "task": "實驗報告（第 3 次實驗）",
        "medium": "書面報告（文字、表格、圖）",
        "criteria": ["假設與設計", "數據處理", "誤差討論", "結論與反思"],
        "pool": {
            "skill":   ["誤差討論我只寫了『人為誤差』，老師說要講清楚是哪一步、往哪個方向影響結果。",
                        "我的數據處理沒有算不確定度，看了同學的報告才知道要算。",
                        "假設寫得太像課本，不是我自己的實驗能驗證的那種。",
                        "結論和數據對不起來，我寫了預期的結果而不是實際量到的。",
                        "圖的座標軸沒標單位，自己回頭看也看不出量的是什麼。",
                        "有效數字沒有統一，有的寫三位有的寫五位，老師圈了一整頁。",
                        "我把兩次量測的平均當結果，但沒說明為什麼要平均、差多少。"],
            "external":["儀器那天不穩，數據本來就會跳，誤差不是我能控制的。",
                        "組員負責的那部分數據漏抄，報告只能先交。",
                        "時間不夠，誤差討論只好隨便寫。",
                        "實驗室的天平好像沒校正，大家的數據都偏。",
                        "講義的步驟跟實際操作不一樣，我們照講義做當然會錯。"],
            "emotion": ["數據一直對不起來，寫報告寫到很想放棄這門課。",
                        "分數比我預期低很多，覺得自己不適合做實驗。",
                        "被圈了一整頁，看到就不想再打開那份報告。"],
            "peer":    ["互評的同學指出我的單位寫錯，這種錯自己看十次都看不到。",
                        "看了別組怎麼畫誤差棒，我才知道圖可以這樣呈現。",
                        "同學問我「你的假設可以被這個實驗推翻嗎」，我答不出來，才發現假設寫錯方向。",
                        "幫別組看報告的時候，發現大家都沒寫量測次數，回頭補了自己的。"],
            "ai":      ["誤差討論那段是請 AI 幫我寫的，老實說我不太懂它寫的『系統誤差』是什麼。",
                        "AI 幫我整理了數據表，但我沒檢查，有一行算錯了。",
                        "請 AI 解釋為什麼要算標準差，解釋完我才看懂課本那一段。"],
            "vague":   ["這次報告寫得還可以，下次會更仔細。",
                        "學到很多實驗技巧。",
                        "整體沒什麼問題。",
                        "有交就好，下次再加強。"],
        },
    },
}

# 每個領域刻意埋的落差（答案卡；README 會列出同一份）
PLANTED = {
    "project-presentation": {
        "DEMO-S07": dict(self=16, peer=9,  teacher=8,  weakest="回應提問", cat="vague",
                         note="自評虛高：自評滿分，互評與教師評分都低；反思空泛。"),
        "DEMO-S14": dict(self=14, peer=6,  teacher=14, weakest="表達流暢", cat="peer",
                         note="互評異常偏低：自評與教師評分一致、互評極低——可能是互評者標準或關係問題，要回查互評表。"),
        "DEMO-S22": dict(self=10, peer=11, teacher=11, weakest="回應提問", cat="emotion",
                         note="分數中等但反思出現挫折與退縮的訊號，需要回饋介入而不是再扣分。"),
        "DEMO-S03": dict(self=12, peer=16, teacher=10, weakest="內容正確", cat="external",
                         note="互評過寬：互評滿分、教師評分偏低；反思把原因推給外部。"),
        "DEMO-S18": dict(self=7,  peer=13, teacher=14, weakest="結構清楚", cat="skill",
                         note="自評偏低：表現好但自評很低，反思具體——適合用回饋拉自信。"),
        "DEMO-S11": dict(self=13, peer=12, teacher=12, weakest="內容正確", cat="ai",
                         note="AI 使用訊號：反思坦承用 AI 整理但沒真的看懂，分數看不出來、文字才看得出來。"),
    },
    "pe-squat": {
        "DEMO-S07": dict(self=16, peer=9,  teacher=8,  weakest="膝蓋對齊", cat="vague",
                         note="自評虛高：自評滿分、互評與教師評分都低；反思空泛。"),
        "DEMO-S14": dict(self=14, peer=6,  teacher=14, weakest="控制與節奏", cat="peer",
                         note="互評異常偏低：自評與教師評分一致、互評極低——回查互評者與拍攝角度。"),
        "DEMO-S22": dict(self=10, peer=11, teacher=11, weakest="下蹲深度", cat="emotion",
                         note="分數中等但反思出現「不想再錄」的退縮訊號。"),
        "DEMO-S03": dict(self=12, peer=16, teacher=10, weakest="脊柱中立", cat="external",
                         note="互評過寬＋歸因外部（手機角度）。"),
        "DEMO-S18": dict(self=7,  peer=13, teacher=14, weakest="下蹲深度", cat="skill",
                         note="自評偏低但動作其實不錯，反思具體。"),
        "DEMO-S11": dict(self=13, peer=12, teacher=12, weakest="控制與節奏", cat="ai",
                         note="AI 給了太多要點、學生記不住——回饋量的問題。"),
    },
    "lab-report": {
        "DEMO-S05": dict(self=15, peer=11, teacher=8,  weakest="誤差討論", cat="vague",
                         note="自評虛高：自評很高、教師評分低，最弱在誤差討論；反思空泛。"),
        "DEMO-S11": dict(self=13, peer=5,  teacher=13, weakest="數據處理", cat="peer",
                         note="互評異常偏低：自評與教師一致、互評極低。"),
        "DEMO-S20": dict(self=9,  peer=10, teacher=10, weakest="結論與反思", cat="emotion",
                         note="分數中等但反思寫到「想放棄這門課」。"),
        "DEMO-S16": dict(self=14, peer=13, teacher=13, weakest="誤差討論", cat="ai",
                         note="分數不錯，但反思坦承誤差討論是 AI 寫的、自己不懂——分數看不出來、文字才看得出來。"),
        "DEMO-S02": dict(self=11, peer=16, teacher=9,  weakest="假設與設計", cat="external",
                         note="互評過寬、歸因外部（儀器）。"),
        "DEMO-S23": dict(self=6,  peer=12, teacher=14, weakest="數據處理", cat="skill",
                         note="自評偏低、表現好、反思具體。"),
    },
}

# 每個領域「AI 分類故意標錯」的那一筆（必須是埋設落差裡 cat=skill 的代號）
WRONG_AI = {
    "project-presentation": "DEMO-S18",
    "pe-squat": "DEMO-S18",
    "lab-report": "DEMO-S23",
}

CAT_LABEL = {
    "skill": "具體指出自己的弱點",
    "external": "把原因歸到外部",
    "emotion": "情緒或退縮訊號",
    "peer": "同儕回饋有幫上忙",
    "ai": "提到 AI 的使用方式",
    "vague": "空泛、沒有具體內容",
}


def make_domain(key, cfg, rng):
    rows = []
    pool = cfg["pool"]
    used = {c: [] for c in pool}

    for c in pool:
        used[c] = pool[c][:]
        rng.shuffle(used[c])

    def pick(cat):
        # 每句只用一次；某類用完就改抽「剩最多的那一類」，避免兩筆反思一模一樣
        if not used[cat]:
            cat = max(used, key=lambda c: len(used[c]))
        return used[cat].pop(), cat

    planted = PLANTED[key]
    # 埋設的那幾筆先把句子保留下來（它們的類別是答案卡的一部分，不能被「池子用完改抽別類」換掉）
    reserved = {}
    for sid, p in planted.items():
        text, got = pick(p["cat"])
        assert got == p["cat"], f"{key} {sid} 的 {p['cat']} 句子池不夠用"
        reserved[sid] = text
    for i in range(1, N + 1):
        sid = f"DEMO-S{i:02d}"
        if sid in planted:
            p = planted[sid]
            self_s, peer_s, teacher_s = p["self"], p["peer"], p["teacher"]
            weakest, cat, note = p["weakest"], p["cat"], p["note"]
            picked = (reserved[sid], cat)
        else:
            teacher_s = rng.choice([9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 15])
            self_s = max(4, min(16, teacher_s + rng.choice([-1, 0, 0, 1, 1, 2])))
            peer_s = max(4, min(16, teacher_s + rng.choice([-1, -1, 0, 0, 1, 1])))
            weakest = rng.choice(cfg["criteria"])
            cat = rng.choice(["skill", "skill", "skill", "external", "peer", "peer", "vague", "ai"])
            note = ""
            picked = pick(cat)
        rows.append({
            "student_id": sid,
            "task": cfg["task"],
            "evidence_medium": cfg["medium"],
            "self_score": self_s,
            "peer_score": peer_s,
            "teacher_score": teacher_s,
            "teacher_weakest_criterion": weakest,
            "reflection_text": picked[0],
            "_cat": picked[1],
            "synthetic_note": "合成資料",   # 不在資料裡標哪筆是埋的——答案卡只在 README 與 sample-analysis.json
            "_note": note,
        })
    return rows


def write_csv(path, rows):
    cols = ["student_id", "task", "evidence_medium", "self_score", "peer_score", "teacher_score",
            "teacher_weakest_criterion", "reflection_text", "synthetic_note"]
    with open(path, "w", encoding="utf-8-sig", newline="") as f:
        f.write(HEADER_NOTE + "\n")
        w = csv.DictWriter(f, fieldnames=cols, extrasaction="ignore")
        w.writeheader()
        for r in rows:
            w.writerow(r)


def main():
    rng = random.Random(SEED)
    analysis = {}
    for key, cfg in DOMAINS.items():
        rows = make_domain(key, cfg, rng)
        write_csv(HERE / f"{key}-scores.csv", rows)
        # 工作台「看範例分析」用的預算好結果：落差＋反思分類＋答案卡
        gaps = []
        for r in rows:
            gaps.append({
                "student_id": r["student_id"],
                "self_minus_teacher": r["self_score"] - r["teacher_score"],
                "peer_minus_teacher": r["peer_score"] - r["teacher_score"],
                "flag": bool(r["_note"]),
            })
        # 「AI 的分類」＝真分類再故意改錯一筆（美崙溪的點子）：抽查才有靶。
        # 改錯的是一筆「具體指出弱點」的反思，被 AI 標成「空泛」——人一讀就知道不對。
        true_cat = {r["student_id"]: r["_cat"] for r in rows}
        ai_cat = dict(true_cat)
        wrong_sid = WRONG_AI[key]
        assert true_cat[wrong_sid] == "skill", f"{key} 的 {wrong_sid} 應該是 skill 類才能當靶"
        ai_cat[wrong_sid] = "vague"
        answer_key = {sid: p["note"] for sid, p in PLANTED[key].items()}
        answer_key[wrong_sid] = (answer_key.get(wrong_sid, "") +
                                 "【AI 分類故意標錯】這筆反思其實具體講出了自己的弱點，預跑的 AI 分析卻把它標成「空泛」。"
                                 "抽查抽到它就會發現；全場沒人抽到，講師最後點出來。").strip()
        analysis[key] = {
            "task": cfg["task"],
            "criteria": cfg["criteria"],
            "medium": cfg["medium"],
            "categories": CAT_LABEL,
            "ai_category": ai_cat,          # 工作台顯示的「AI 分類」（含一筆故意錯的）
            "true_category": true_cat,      # 答案（只在 README 與講師模式用）
            "ai_wrong_on": wrong_sid,
            "gaps": gaps,
            "answer_key": answer_key,
        }
    with open(HERE / "sample-analysis.json", "w", encoding="utf-8") as f:
        json.dump(analysis, f, ensure_ascii=False, indent=1)
    print("寫出三份 CSV 與 sample-analysis.json（種子 %d、每份 %d 筆）" % (SEED, N))


if __name__ == "__main__":
    main()
