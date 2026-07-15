# Configurar el registro de leads en Google Sheets

Esta configuración se hace una sola vez. Después, cada envío del formulario se guarda como una fila nueva en una tabla privada de Google Sheets y se abre WhatsApp.

## 1. Crear la hoja de cálculo

1. Entra a Google Drive con la cuenta que administrará las inscripciones.
2. Pulsa **Nuevo → Hojas de cálculo de Google**.
3. Ponle como nombre: `Leads - Visiones de lo Sagrado`.

## 2. Instalar el código

1. Dentro de la hoja, abre **Extensiones → Apps Script**.
2. Se abrirá una pestaña nueva con un archivo llamado `Código.gs`.
3. Borra todo el contenido que aparece allí.
4. Abre el archivo `google-apps-script/Codigo.gs` incluido en esta carpeta.
5. Copia todo su contenido y pégalo en Apps Script.
6. Pulsa **Guardar**.

## 3. Crear y preparar la tabla

1. En la parte superior de Apps Script, abre el selector de funciones.
2. Selecciona `setupLeadsSheet`.
3. Pulsa **Ejecutar**.
4. Google solicitará autorización. Elige la cuenta administradora y acepta los permisos.
5. Regresa a la hoja de cálculo. Aparecerá una pestaña llamada **Leads**, con encabezados, filtro y columna de estado.

La tabla tendrá estas columnas:

- Fecha y hora
- Nombre completo
- Ciudad
- Correo electrónico
- Teléfono / WhatsApp
- Curso de interés
- Modalidad
- Asesor asignado
- WhatsApp del asesor
- Fuente, medio y campaña UTM
- Página de origen
- Autorización de datos
- Estado de seguimiento

## 4. Publicar el receptor de datos

1. En Apps Script, pulsa **Implementar → Nueva implementación**.
2. En tipo de implementación, selecciona **Aplicación web**.
3. Descripción: `Registro de leads Visiones de lo Sagrado`.
4. En **Ejecutar como**, selecciona **Yo**.
5. En **Quién tiene acceso**, selecciona **Cualquier persona**.
6. Pulsa **Implementar** y autoriza si Google vuelve a solicitarlo.
7. Copia la URL de la aplicación web. Debe terminar en `/exec`.

No uses una dirección terminada en `/dev`.

## 5. Conectar la landing

1. Abre el archivo `script.js`.
2. Al comienzo encontrarás:

```javascript
const CONFIG = {
  LEAD_ENDPOINT: 'PEGAR_AQUI_LA_URL_DE_GOOGLE_APPS_SCRIPT',
  SUBMISSION_TIMEOUT_MS: 12000
};
```

3. Reemplaza únicamente `PEGAR_AQUI_LA_URL_DE_GOOGLE_APPS_SCRIPT` por la URL `/exec` copiada en el paso anterior.
4. Conserva las comillas simples.
5. Guarda `script.js`.

Ejemplo:

```javascript
LEAD_ENDPOINT: 'https://script.google.com/macros/s/XXXXXXXXXXXX/exec',
```

## 6. Probar antes de difundir

1. Publica los archivos en GitHub siguiendo `SUBIR-A-GITHUB.md`.
2. Abre la landing en una ventana privada o de incógnito.
3. Envía un registro de prueba.
4. Verifica que:
   - se cree una fila nueva en la pestaña **Leads**;
   - el estado inicial sea **Nuevo**;
   - se abra WhatsApp con todos los datos;
   - el nombre del asesor elegido sea correcto.
5. Elimina la fila de prueba si no la necesitas.

## Seguimiento comercial recomendado

La columna **Estado de seguimiento** incluye estas opciones:

- Nuevo
- Contactado
- Inscrito
- No interesado
- Sin respuesta

Actualízala después de cada conversación. Esto permite saber cuántos leads entran, cuántos son contactados y cuántos terminan inscritos.

## Si se modifica el código de Apps Script

Cuando cambies `Codigo.gs`, debes actualizar la implementación:

1. **Implementar → Administrar implementaciones**.
2. Pulsa el lápiz de edición.
3. En versión, elige **Nueva versión**.
4. Pulsa **Implementar**.

La URL `/exec` normalmente seguirá siendo la misma.
