function doGet() {
  const data = getSheetData();
  return ContentService.createTextOutput(data).setMimeType(ContentService.MimeType.JSON);
}

function getSheetData() {
  const ss = SpreadsheetApp.openById('1vz4LSQzXo5qIEQBYg9frGYttyhzql0SQ0koxbL_nolA'); // Your Google Sheet ID
  const sheet = ss.getSheetByName('Sheet1'); // Replace with your sheet name if different
  const range = sheet.getDataRange();
  const values = range.getValues();

  const headers = values[0]; // First row with headers
  const data = values.slice(1).map((row, index) => {
    let obj = { rowIndex: index + 2 }; // +2 because data starts from second row
    headers.forEach((header, idx) => {
      // Convert header to lowercase to match potential lowercase headers in the sheet
      obj[header.toLowerCase()] = row[idx]; 
    });
    return obj;
  });

  return JSON.stringify(data);
}

function doPost(e) {
  const { rowIndex, name, email, event, id } = e.parameter; // Changed 'ID' to 'id' to match common JavaScript conventions
  const ss = SpreadsheetApp.openById('1vz4LSQzXo5qIEQBYg9frGYttyhzql0SQ0koxbL_nolA');
  const sheet = ss.getSheetByName('Sheet1');

  // Update the row with new data (assuming columns A, B, C, D, E)
  sheet.getRange(`A${rowIndex}`).setValue(rowIndex - 1); // Serial No. (calculated)
  sheet.getRange(`B${rowIndex}`).setValue(name);
  sheet.getRange(`C${rowIndex}`).setValue(email);
  sheet.getRange(`D${rowIndex}`).setValue(event);
  sheet.getRange(`E${rowIndex}`).setValue(id); // Changed 'ID' to 'id'

  return ContentService.createTextOutput(JSON.stringify({ status: 'success' })).setMimeType(ContentService.MimeType.JSON);
}
