import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS!),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

export const appendToSheet = async (values: any[], range: string = 'Sheet1!A:Z') => {
  if (!SPREADSHEET_ID) {
    throw new Error('GOOGLE_SHEETS_SPREADSHEET_ID is not configured');
  }

  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [values],
      },
    });

    if (response.status !== 200) {
      throw new Error(`Failed to append to sheet: ${response.statusText}`);
    }

    return response.data;
  } catch (error: any) {
    console.error('Error appending to Google Sheets:', {
      message: error.message,
      code: error.code,
      errors: error.errors
    });
    throw new Error('Failed to append to Google Sheets. Check credentials and permissions.');
  }
};