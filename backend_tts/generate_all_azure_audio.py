#!/usr/bin/env python3
"""
🎄 聖誕節大冒險 - Azure AI Speech 全套 86 支音檔批次轉檔腳本 (角色音色校正版)
-------------------------------------------------------------------------
角色音色・性別・年紀設定（已對齊 story.js / words.js / culture.js / party.js）：
- Steve  (10–12 歲活潑男孩): en-US-ChristopherNeural, pitch="+8%",  rate="-12%" (Story 1–8 幕 roleA)
- Alex   (10–12 歲聰明女孩): en-US-AnaNeural,         pitch="+0%",  rate="-12%" (Story 1–4 幕 roleB)
- Santa  (65+ 歲慈祥老爺爺): en-US-DavisNeural,       pitch="-12%", rate="-15%" (Story 5–8 幕 roleB)
- Teacher(28–35 歲美語女師): en-US-AriaNeural,        pitch="+0%",  依單元調速 (-5% ~ -18%)
- Student(10–12 歲小男孩):   en-US-ChristopherNeural, pitch="+8%",  rate="-12%" (階段二 Q&A 回答端)
- 5 國祝福語: 各國在地母語女性聲優, rate="-10%"

內建 Azure 免費層 (F0) 防限流機制：
- 預設每支間隔 3.2 秒（符合 F0 每分鐘 20 次上限），遇到 HTTP 429 會自動等待 12 秒重試。
- 自動清理 6 支已淘汰的舊版音檔。

CMD 執行方式（在專案根目錄執行）：
  set AZURE_SPEECH_KEY=貼上你的金鑰1
  set AZURE_SPEECH_REGION=eastasia
  python backend_tts/generate_all_azure_audio.py
"""

import argparse
import os
import sys
import time
import urllib.error
import urllib.request

AZURE_SPEECH_KEY = os.environ.get("AZURE_SPEECH_KEY", "").strip()
AZURE_SPEECH_REGION = os.environ.get("AZURE_SPEECH_REGION", "eastasia").strip()

V_ARIA = "en-US-AriaNeural"
V_CHRIS = "en-US-ChristopherNeural"
V_ANA = "en-US-AnaNeural"
V_DAVIS = "en-US-DavisNeural"

IPA_PRESENT = '<phoneme alphabet="ipa" ph="ˈprɛzənt">present</phoneme>'
IPA_PRESENTS = '<phoneme alphabet="ipa" ph="ˈprɛzənts">presents</phoneme>'

OBSOLETE_FILES = [
    "audio/chunk_st.mp3",
    "audio/chunk_ar.mp3",
    "audio/chunk_pre.mp3",
    "audio/chunk_sent.mp3",
    "audio/chunk_san.mp3",
    "audio/chunk_ta.mp3",
    "audio/in_the_usa__presents_wait_under_the_tree.mp3",
    "audio/in_the_usa__presents_are_under_the_christmas_tree.mp3",
    "audio/in_france__ribbons_tie_holiday_joy_together.mp3",
    "audio/in_mexico__bright_ornaments_bring_joy.mp3",
    "audio/in_the_uk__children_hang_stockings_by_the_fire.mp3",
    "audio/in_australia__santa_surfs_at_the_sunny_beach.mp3",
    "audio/cq_france_blank.mp3",
    "audio/cq_mexico_blank.mp3",
    "audio/cq_usa_blank.mp3",
    "audio/in_finland__people_can_visit_santa_claus.mp3",
]

