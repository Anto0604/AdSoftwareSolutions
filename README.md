# AD Software Solutions - Sitio Web Empresarial

Sitio web profesional para AD Software Solutions, empresa de desarrollo de software fundada por Marco Antonio Acosta López.

## 🚀 Características

- ✅ Diseño moderno y profesional
- ✅ 100% Responsive (móvil, tablet, desktop)
- ✅ Animaciones suaves y efectos visuales
- ✅ Navegación con scroll suave
- ✅ Formulario de contacto con validación
- ✅ Paleta de colores: Azul rey, Verde y Negro
- ✅ Optimizado para SEO
- ✅ Sin dependencias de frameworks
- ✅ Código limpio y comentado

## 📁 Estructura del Proyecto

```
PaginawebADsoftwaresolutions/
│
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript
└── README.md           # Este archivo
```

## 🎨 Secciones del Sitio

1. **Header/Navbar** - Navegación fija con efecto al hacer scroll
2. **Hero** - Sección principal con llamado a la acción
3. **Servicios** - Tarjetas con los servicios ofrecidos
4. **Nosotros** - Información sobre la empresa
5. **Contacto** - Formulario funcional de contacto
6. **Footer** - Información de contacto y enlaces

## 📧 Configuración del Formulario de Contacto

El formulario de contacto está configurado para enviar correos a: **aacostaantonio13@gmail.com**

### Opción 1: EmailJS (Recomendado - Frontend)

1. Crea una cuenta gratuita en [EmailJS](https://www.emailjs.com/)
2. Configura un servicio de email (Gmail, Outlook, etc.)
3. Crea una plantilla de email con estas variables:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{phone}}`
   - `{{message}}`
   - `{{to_email}}`

4. Agrega el SDK de EmailJS antes del cierre de `</body>` en `index.html`:

```html
<!-- EmailJS SDK -->
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
    (function(){
        emailjs.init("TU_PUBLIC_KEY");
    })();
</script>
```

5. En `script.js`, descomenta el código de EmailJS (líneas 138-160) y reemplaza:
   - `YOUR_SERVICE_ID` con tu Service ID
   - `YOUR_TEMPLATE_ID` con tu Template ID
   - `YOUR_PUBLIC_KEY` con tu Public Key

6. Comenta o elimina el código de simulación (líneas 163-179)

### Opción 2: PHP Backend

Si prefieres usar PHP, crea un archivo `send-email.php`:

```php
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $message = htmlspecialchars($_POST['message']);
    
    $to = "aacostaantonio13@gmail.com";
    $subject = "Nuevo mensaje de contacto - AD Software Solutions";
    $body = "Nombre: $name\nEmail: $email\nTeléfono: $phone\n\nMensaje:\n$message";
    $headers = "From: $email";
    
    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Error al enviar el email']);
    }
}
?>
```

Luego actualiza el código JavaScript en `script.js` para usar fetch con PHP.

## 🌐 Cómo Usar

### Desarrollo Local

1. Abre `index.html` directamente en tu navegador
2. O usa un servidor local como Live Server (VS Code extension)

### Publicación

Puedes publicar este sitio en:

- **GitHub Pages** (Gratis)
- **Netlify** (Gratis)
- **Vercel** (Gratis)
- **Hosting tradicional** (cPanel, etc.)

#### GitHub Pages:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tu-usuario/ad-software-solutions.git
git push -u origin main
```

Luego activa GitHub Pages en la configuración del repositorio.

## 📱 Información de Contacto

- **Empresa:** AD Software Solutions
- **Fundador:** Marco Antonio Acosta López
- **Email:** aacostaantonio13@gmail.com
- **WhatsApp:** 842-113-0341

## 🎯 Servicios Ofrecidos

1. Desarrollo de Software a Medida
2. Desarrollo Web Empresarial
3. Sistemas Administrativos y POS
4. Automatización de Procesos
5. Mantenimiento y Soporte Técnico

## 🛠️ Tecnologías Utilizadas

- HTML5
- CSS3 (Variables CSS, Flexbox, Grid, Animaciones)
- JavaScript Vanilla (ES6+)
- Google Fonts (Inter, Outfit)
- Font Awesome 6.5.1

## 📝 Personalización

### Cambiar Colores

Edita las variables CSS en `styles.css`:

```css
:root {
    --primary-blue: #1e40af;
    --primary-green: #10b981;
    --black: #0a0a0a;
    /* ... más variables */
}
```

### Modificar Contenido

Todo el contenido está en `index.html` y es fácilmente editable.

### Agregar Más Servicios

Duplica una tarjeta de servicio en la sección "Servicios" y modifica el contenido.

## 🔧 Mantenimiento

- Mantén actualizadas las dependencias externas (Font Awesome, Google Fonts)
- Revisa regularmente el funcionamiento del formulario de contacto
- Actualiza el contenido según sea necesario

## 📄 Licencia

© 2026 AD Software Solutions. Todos los derechos reservados.

Desarrollado por Marco Antonio Acosta López

---

**Nota:** Este sitio web está optimizado para todos los navegadores modernos y dispositivos móviles.
