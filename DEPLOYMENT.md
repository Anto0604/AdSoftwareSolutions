# 🚀 Despliegue en GitHub Pages

## ✅ Código Subido Exitosamente

Tu sitio web de **AD Software Solutions** ha sido subido exitosamente a GitHub:
**https://github.com/Anto0604/AdSoftwareSolutions**

## 📝 Activar GitHub Pages

Para publicar tu sitio web en línea de forma gratuita, sigue estos pasos:

### Paso 1: Acceder a la Configuración del Repositorio

1. Ve a tu repositorio: https://github.com/Anto0604/AdSoftwareSolutions
2. Haz clic en **Settings** (Configuración) en la barra superior
3. En el menú lateral izquierdo, busca y haz clic en **Pages**

### Paso 2: Configurar GitHub Pages

1. En la sección **Source** (Fuente):
   - Selecciona la rama: **main**
   - Selecciona la carpeta: **/ (root)**
   - Haz clic en **Save** (Guardar)

2. Espera unos minutos (2-5 minutos aproximadamente)

3. Actualiza la página y verás un mensaje verde que dice:
   ```
   Your site is live at https://anto0604.github.io/AdSoftwareSolutions/
   ```

### Paso 3: Acceder a tu Sitio Web

Tu sitio estará disponible en:
**https://anto0604.github.io/AdSoftwareSolutions/**

## 🔧 Solución de Problemas Comunes

### Problema: Las imágenes no se ven

Si usaste rutas absolutas locales (como `C:\Users\...`), necesitas actualizar las rutas en `index.html`:

**Cambiar:**
```html
<img src="C:/Users/marco/.gemini/antigravity/brain/.../uploaded_media_1769813083854.png" alt="Logo">
```

**Por:**
```html
<img src="logo.png" alt="Logo">
```

Y coloca la imagen en la carpeta del proyecto, luego:
```bash
git add .
git commit -m "Fix image paths"
git push
```

### Problema: El sitio no se actualiza

1. Espera 5-10 minutos
2. Limpia la caché del navegador (Ctrl + Shift + R)
3. Verifica que GitHub Pages esté activado en Settings → Pages

## 🎨 Personalizar el Dominio (Opcional)

Si tienes un dominio propio (ejemplo: www.adsoftwaresolutions.com):

1. En **Settings → Pages**
2. En **Custom domain**, ingresa tu dominio
3. Configura los DNS de tu dominio apuntando a GitHub:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

## 📧 EmailJS - ✅ Configurado

El formulario de contacto ya está configurado con EmailJS y listo para usar:

- **Service ID**: `service_0u7ngnl`
- **Template ID**: `template_b0tdngh`
- **Public Key**: `cpBW9lq8p6TlyfwE5`

Los mensajes del formulario se enviarán automáticamente a: **aacostaantonio13@gmail.com**

### Verificar el Template en EmailJS

Asegúrate de que tu template en EmailJS incluya estas variables:
- `{{from_name}}` - Nombre del remitente
- `{{from_email}}` - Email del remitente
- `{{phone}}` - Teléfono del remitente
- `{{message}}` - Mensaje del remitente
- `{{to_email}}` - Email de destino (aacostaantonio13@gmail.com)

## 🔄 Actualizar el Sitio

Cada vez que hagas cambios:

```bash
git add .
git commit -m "Descripción de los cambios"
git push
```

Los cambios se reflejarán en tu sitio en 2-5 minutos.

## 📊 Agregar Google Analytics (Opcional)

1. Crea una cuenta en Google Analytics
2. Obtén tu código de seguimiento
3. Agrégalo en `index.html` antes de `</head>`
4. Sube los cambios con git

## ✨ Próximos Pasos

1. ✅ Activa GitHub Pages siguiendo los pasos anteriores
2. ⏳ Configura EmailJS para el formulario de contacto
3. 🎨 Personaliza el contenido según tus necesidades
4. 📱 Comparte tu sitio: https://anto0604.github.io/AdSoftwareSolutions/
5. 🌐 (Opcional) Configura un dominio personalizado

---

**¡Tu sitio web profesional está listo para el mundo!** 🎉