# segment 格式: (voice_name, rate, pitch, text_or_ssml)
CLIPS = [
    # 1. 階段一：極地故事 8 幕對話 (16 支) — Scene 1-4: Steve+Alex / Scene 5-8: Steve+Santa
    {"file": "audio/it_s_cold_today_in_taiwan.mp3", "lang": "en-US", "segments": [(V_CHRIS, "-12%", "+8%", "It's cold today in Taiwan!")]},
    {"file": "audio/look__an_s_o_s_map_from_santa.mp3", "lang": "en-US", "segments": [(V_ANA, "-12%", "+0%", "Look! An S O S map from Santa!")]},
    {"file": "audio/we_need_our_backpack_and_compass.mp3", "lang": "en-US", "segments": [(V_CHRIS, "-12%", "+8%", "We need our backpack and compass!")]},
    {"file": "audio/we_have_flint_and_steel__let_s_go.mp3", "lang": "en-US", "segments": [(V_ANA, "-12%", "+0%", "We have flint and steel. Let's go!")]},
    {"file": "audio/look_at_the_christmas_portal.mp3", "lang": "en-US", "segments": [(V_CHRIS, "-12%", "+8%", "Look at the Christmas portal!")]},
    {"file": "audio/light_it_up_with_flint_and_steel__go.mp3", "lang": "en-US", "segments": [(V_ANA, "-12%", "+0%", "Light it up with flint and steel! Go!")]},
    {"file": "audio/we_are_in_the_purple_vortex.mp3", "lang": "en-US", "segments": [(V_CHRIS, "-12%", "+8%", "We are in the purple vortex!")]},
    {"file": "audio/hold_on_tight__it_s_getting_cold.mp3", "lang": "en-US", "segments": [(V_ANA, "-12%", "+0%", "Hold on tight! It's getting cold!")]},
    {"file": "audio/brrr__it_s_freezing_outside.mp3", "lang": "en-US", "segments": [(V_CHRIS, "-12%", "+8%", "Brrr! It's freezing outside!")]},
    {"file": "audio/the_blizzard_blew_my_seven_blocks_away.mp3", "lang": "en-US", "segments": [(V_DAVIS, "-15%", "-12%", "The blizzard blew my seven blocks away!")]},
    {"file": "audio/rudolph_is_cold_in_the_blizzard.mp3", "lang": "en-US", "segments": [(V_CHRIS, "-12%", "+8%", "Rudolph is cold in the blizzard!")]},
    {"file": "audio/look__the_pine_tree_can_shelter_him.mp3", "lang": "en-US", "segments": [(V_DAVIS, "-15%", "-12%", "Look! The pine tree can shelter him!")]},
    {"file": "audio/it_is_dark_and_cold_in_the_cabin.mp3", "lang": "en-US", "segments": [(V_CHRIS, "-12%", "+8%", "It is dark and cold in the cabin!")]},
    {"file": "audio/let_s_light_the_fireplace_with_flint.mp3", "lang": "en-US", "segments": [(V_DAVIS, "-15%", "-12%", "Let's light the fireplace with flint!")]},
    {"file": "audio/look_at_the_tree__it_s_party_time.mp3", "lang": "en-US", "segments": [(V_CHRIS, "-12%", "+8%", "Look at the tree! It's party time!")]},
    {"file": "audio/merry_christmas__let_s_celebrate.mp3", "lang": "en-US", "segments": [(V_DAVIS, "-15%", "-12%", "Merry Christmas! Let's celebrate!")]},

    # 2. 階段一：故事互動小測驗 (4 支 · 老師 Aria -12%)
    {"file": "audio/story_quiz_rudolph.mp3", "lang": "en-US", "segments": [(V_ARIA, "-12%", "+0%", "Which green tree can shelter Rudolph the reindeer?")]},
    {"file": "audio/story_quiz_correct_rudolph.mp3", "lang": "en-US", "segments": [(V_ARIA, "-12%", "+0%", "Correct! The pine tree shelters Rudolph!")]},
    {"file": "audio/story_quiz_stocking.mp3", "lang": "en-US", "segments": [(V_ARIA, "-12%", "+0%", "Where do children hang their Christmas stockings?")]},
    {"file": "audio/story_quiz_correct_hearth.mp3", "lang": "en-US", "segments": [(V_ARIA, "-12%", "+0%", "Correct! Stockings are above the fireplace!")]},

    # 3. 階段二：核心單字 (8 支 · 老師 Aria -15%)
    {"file": "audio/christmas_tree.mp3", "lang": "en-US", "segments": [(V_ARIA, "-15%", "+0%", "Christmas tree")]},
    {"file": "audio/pine_tree.mp3", "lang": "en-US", "segments": [(V_ARIA, "-15%", "+0%", "pine tree")]},
    {"file": "audio/ribbon.mp3", "lang": "en-US", "segments": [(V_ARIA, "-15%", "+0%", "ribbon")]},
    {"file": "audio/ornament.mp3", "lang": "en-US", "segments": [(V_ARIA, "-15%", "+0%", "ornament")]},
    {"file": "audio/star.mp3", "lang": "en-US", "segments": [(V_ARIA, "-15%", "+0%", "star")]},
    {"file": "audio/stocking.mp3", "lang": "en-US", "segments": [(V_ARIA, "-15%", "+0%", "stocking")]},
    {"file": "audio/present.mp3", "lang": "en-US", "segments": [(V_ARIA, "-15%", "+0%", IPA_PRESENT)]},
    {"file": "audio/santa_claus.mp3", "lang": "en-US", "segments": [(V_ARIA, "-15%", "+0%", "Santa Claus")]},

    # 4. 階段二：音節拼字磚 (16 支 · 老師 Aria -18%)
    {"file": "audio/chunk_christ.mp3", "lang": "en-US", "segments": [(V_ARIA, "-18%", "+0%", "Christ")]},
    {"file": "audio/chunk_mas.mp3", "lang": "en-US", "segments": [(V_ARIA, "-18%", "+0%", "mas")]},
    {"file": "audio/chunk_pine.mp3", "lang": "en-US", "segments": [(V_ARIA, "-18%", "+0%", "pine")]},
    {"file": "audio/chunk_tree.mp3", "lang": "en-US", "segments": [(V_ARIA, "-18%", "+0%", "tree")]},
    {"file": "audio/chunk_rib.mp3", "lang": "en-US", "segments": [(V_ARIA, "-18%", "+0%", "rib")]},
    {"file": "audio/chunk_bon.mp3", "lang": "en-US", "segments": [(V_ARIA, "-18%", "+0%", "bon")]},
    {"file": "audio/chunk_or.mp3", "lang": "en-US", "segments": [(V_ARIA, "-18%", "+0%", "or")]},
    {"file": "audio/chunk_na.mp3", "lang": "en-US", "segments": [(V_ARIA, "-18%", "+0%", "na")]},
    {"file": "audio/chunk_ment.mp3", "lang": "en-US", "segments": [(V_ARIA, "-18%", "+0%", "ment")]},
    {"file": "audio/chunk_stock.mp3", "lang": "en-US", "segments": [(V_ARIA, "-18%", "+0%", "stock")]},
    {"file": "audio/chunk_ing.mp3", "lang": "en-US", "segments": [(V_ARIA, "-18%", "+0%", "ing")]},
    {"file": "audio/chunk_pres.mp3", "lang": "en-US", "segments": [(V_ARIA, "-18%", "+0%", '<phoneme alphabet="ipa" ph="prɛz">pres</phoneme>')]},
    {"file": "audio/chunk_ent.mp3", "lang": "en-US", "segments": [(V_ARIA, "-18%", "+0%", '<phoneme alphabet="ipa" ph="ənt">ent</phoneme>')]},
    {"file": "audio/chunk_santa.mp3", "lang": "en-US", "segments": [(V_ARIA, "-18%", "+0%", "Santa")]},
    {"file": "audio/chunk_claus.mp3", "lang": "en-US", "segments": [(V_ARIA, "-18%", "+0%", "Claus")]},

    # 5. 階段二：空間介系詞單獨問句 (9 支 · 老師 Aria -12%)
    {"file": "audio/q_where_is_the_christmas_tree.mp3", "lang": "en-US", "segments": [(V_ARIA, "-12%", "+0%", "Where, is the Christmas tree?")]},
    {"file": "audio/q_where_is_the_pine_tree.mp3", "lang": "en-US", "segments": [(V_ARIA, "-12%", "+0%", "Where, is the pine tree?")]},
    {"file": "audio/q_where_is_the_ribbon.mp3", "lang": "en-US", "segments": [(V_ARIA, "-12%", "+0%", "Where, is the ribbon?")]},
    {"file": "audio/q_where_are_the_ornaments.mp3", "lang": "en-US", "segments": [(V_ARIA, "-12%", "+0%", "Where, are the ornaments?")]},
    {"file": "audio/q_where_is_the_star.mp3", "lang": "en-US", "segments": [(V_ARIA, "-12%", "+0%", "Where, is the star?")]},
    {"file": "audio/q_where_are_the_stockings.mp3", "lang": "en-US", "segments": [(V_ARIA, "-12%", "+0%", "Where, are the stockings?")]},
    {"file": "audio/q_where_is_the_stocking.mp3", "lang": "en-US", "segments": [(V_ARIA, "-12%", "+0%", "Where, is the stocking?")]},
    {"file": "audio/q_where_are_the_presents.mp3", "lang": "en-US", "segments": [(V_ARIA, "-12%", "+0%", f"Where, are the {IPA_PRESENTS}?")]},
    {"file": "audio/q_where_is_santa_claus.mp3", "lang": "en-US", "segments": [(V_ARIA, "-12%", "+0%", "Where, is Santa Claus?")]},

    # 6. 階段二：空間介系詞雙角色問答 (11 支 · 老師 Aria 問 + 550ms + 小男孩 Christopher +8% 答)
    {"file": "audio/where_is_the_christmas_tree__it_s_by_the_fireplace.mp3", "lang": "en-US", "segments": [(V_ARIA, "-12%", "+0%", "Where, is the Christmas tree?"), (V_CHRIS, "-12%", "+8%", '<break time="550ms"/> It\'s by the fireplace.')]},
    {"file": "audio/where_is_the_pine_tree__it_s_by_the_fireplace.mp3", "lang": "en-US", "segments": [(V_ARIA, "-12%", "+0%", "Where, is the pine tree?"), (V_CHRIS, "-12%", "+8%", '<break time="550ms"/> It\'s by the fireplace.')]},
    {"file": "audio/where_is_the_ribbon__it_s_around_the_christmas_tree.mp3", "lang": "en-US", "segments": [(V_ARIA, "-12%", "+0%", "Where, is the ribbon?"), (V_CHRIS, "-12%", "+8%", '<break time="550ms"/> It\'s around the Christmas tree.')]},
    {"file": "audio/where_is_the_ribbon__it_s_around_the_pine_tree.mp3", "lang": "en-US", "segments": [(V_ARIA, "-12%", "+0%", "Where, is the ribbon?"), (V_CHRIS, "-12%", "+8%", '<break time="550ms"/> It\'s around the pine tree.')]},
    {"file": "audio/where_are_the_ornaments__they_re_in_the_tree.mp3", "lang": "en-US", "segments": [(V_ARIA, "-12%", "+0%", "Where, are the ornaments?"), (V_CHRIS, "-12%", "+8%", '<break time="550ms"/> They\'re in the tree.')]},
    {"file": "audio/where_is_the_star__it_s_on_top_of_the_tree.mp3", "lang": "en-US", "segments": [(V_ARIA, "-12%", "+0%", "Where, is the star?"), (V_CHRIS, "-12%", "+8%", '<break time="550ms"/> It\'s on top of the tree.')]},
    {"file": "audio/where_is_the_star__it_s_on_the_top_of_the_tree.mp3", "lang": "en-US", "segments": [(V_ARIA, "-12%", "+0%", "Where, is the star?"), (V_CHRIS, "-12%", "+8%", '<break time="550ms"/> It\'s on the top of the tree.')]},
    {"file": "audio/where_are_the_stockings__they_re_above_the_fireplace.mp3", "lang": "en-US", "segments": [(V_ARIA, "-12%", "+0%", "Where, are the stockings?"), (V_CHRIS, "-12%", "+8%", '<break time="550ms"/> They\'re above the fireplace.')]},
    {"file": "audio/where_is_the_stocking__it_s_above_the_fireplace.mp3", "lang": "en-US", "segments": [(V_ARIA, "-12%", "+0%", "Where, is the stocking?"), (V_CHRIS, "-12%", "+8%", '<break time="550ms"/> It\'s above the fireplace.')]},
    {"file": "audio/where_are_the_presents__they_re_under_the_tree.mp3", "lang": "en-US", "segments": [(V_ARIA, "-12%", "+0%", f"Where, are the {IPA_PRESENTS}?"), (V_CHRIS, "-12%", "+8%", '<break time="550ms"/> They\'re under the tree.')]},
    {"file": "audio/where_is_santa_claus__he_is_in_the_room.mp3", "lang": "en-US", "segments": [(V_ARIA, "-12%", "+0%", "Where, is Santa Claus?"), (V_CHRIS, "-12%", "+8%", '<break time="550ms"/> He is in the room.')]},

    # 7. 階段三：7 國文化句子與搶答題幹 (14 支 · 老師 Aria -15%)
    {"file": "audio/in_germany__people_put_trees_in_the_house.mp3", "lang": "en-US", "segments": [(V_ARIA, "-15%", "+0%", "In Germany, people put trees in the house.")]},
    {"file": "audio/in_sweden__people_decorate_straw_christmas_goats_with_red_ribbons.mp3", "lang": "en-US", "segments": [(V_ARIA, "-15%", "+0%", "In Sweden, people decorate straw Christmas goats with red ribbons.")]},
    {"file": "audio/in_czechia__people_make_shiny_glass_ornaments.mp3", "lang": "en-US", "segments": [(V_ARIA, "-15%", "+0%", "In Czechia, people make shiny glass ornaments.")]},
    {"file": "audio/in_the_philippines__star_lanterns_light_the_street.mp3", "lang": "en-US", "segments": [(V_ARIA, "-15%", "+0%", "In the Philippines, star lanterns light the street.")]},
    {"file": "audio/in_the_uk__kids_hang_stockings_on_christmas_eve.mp3", "lang": "en-US", "segments": [(V_ARIA, "-15%", "+0%", "In the UK, kids hang stockings on Christmas Eve.")]},
    {"file": "audio/in_finland__santa_prepares_presents_for_kids.mp3", "lang": "en-US", "segments": [(V_ARIA, "-15%", "+0%", f"In Finland, Santa prepares {IPA_PRESENTS} for kids.")]},
    {"file": "audio/in_australia__you_may_see_santa_claus_at_the_beach.mp3", "lang": "en-US", "segments": [(V_ARIA, "-15%", "+0%", "In Australia, you may see Santa Claus at the beach.")]},
    {"file": "audio/cq_germany_blank.mp3", "lang": "en-US", "segments": [(V_ARIA, "-15%", "+0%", "What do people in Germany put in the house?")]},
    {"file": "audio/cq_sweden_blank.mp3", "lang": "en-US", "segments": [(V_ARIA, "-15%", "+0%", "What do people in Sweden tie on straw Christmas goats?")]},
    {"file": "audio/cq_czechia_blank.mp3", "lang": "en-US", "segments": [(V_ARIA, "-15%", "+0%", "What do people in Czechia make out of glass for Christmas trees?")]},
    {"file": "audio/cq_philippines_blank.mp3", "lang": "en-US", "segments": [(V_ARIA, "-15%", "+0%", "What shape is the lantern in the Philippines?")]},
    {"file": "audio/cq_uk_blank.mp3", "lang": "en-US", "segments": [(V_ARIA, "-15%", "+0%", "What do kids in the UK hang on Christmas Eve?")]},
    {"file": "audio/cq_finland_blank.mp3", "lang": "en-US", "segments": [(V_ARIA, "-15%", "+0%", "What does Santa prepare for kids in Finland?")]},
    {"file": "audio/cq_australia_blank.mp3", "lang": "en-US", "segments": [(V_ARIA, "-15%", "+0%", "Who may you see at the beach in Australia in December?")]},

    # 8. 階段四：5 國聖誕祝福語 (5 支 · 母語聲優 -10%)
    {"file": "audio/greeting_en_merry_christmas.mp3", "lang": "en-US", "segments": [(V_ARIA, "-10%", "+0%", "Merry Christmas!")]},
    {"file": "audio/greeting_es_feliz_navidad.mp3", "lang": "es-ES", "segments": [("es-ES-ElviraNeural", "-10%", "+0%", "¡Feliz Navidad!")]},
    {"file": "audio/greeting_de_frohe_weihnachten.mp3", "lang": "de-DE", "segments": [("de-DE-KatjaNeural", "-10%", "+0%", "Frohe Weihnachten!")]},
    {"file": "audio/greeting_fr_joyeux_noel.mp3", "lang": "fr-FR", "segments": [("fr-FR-DeniseNeural", "-10%", "+0%", "Joyeux Noël!")]},
    {"file": "audio/greeting_ja_merry_christmas.mp3", "lang": "ja-JP", "segments": [("ja-JP-NanamiNeural", "-10%", "+0%", "メリークリスマス!")]},

    # 9. 系統共用回饋語 (4 支 · 老師 Aria -5%)
    {"file": "audio/feedback_try_again.mp3", "lang": "en-US", "segments": [(V_ARIA, "-5%", "+0%", "Try again!")]},
    {"file": "audio/feedback_great_job.mp3", "lang": "en-US", "segments": [(V_ARIA, "-5%", "+0%", "Great job!")]},
    {"file": "audio/feedback_awesome.mp3", "lang": "en-US", "segments": [(V_ARIA, "-5%", "+0%", "Awesome!")]},
    {"file": "audio/feedback_correct.mp3", "lang": "en-US", "segments": [(V_ARIA, "-5%", "+0%", "Correct!")]},
]

