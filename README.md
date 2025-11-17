https://valiant-satin-b1c.notion.site/Apple-Goole-Sheet-2ae1cba9101880bc8081cc8599557d4e
# Apple 捷徑&Google Sheet 記帳
---
# 1. Google Sheet設置

## Step.1 建立一個Google Sheet 頁面，選填自己需要項目

1. 日期 Date
2. 類別 Category
3. 項目 Description
4. 金額 Amount
5. 支付方式 Payment
6. 備註 Notes
7. 百分比 Priority
8. (留白)
9. 月份下拉選單
10. 月份結餘
11. 結餘

![Row.png](attachment:a0089f17-7c4a-4f1c-bb37-47ed0929a31c:Row.png)

## Step.2 從｢擴充功能」選擇「Apps Script」

![Apps Script.png](attachment:311e075a-d4a6-49e3-80c4-ca573ddf4f89:Apps_Script.png)

## Step.3 填入程式碼，範例就放三個，其他欄位依需求自行修改

```jsx
function doPost (e) {
  // 取得參數
  const params = JSON.parse(e.postData.contents);
  const Category = params.Category; //類別
  const Amount = params.Amount; //金額
  const date = new Date(); // 目前時間  
	const dateStr = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`; // 日期格式 yyyy/mm/dd  預設月份0-11 所以要+1
  
	//選擇試算表 MyID填入自己的ID
  const SpreadSheet = SpreadsheetApp.openById('MyID');  
	//選擇要編輯工作表
	const Sheet = SpreadSheet.getSheetByName('工作表');
  
	const LastRow = Sheet.getLastRow(); // 取得最後一行的行數
  
	//賦值
	Sheet.getRange(LastRow+1, 1).setValue(date); // 第A欄
  Sheet.getRange(LastRow+1, 2).setValue(Category); // 第B欄
  Sheet.getRange(LastRow+1, 3).setValue(Amount); // 第C欄
	
	return ContentService.createTextOutput('成功');// 回傳成功
}
```

![Code.png](attachment:d63ec015-7e99-4d4d-8156-64bc581185a6:Code.png)

## Step.4 填入試算表ID跟工作表名稱

網址中 d/後**「ID 位置」**/edit前，就是ID

![ID.png](attachment:41a24dfa-c59f-4798-aee4-87e41d253ed7:ID.png)

表格下方，就是工作表名稱

![Sheet_Name.png](attachment:0672d0e5-3ced-4a36-94ae-9c254fc35288:Sheet_Name.png)

## Step.5 部屬

選擇**「新增部署作業」**

![New.png](attachment:87b417bc-b2ec-4172-90f2-84cde837bd11:New.png)

選擇**「網頁應用程式」**

![Choose_WEB.png](attachment:6ebda8f7-227e-4952-a07f-e1ab15e1fdd7:Choose_WEB.png)

設定權限**「所有人」**後

![Permissions.png](attachment:8e10c663-b899-4e30-b3e8-dc1006fa2705:Permissions.png)

部屬後，按步驟授予存取權

![Access.png](attachment:a7b70706-28e8-4f2a-9fbe-a51ac34c712d:Access.png)

![Advanced.png](attachment:704bd19b-75ff-465b-8222-4d4138e590b2:Advanced.png)

## Step.6 設置完成

記下網址，Goole Sheet 的設置就完成了。

![http.png](attachment:4ee348f8-f78f-4c0b-ae95-48d3f09873d4:http.png)

---

# 2. Apple 捷徑設置

## Step.1 **「取得 URL 內容」**

Apple 捷徑使用**「取得 URL 內容」**動作，發送 POST 請求，回傳 JSON 給 Google Sheet

![ios.png](attachment:091d831b-a2ea-41c6-af4f-04482b0b1cf3:ios.png)

- 有MAC建議用MAC操作，因為手機介面的問題，URL的部分需要用文字出儲存。
- 只要確定 JSON 的鍵值跟上方程式的輸入一致，還有選擇好數值輸入方式就可以了。

### 捷徑範例

[Shortcuts](https://www.icloud.com/shortcuts/acdab229d5a747f5993591f2ced89417)

## Step.2 按照自己需求，設定輸入獲選單

![input.png](attachment:a12e74a2-e6bc-4d6f-8837-ca566d2e7892:input.png)

## Step.3 執行

![input_02.PNG](attachment:e6a4e396-432c-41b2-b8ea-08224bc3aef4:input_02.png)

![input_01.PNG](attachment:e6bb2b2f-72d8-4131-80a4-64a8732a2784:input_01.png)

## Step.4 結果

![result.png](attachment:18a9cfc7-d351-4b43-b92e-86944dc7f55c:result.png)

- 如果要增減欄位，要確定三個部分
    - Google Sheet 欄位位置
    - Apps Script 取得參數跟賦值位置
    - Apple 捷徑的 JSON 格式

---

# 3.進階

## 回傳花費

記完帳後，如果想知道花費了多少錢，可以透過回傳值，傳回手機介面，如圖

![Expenses.PNG](attachment:fb9d1f81-5ba5-4043-aa62-11740a5580d7:Expenses.png)

### Step.1 在Google Sheet 設置欄位

與用函數計算總花費

```html
=sum(C2:C)
```

![cost.png](attachment:97a7fda1-4813-43b4-9ab1-71b7b711f109:cost.png)

### Step.2 在Apps Script 回傳值

我的花費總額設置在F1，轉換為Apps Script 會是(1, 6)，依照需求自己更改

- 都設置在第一行，因為  Sheet.getLastRow();  為取得最後一行的行數，如果設在E2，資料會從第3行開始寫入

```jsx
function doPost (e) {
  // 取得參數
  const params = JSON.parse(e.postData.contents);
  const Category = params.Category; //類別
  const Amount = params.Amount; //金額
  const date = new Date(); // 目前時間  
	const dateStr = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`; // 日期格式 yyyy/mm/dd  預設月份0-11 所以要+1
  
	//選擇試算表 MyID填入自己的ID
  const SpreadSheet = SpreadsheetApp.openById('MyID');  
	//選擇要編輯工作表
	const Sheet = SpreadSheet.getSheetByName('工作表');
  
	const LastRow = Sheet.getLastRow(); // 取得最後一行的行數
	//賦值
	Sheet.getRange(LastRow+1, 1).setValue(date); // 第A欄
  Sheet.getRange(LastRow+1, 2).setValue(Category); // 第B欄
  Sheet.getRange(LastRow+1, 3).setValue(Amount); // 第C欄

	const Expenses = Sheet.getRange(1, 6).getValue();// 設定花費
	return ContentService.createTextOutput('花費'+Expenses);// 回傳花費
}
```

### Step.3 在Apple 捷徑顯示

選擇顯示，變數URL內容
