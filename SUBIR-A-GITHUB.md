# Reemplazar la landing actual en GitHub Pages

## Antes de subir

Asegúrate de haber configurado Google Sheets y de haber pegado la URL `/exec` en `script.js`, siguiendo `CONFIGURAR-REGISTRO-DE-LEADS.md`.

## 1. Descomprimir el paquete

1. Descarga el ZIP actualizado.
2. Haz doble clic para descomprimirlo.
3. Abre la carpeta `visiones-de-lo-sagrado-actualizado`.
4. Debes subir el contenido de esa carpeta, no el ZIP.

## 2. Entrar al repositorio

1. Inicia sesión en GitHub.
2. Entra al repositorio existente:

```text
exarcadomaronitacolombia/visiones-de-lo-sagrado
```

3. Permanece en la pestaña **Code** y confirma que estás en la rama `main`.

## 3. Subir los archivos nuevos

1. Pulsa **Add file → Upload files**.
2. Selecciona o arrastra estos elementos desde la carpeta descomprimida:

```text
assets/
google-apps-script/
index.html
styles.css
script.js
README.md
CONFIGURAR-REGISTRO-DE-LEADS.md
SUBIR-A-GITHUB.md
robots.txt
sitemap.xml
```

3. GitHub mostrará los archivos existentes como modificados y los nuevos como añadidos.
4. En el mensaje del cambio escribe:

```text
Actualiza landing, fechas, logos y registro de leads
```

5. Selecciona **Commit directly to the main branch**.
6. Pulsa **Commit changes**.

### Sobre `.nojekyll`

El archivo `.nojekyll` ya debe existir en el repositorio. No necesitas volver a subirlo si el Mac lo mantiene oculto. No lo elimines.

## 4. Esperar la publicación

1. Abre la pestaña **Actions** del repositorio.
2. Espera a que `pages build and deployment` aparezca con un visto verde.
3. Abre:

```text
https://exarcadomaronitacolombia.github.io/visiones-de-lo-sagrado/
```

4. Haz una recarga completa del navegador:
   - Mac: `Command + Shift + R`
   - Windows: `Ctrl + F5`

## 5. Verificación final

Comprueba en computador y celular:

- El Curso I inicia el 13 de agosto.
- La clase del 10 de septiembre figura de 8:00 p.m. a 10:00 p.m.
- El nombre aparece como María Pérez Lizarazo.
- Se ve la dirección del Exarcado en Bogotá.
- Se ven los dos logos en la parte superior e inferior.
- La oferta muestra 16,7% de ahorro.
- El formulario guarda una fila en Google Sheets.
- WhatsApp se abre después del registro.

## Si GitHub no reemplaza una carpeta

Sube los archivos por partes:

1. Abre `assets` dentro del repositorio y usa **Add file → Upload files** para reemplazar las imágenes y añadir los logos.
2. Regresa a la raíz del repositorio y sube `index.html`, `styles.css`, `script.js` y los archivos Markdown.
3. Crea la carpeta `google-apps-script` subiendo `Codigo.gs` dentro de ella.
