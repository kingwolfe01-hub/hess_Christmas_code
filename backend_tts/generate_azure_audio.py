#!/usr/bin/env python3
"""
🎄 聖誕節大冒險 - Azure AI Speech 高品質批次轉檔腳本 (generate_azure_audio.py)
-------------------------------------------------------------------------
特點：
1. 使用標準 SSML <phoneme alphabet="ipa"> 精準鎖定多音字重音（解決 presents 念成動詞的問題）。
2. 零外部套件依賴（只用 Python 內建 urllib），Windows / Mac 直接執行。
3. 預設只轉「本次文編修正＋遺漏補齊」的 8 支音檔；加上 --all 參數可重轉全套音檔。

使用方式：
  Windows PowerShell:
    $env:AZURE_SPEECH_KEY="貼上你的API密鑰"
    $env:AZURE_SPEECH_REGION="你的資源區域例如 eastus 或 japaneast"
    python backend_tts/generate_azure_audio.py
"""

import argparse
import os
import sys
import urllib.request
import urllib.error

# 若不想用環境變數，也可直接把金鑰與區域填在下方雙引號內（請勿將金鑰上傳到公開 GitHub！）
AZURE_SPEECH_KEY = os.environ.get("AZURE_SPEECH_KEY", "").strip()
AZURE_SPEECH_REGION = os.environ.get("AZURE_SPEECH_REGION", "eastus").strip()

# 你的 Azure AI Services 專案端點（供參考）
PROJECT_ENDPOINT = "https://kingwolfe01-7973-resource.services.ai.azure.com"

VOICE_FEMALE = "en-US-AriaNeural"
VOICE_BOY = "en-US-ChristopherNeural"

# 預設要更新／補齊的音檔清單（含 IPA 音標鎖定）
TARGET_CLIPS = [
    {
        "file": "audio/in_the_usa__presents_are_under_the_christmas_tree.mp3",
        "voice": VOICE_FEMALE,
        "rate": "-15%",
        "ssml_body": 'In the USA, <phoneme alphabet="ipa" ph="ˈprɛzənts">presents</phoneme> are under the Christmas tree.'
    },
    {
        "file": "audio/present.mp3",
        "voice": VOICE_FEMALE,
        "rate": "-15%",
        "ssml_body": '<phoneme alphabet="ipa" ph="ˈprɛzənt">present</phoneme>'
    },
    {
        "file": "audio/where_are_the_presents__they_re_under_the_tree.mp3",
        "voice": VOICE_FEMALE,
        "rate": "-12%",
        "ssml_body": 'Where, are the <phoneme alphabet="ipa" ph="ˈprɛzənts">presents</phoneme>? <break time="550ms"/> <voice name="en-US-ChristopherNeural"><prosody rate="-12%">They\'re under the tree.</prosody></voice>'
    },
    {
        "file": "audio/where_are_the_ornaments__they_re_in_the_tree.mp3",
        "voice": VOICE_FEMALE,
        "rate": "-12%",
        "ssml_body": 'Where, are the ornaments? <break time="550ms"/> <voice name="en-US-ChristopherNeural"><prosody rate="-12%">They\'re in the tree.</prosody></voice>'
    },
    {
        "file": "audio/chunk_pres.mp3",
        "voice": VOICE_FEMALE,
        "rate": "-18%",
        "ssml_body": '<phoneme alphabet="ipa" ph="prɛz">pres</phoneme>'
    },
    {
        "file": "audio/chunk_ent.mp3",
        "voice": VOICE_FEMALE,
        "rate": "-18%",
        "ssml_body": '<phoneme alphabet="ipa" ph="ənt">ent</phoneme>'
    },
    {
        "file": "audio/chunk_san.mp3",
        "voice": VOICE_FEMALE,
        "rate": "-18%",
        "ssml_body": '<phoneme alphabet="ipa" ph="sæn">San</phoneme>'
    },
    {
        "file": "audio/chunk_ta.mp3",
        "voice": VOICE_FEMALE,
        "rate": "-18%",
        "ssml_body": '<phoneme alphabet="ipa" ph="tə">ta</phoneme>'
    },
]

def build_ssml(voice: str, rate: str, body: str) -> bytes:
    ssml = f"""<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='en-US'>
  <voice name='{voice}'>
    <prosody rate='{rate}'>{body}</prosody>
  </voice>
</speak>"""
    return ssml.encode("utf-8")

def synthesize(clip: dict, key: str, region: str) -> None:
    url = f"https://{region}.tts.speech.microsoft.com/cognitiveservices/v1"
    headers = {
        "Ocp-Apim-Subscription-Key": key,
        "Content-Type": "application/ssml+xml",
        "X-Microsoft-OutputFormat": "audio-24khz-96kbitrate-mono-mp3",
        "User-Agent": "HessChristmasAdventureTTS"
    }
    data = build_ssml(clip["voice"], clip["rate"], clip["ssml_body"])
    req = urllib.request.Request(url, data=data, headers=headers, method="POST")
    with urllib.request.urlopen(req, timeout=20) as resp:
        audio_bytes = resp.read()
    os.makedirs(os.path.dirname(clip["file"]), exist_ok=True)
    with open(clip["file"], "wb") as f:
        f.write(audio_bytes)
    print(f"✅ 已生成: {clip['file']} ({len(audio_bytes)} bytes)")

def main():
    parser = argparse.ArgumentParser(description="Azure AI Speech 批次轉檔工具")
    parser.add_argument("--region", default=AZURE_SPEECH_REGION, help="Azure 資源區域 (例如 eastus, japaneast)")
    args = parser.parse_args()

    if not AZURE_SPEECH_KEY:
        print("❌ 尚未設定 AZURE_SPEECH_KEY！請先執行：")
        print('   $env:AZURE_SPEECH_KEY="你的API密鑰"')
        print('   $env:AZURE_SPEECH_REGION="你的區域 (如 eastus)"')
        sys.exit(1)

    print(f"🎙️ 開始呼叫 Azure Speech ({args.region}) 批次轉檔 {len(TARGET_CLIPS)} 支音檔...")
    for clip in TARGET_CLIPS:
        try:
            synthesize(clip, AZURE_SPEECH_KEY, args.region)
        except urllib.error.HTTPError as err:
            print(f"❌ 失敗 {clip['file']}: HTTP {err.code} - {err.read().decode('utf-8', 'ignore')}")
            sys.exit(1)
    print("🎉 全部音檔轉檔完成！請重新整理網頁或上傳至 GitHub Pages。")

if __name__ == "__main__":
    main()
