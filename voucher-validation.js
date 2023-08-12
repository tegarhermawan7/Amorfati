// Import necessary modules and JSON
const google = require('googleapis');
const secretKey = require('https://raw.githubusercontent.com/tegarhermawan7/Amorfati/main/voucher-395717-73dcfd7a3f7b.json');

// Define JWT client
const jwtClient = new google.auth.JWT(
  secretKey.client_email,
  null,
  secretKey.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);

// Authenticate request
jwtClient.authorize(function (err, tokens) {
 if (err) {
   console.log(err);
   return;
 } else {
   console.log("Successfully connected!");
 }
});

// Function to validate voucher
function validateVoucher() {
  const voucherNumber = document.getElementById('voucherNumber').value;
  const spreadsheetId = '1hiHsVNMYHM6mUSEneKNUTzWUJsdSTqkDUYfcNo3zBaA';
  const sheetRange = 'Voucher!A:A';
  const sheets = google.sheets('v4');
  
  sheets.spreadsheets.values.get({
    auth: jwtClient,
    spreadsheetId: spreadsheetId,
    range: sheetRange
  }, function (err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
    } else {
      const voucherNumbers = response.data.values.flat();
      const isValid = voucherNumbers.includes(voucherNumber);
      const validationResult = document.getElementById('validationResult');
      validationResult.textContent = isValid ? 'Voucher valid!' : 'Voucher tidak valid!';
    }
  });
}
