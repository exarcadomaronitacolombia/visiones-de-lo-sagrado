# Visiones de lo Sagrado — landing page actualizada

Landing estática preparada para GitHub Pages, con captura de leads en Google Sheets y continuación automática por WhatsApp.

## Cambios incluidos

- Se corrigió en toda la página el nombre **María Pérez Lizarazo**.
- Se actualizó el Curso I para iniciar el **13 de agosto de 2026**.
- La sesión final del Curso I, el **10 de septiembre**, aparece como clase de dos horas: **8:00 p.m. a 10:00 p.m.**
- Se añadió sede y horario presencial: **Exarcado Maronita Santa Rafqa de Colombia, carrera 50A #118-18, Bogotá D.C.**
- Se reforzó la sección de inversión: ahorro de **$200.000 COP**, equivalente al **16,7%**.
- Se añadió una sección académica encabezada por **Abouna Estéfano Mantilla Janer**, sacerdote católico maronita y teólogo.
- Se incorporaron los logos originales de Luz del Desierto y del Exarcado en la parte superior e inferior, sin editar sus archivos.
- El formulario ahora puede guardar cada lead en una tabla privada de Google Sheets antes de abrir WhatsApp.

## Estructura

```text
visiones-de-lo-sagrado-actualizado/
├── index.html
├── styles.css
├── script.js
├── .nojekyll
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── logo-luz-del-desierto-original.jpeg
│   ├── logo-exarcado-original.png
│   ├── abouna-estefano-mantilla-janer.jpg
│   └── ...
└── google-apps-script/
    └── Codigo.gs
```

## Configuración obligatoria del registro de leads

Lee el archivo `CONFIGURAR-REGISTRO-DE-LEADS.md`. El formulario no debe publicarse sin reemplazar la URL de ejemplo en `script.js` por la URL `/exec` de Google Apps Script.

## Publicación

Lee el archivo `SUBIR-A-GITHUB.md` para reemplazar la versión actual en el repositorio de GitHub Pages.
