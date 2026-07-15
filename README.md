# Landing page — Visiones de lo Sagrado

Sitio estático, responsivo y listo para publicar en GitHub Pages. No requiere servidor, base de datos ni instalación de dependencias.

## Publicación recomendada en GitHub Pages

Para conservar la página anterior, crea un repositorio nuevo llamado exactamente:

`visiones-de-lo-sagrado`

Así la dirección final será:

`https://exarcadomaronitacolombia.github.io/visiones-de-lo-sagrado/`

### Método sencillo: desde el navegador

1. Descomprime el archivo ZIP.
2. Entra a la organización `exarcadomaronitacolombia` en GitHub.
3. Crea un repositorio público nuevo llamado `visiones-de-lo-sagrado`.
4. En el repositorio, pulsa **Add file → Upload files**.
5. Sube **el contenido interno** de esta carpeta: `index.html`, `styles.css`, `script.js`, `.nojekyll`, `README.md` y la carpeta `assets`.
6. Escribe un mensaje como `Publicar landing Visiones de lo Sagrado` y pulsa **Commit changes**.
7. Ve a **Settings → Pages**.
8. En **Build and deployment**, selecciona **Deploy from a branch**.
9. Elige la rama **main**, carpeta **/(root)** y guarda.
10. Espera uno o dos minutos y abre la URL indicada arriba.

### Método por terminal

```bash
git init
git add .
git commit -m "Publicar landing Visiones de lo Sagrado"
git branch -M main
git remote add origin https://github.com/exarcadomaronitacolombia/visiones-de-lo-sagrado.git
git push -u origin main
```

Luego activa **Settings → Pages → Deploy from a branch → main / root**.

## Cómo actualizar información

- **Textos, fechas y precios:** edita `index.html`.
- **Colores, tamaños y diseño:** edita `styles.css`.
- **Números de WhatsApp y mensaje automático:** edita `index.html` y `script.js`.
- **Imágenes:** reemplaza los archivos dentro de `assets` conservando el mismo nombre.
- **URL definitiva:** si cambias el nombre del repositorio, actualiza las etiquetas `canonical`, `og:url` y `og:image` al comienzo de `index.html`.

## Datos que conviene confirmar antes de difundir

La pieza recibida no especifica:

- Sede o dirección.
- Horario de cada sesión.
- Docente o docentes.
- Medio y plazo de pago.
- Requisitos técnicos de la modalidad PAT.

La landing los remite por ahora a WhatsApp para evitar publicar información no confirmada.

## Formulario

El formulario no envía ni almacena datos en un servidor. Al pulsar **Continuar por WhatsApp**, abre una conversación con Laura o María y prepara el mensaje de inscripción.
