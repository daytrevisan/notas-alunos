const { google } = require('googleapis');
const sheets = google.sheets('v4');
const express = require('express');
const app = express();

app.listen(3001, (req,res) => {console.log('running on port 3001')})

const spreadsheetId = '1lP3iUdkqeRPsYk_JmpVOapW0D0DtCMQmTQ5BQ-gAJQg';
const range = 'engenharia_de_software!C4:H27';

async function getAuthSheets() {

    const auth = new google.auth.GoogleAuth({
        keyFile: './credentials.json',
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        discoveryDocs: 'https://sheets.googleapis.com/$discovery/rest?version=v4',
    });

    const client = await auth.getClient();

    const googleSheets = google.sheets({
        version: "v4",
        auth: client
    })

    const spreadsheetId = '1lP3iUdkqeRPsYk_JmpVOapW0D0DtCMQmTQ5BQ-gAJQg';

    return(
        auth,
        client,
        googleSheets,
        spreadsheetId
    );
}

async function readSheet() {
  const auth = await getAuthSheets();

  try {
    const response = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range,
    });

    const values = response.data.values;

    if (values.length) {
      processSheetData(values);
    } else {
      console.log('No data found.');
    }
  } catch (error) {
    console.error('Error reading sheet:', error);
  }
}

function processSheetData(values) {
  values.forEach((row, index) => {
    const faltas = parseInt(row[0]);
    const p1 = parseFloat(row[1]);
    const p2 = parseFloat(row[2]);
    const p3 = parseFloat(row[3]);

    const media = (p1 + p2 + p3) / 3;
    const porcentagemFaltas = (faltas / 25) * 100;

    let status = '';
    let notaFinal = '';

    if (porcentagemFaltas > 25) {
      status = 'Reprovado por falta';
    } else if (media < 5) {
      status = 'Reprovado por nota';
    } else if (media >= 5 && media < 7) {
      status = 'Exame final';
    } else {
      status = 'Aprovado';
    }

    if (status === 'Aprovado' || status === 'Exame final') {
      notaFinal = media;
    }

    updateSheet(index + 4, 6, status); // Coluna G
    updateSheet(index + 4, 7, notaFinal); // Coluna H
  });
}

async function updateSheet(row, col, value) {
  const auth = await getAuth();

  try {
    await sheets.spreadsheets.values.update({
      auth,
      spreadsheetId,
      range: `engenharia_de_software!H${row}`,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[value]],
      },
    });
    console.log(`Cell H${row} updated with ${value}`);
  } catch (error) {
    console.error('Error updating sheet:', error);
  }
}

readSheet();

// Autenticação

const YOUR_CLIENT_ID = '704387211427-i50clrscreet1ggegru1i80t49dm0g63.apps.googleusercontent.com';
const YOUR_CLIENT_SECRET = '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';
const YOUR_REDIRECT_URL = 'http://localhost:3001/oauth2callback';

const YOUR_TOKEN_PATH = 'https://oauth2.googleapis.com/token';

async function getAuth() {
  const credentials = {
    client_id: YOUR_CLIENT_ID,
    client_secret: YOUR_CLIENT_SECRET,
    redirect_uris: [YOUR_REDIRECT_URL],
  };

  const oAuth2Client = new auth.OAuth2(
    credentials.client_id,
    credentials.client_secret,
    credentials.redirect_uris[0]
  );

  try {
    const token = require(YOUR_TOKEN_PATH);
    oAuth2Client.setCredentials(token);
  } catch (error) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    console.log('Authorize this app by visiting this URL:', authUrl);
    const code = 'YOUR_AUTHORIZATION_CODE';

    const token = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(token);

    require('fs').writeFileSync(YOUR_TOKEN_PATH, JSON.stringify(token));
  }

  return oAuth2Client;
}

module.exports = getAuth;