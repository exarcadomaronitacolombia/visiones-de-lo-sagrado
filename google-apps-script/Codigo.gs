/**
 * VISONES DE LO SAGRADO — CAPTURA DE LEADS EN GOOGLE SHEETS
 *
 * INSTRUCCIONES:
 * 1. Crea una hoja de cálculo nueva en Google Sheets.
 * 2. Ve a Extensiones > Apps Script.
 * 3. Reemplaza el contenido de Código.gs por este archivo.
 * 4. Ejecuta manualmente setupLeadsSheet() una vez y autoriza los permisos.
 * 5. Implementa como Aplicación web:
 *    - Ejecutar como: Yo
 *    - Quién tiene acceso: Cualquier persona
 * 6. Copia la URL que termina en /exec y pégala en script.js.
 */

const SHEET_NAME = 'Leads';
const STATUS_VALUES = ['Nuevo', 'Contactado', 'Inscrito', 'No interesado', 'Sin respuesta'];
const HEADERS = [
  'Fecha y hora',
  'Nombre completo',
  'Ciudad',
  'Correo electrónico',
  'Teléfono / WhatsApp',
  'Curso de interés',
  'Modalidad',
  'Asesor asignado',
  'WhatsApp del asesor',
  'Fuente UTM',
  'Medio UTM',
  'Campaña UTM',
  'Página de origen',
  'Autorización de datos',
  'Estado de seguimiento'
];

function setupLeadsSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) {
    throw new Error('Abre este script desde una hoja de cálculo de Google Sheets y vuelve a ejecutar la función.');
  }

  PropertiesService.getScriptProperties().setProperty('SPREADSHEET_ID', spreadsheet.getId());
  const sheet = getOrCreateLeadsSheet_(spreadsheet);
  formatSheet_(sheet);

  SpreadsheetApp.getUi().alert(
    'Configuración completada',
    'La tabla “Leads” está lista. Ahora implementa el script como Aplicación web y copia la URL /exec.',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

function doPost(e) {
  try {
    const parameters = e && e.parameter ? e.parameter : {};

    // Campo trampa para bots. Si viene lleno, se ignora la solicitud sin guardar datos.
    if (parameters.website) {
      return response_('Solicitud procesada.');
    }

    const requiredFields = ['name', 'city', 'email', 'phone', 'course', 'modality'];
    const missingField = requiredFields.find(function (field) {
      return !String(parameters[field] || '').trim();
    });

    if (missingField) {
      return response_('Faltan datos obligatorios.');
    }

    const spreadsheetId = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
    if (!spreadsheetId) {
      throw new Error('Primero debes ejecutar setupLeadsSheet().');
    }

    const lock = LockService.getScriptLock();
    lock.waitLock(20000);

    try {
      const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
      const sheet = getOrCreateLeadsSheet_(spreadsheet);
      const row = [
        new Date(),
        safeCell_(parameters.name),
        safeCell_(parameters.city),
        safeCell_(parameters.email),
        safeCell_(parameters.phone),
        safeCell_(parameters.course),
        safeCell_(parameters.modality),
        safeCell_(parameters.advisorName),
        safeCell_(parameters.advisor),
        safeCell_(parameters.utmSource),
        safeCell_(parameters.utmMedium),
        safeCell_(parameters.utmCampaign),
        safeCell_(parameters.pageUrl),
        safeCell_(parameters.consent || 'Sí'),
        'Nuevo'
      ];

      sheet.appendRow(row);
      const insertedRow = sheet.getLastRow();
      sheet.getRange(insertedRow, 1).setNumberFormat('yyyy-mm-dd hh:mm:ss');
      sheet.getRange(insertedRow, 15).setDataValidation(
        SpreadsheetApp.newDataValidation()
          .requireValueInList(STATUS_VALUES, true)
          .setAllowInvalid(false)
          .build()
      );

      return response_('Datos registrados correctamente.');
    } finally {
      lock.releaseLock();
    }
  } catch (error) {
    console.error(error);
    return response_('No fue posible registrar los datos. Revisa la configuración del formulario.');
  }
}

function doGet() {
  return response_('Servicio de registro de Visiones de lo Sagrado activo.');
}

function getOrCreateLeadsSheet_(spreadsheet) {
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  const currentHeaders = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const headersAreMissing = HEADERS.some(function (header, index) {
    return currentHeaders[index] !== header;
  });

  if (headersAreMissing) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }

  return sheet;
}

function formatSheet_(sheet) {
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, HEADERS.length)
    .setFontWeight('bold')
    .setBackground('#553887')
    .setFontColor('#ffffff')
    .setHorizontalAlignment('center');

  const widths = [150, 190, 120, 210, 150, 240, 150, 170, 150, 120, 120, 150, 260, 150, 150];
  widths.forEach(function (width, index) {
    sheet.setColumnWidth(index + 1, width);
  });

  if (!sheet.getFilter()) {
    sheet.getRange(1, 1, Math.max(sheet.getMaxRows(), 2), HEADERS.length).createFilter();
  }

  sheet.getRange('A:A').setNumberFormat('yyyy-mm-dd hh:mm:ss');
  sheet.getRange('A:O').setVerticalAlignment('middle');
}

function safeCell_(value) {
  const text = String(value || '').trim().slice(0, 500);
  // Evita que un texto del formulario se interprete como fórmula en Google Sheets.
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function response_(message) {
  return HtmlService
    .createHtmlOutput(
      '<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Registro</title></head>' +
      '<body style="font-family:Arial,sans-serif;padding:24px;text-align:center"><p>' + escapeHtml_(message) + '</p></body></html>'
    )
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function escapeHtml_(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
