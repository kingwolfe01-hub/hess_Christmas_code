#!/usr/bin/env python3
"""
🎄 僅重錄本次修改的「芬蘭」2 支音檔 (generate_finland_only.py)
-------------------------------------------------------------------------
CMD 執行方式（在專案根目錄執行，約 4 秒完成）：
  set AZURE_SPEECH_KEY=貼上你的金鑰1
  set AZURE_SPEECH_REGION=eastasia
  python backend_tts/generate_finland_only.py
"""

import os
import sys
import urllib.error
import urllib.request

AZURE_SPEECH_KEY = os.environ.get("AZURE_SPEECH_KEY", "").strip()
AZURE_SPEECH_REGION = os.environ.get("AZURE_SPEECH_REGION", "eastasia").strip()
VOICE = "en-US-AriaNeural"

CLIPS = [
    {
        "file": "audio/in_finland__santa_prepares_presents_for_kids.mp3",
        "ssml": '<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US"><voice name="en-US-AriaNeural"><prosody rate="-15%">In Finland, Santa prepares <phoneme alphabet="ipa" ph="ˈprɛzənts">presents</phoneme> for kids.</prosody></voice></speak>'
    },
    {
        "file": "audio/cq_finland_blank.mp3",
        "ssml": '<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US"><voice name="en-US-AriaNeural"><prosody rate="-15%">What does Santa prepare for kids in Finland?</prosody></voice></speak>'
    },
]

def main():
    if not AZURE_SPEECH_KEY:
        print("❌ 尚未設定 AZURE_SPEECH_KEY！請先執行 set AZURE_SPEECH_KEY=你的金鑰1")
        sys.exit(1)

    old_file = "audio/in_finland__people_can_visit_santa_claus.mp3"
    if os.path.exists(old_file):
        os.remove(old_file)
        print(f"🧹 已移除舊檔: {old_file}")

    url = f"https://{AZURE_SPEECH_REGION}.tts.speech.microsoft.com/cognitiveservices/v1"
    headers = {
        "Ocp-Apim-Subscription-Key": AZURE_SPEECH_KEY,
        "Content-Type": "application/ssml+xml",
        "X-Microsoft-OutputFormat": "audio-24khz-96kbitrate-mono-mp3",
        "User-Agent": "HessChristmasAdventureTTS"
    }

    for clip in CLIPS:
        req = urllib.request.Request(url, data=clip["ssml"].encode("utf-8"), headers=headers, method="POST")
        try:
            with urllib.request.urlopen(req, timeout=20) as resp:
                data = resp.read()
            os.makedirs(os.path.dirname(clip["file"]), exist_ok=True)
            with open(clip["file"], "wb") as f:
                f.write(data)
            print(f"✅ 已生成: {clip['file']} ({len(data)} bytes)")
        except urllib.error.HTTPError as err:
            print(f"❌ 失敗 {clip['file']}: HTTP {err.code} - {err.read().decode('utf-8', 'ignore')}")
            sys.exit(1)

    print("🎉 芬蘭 2 支新音檔轉檔完成！")

if __name__ == "__main__":
    main()