def build_ssml(lang: str, segments: list) -> bytes:
    voice_blocks = "\n".join(
        f"  <voice name='{voice}'><prosody rate='{rate}' pitch='{pitch}'>{body}</prosody></voice>"
        for voice, rate, pitch, body in segments
    )
    ssml = f"<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='{lang}'>\n{voice_blocks}\n</speak>"
    return ssml.encode("utf-8")

def synthesize_with_retry(clip: dict, key: str, region: str) -> None:
    url = f"https://{region}.tts.speech.microsoft.com/cognitiveservices/v1"
    headers = {
        "Ocp-Apim-Subscription-Key": key,
        "Content-Type": "application/ssml+xml",
        "X-Microsoft-OutputFormat": "audio-24khz-96kbitrate-mono-mp3",
        "User-Agent": "HessChristmasAdventureTTS"
    }
    data = build_ssml(clip["lang"], clip["segments"])

    for attempt in range(1, 5):
        req = urllib.request.Request(url, data=data, headers=headers, method="POST")
        try:
            with urllib.request.urlopen(req, timeout=25) as resp:
                audio_bytes = resp.read()
            os.makedirs(os.path.dirname(clip["file"]), exist_ok=True)
            with open(clip["file"], "wb") as f:
                f.write(audio_bytes)
            return
        except urllib.error.HTTPError as err:
            if err.code == 429 and attempt < 4:
                print(f"⏳ 觸發免費層頻率限制 (429)，等待 12 秒後重試 ({attempt}/3)...")
                time.sleep(12)
                continue
            raise

