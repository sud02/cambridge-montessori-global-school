/**
 * Cambridge Montessori Global — Scholarship Exam 2026
 * Google Apps Script Web App that receives registrations from the website
 * and appends each row to the bound Google Sheet.
 *
 * Payment-proof screenshots are uploaded directly from the browser to
 * Vercel Blob (see api/upload-proof.js). This webhook only receives the
 * resulting public URL and writes it into the sheet.
 *
 * SETUP
 *   1. Create a Google Sheet, e.g. "CMG Scholarship Registrations 2026".
 *   2. Sheet > Extensions > Apps Script. Replace Code.gs with this file.
 *   3. Deploy > New deployment > Type: Web app
 *        - Execute as: Me
 *        - Who has access: Anyone
 *      Copy the Web App URL.
 *   4. In project root create a `.env` file (gitignored):
 *        REACT_APP_SHEETS_ENDPOINT=https://script.google.com/macros/s/XXXX/exec
 *      Restart `npm start` so CRA picks up the env var.
 */

const HEADERS = [
  'submittedAt',
  'studentName',
  'parentName',
  'class',
  'mobile',
  'email',
  'previousSchool',
  'paymentProofName',
  'paymentProofUrl',
  'enquired',
];

function doPost(e) {
  try {
    const p = e.parameter || {};
    const sheet = ensureSheet_();

    sheet.appendRow([
      p.submittedAt      || new Date().toISOString(),
      p.studentName      || '',
      p.parentName       || '',
      p.class            || '',
      p.mobile           || '',
      p.email            || '',
      p.previousSchool   || '',
      p.paymentProofName || '',
      p.paymentProofUrl  || '',
      p.enquired         || '',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('CMG Scholarship endpoint is live.');
}

function ensureSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Registrations') || ss.insertSheet('Registrations');
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}
