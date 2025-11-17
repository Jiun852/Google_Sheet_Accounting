#測試

import requests
import json


# 將此處替換為您實際部署的 Google Apps Script 網頁應用程式 URL
url = 'URL'

# 這些鍵 (Key) 必須與您的 Apps Script 中期望的參數名稱一致 (例如: "Category")
data_payload = {
    # 在這裡加入欄位：
    "Category": "交通費" ,
    "Amount": 50

}

# 使用 requests.post 方法發送 POST 請求
# requests 函式庫會自動將 'json' 參數轉換為 JSON 格式，
# 並設定正確的 Content-Type 標頭 (application/json)
response = requests.post(url, json=data_payload)

# 檢查回應
if response.status_code == 200:
    print(f"成功觸發 Apps Script。伺服器回應：{response.text}")
else:
    print(f"請求失敗。狀態碼：{response.status_code}")
    print(f"錯誤訊息：{response.text}")
