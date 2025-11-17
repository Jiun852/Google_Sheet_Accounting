function doPost (e) {
  // 取得參數
  const params = JSON.parse(e.postData.contents);
  const Category = params.Category; //類別
  const Amount = params.Amount; //金額
  const date = new Date(); // 目前時間  
	const dateStr = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`; // 日期格式 yyyy/mm/dd  預設月份0-11 所以要+1
  
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