def main():
    parser = argparse.ArgumentParser(description="Azure AI Speech 全套 86 支音檔批次轉檔工具")
    parser.add_argument("--region", default=AZURE_SPEECH_REGION, help="Azure 資源區域 (預設 eastasia)")
    parser.add_argument("--delay", type=float, default=3.2, help="每支間隔秒數 (免費層 F0 建議 3.2 秒)")
    parser.add_argument("--skip-existing", action="store_true", help="略過已存在的檔案")
    parser.add_argument("--keep-obsolete", action="store_true", help="保留舊版已淘汰的 6 支音檔不刪除")
    args = parser.parse_args()

    if not AZURE_SPEECH_KEY:
        print("❌ 尚未設定 AZURE_SPEECH_KEY！若在 CMD 請執行：")
        print("   set AZURE_SPEECH_KEY=貼上你的金鑰1")
        print("   set AZURE_SPEECH_REGION=eastasia")
        sys.exit(1)

    if not args.keep_obsolete:
        for old_f in OBSOLETE_FILES:
            if os.path.exists(old_f):
                os.remove(old_f)
                print(f"🧹 已清理舊版廢棄音檔: {old_f}")

    total = len(CLIPS)
    print(f"🎙️ 開始呼叫 Azure Speech ({args.region}) 批次轉檔全套 {total} 支音檔（間隔 {args.delay}s）...")

    for idx, clip in enumerate(CLIPS, 1):
        if args.skip_existing and os.path.exists(clip["file"]):
            print(f"[{idx:02d}/{total}] ⏭️ 略過已存在: {clip['file']}")
            continue
        try:
            synthesize_with_retry(clip, AZURE_SPEECH_KEY, args.region)
            print(f"[{idx:02d}/{total}] ✅ 已生成: {clip['file']}")
            if idx < total and args.delay > 0:
                time.sleep(args.delay)
        except urllib.error.HTTPError as err:
            print(f"[{idx:02d}/{total}] ❌ 失敗 {clip['file']}: HTTP {err.code} - {err.read().decode('utf-8', 'ignore')}")
            sys.exit(1)

    print("🎉 全部 86 支角色音色校正版音檔轉檔完成！")

if __name__ == "__main__":
    main()