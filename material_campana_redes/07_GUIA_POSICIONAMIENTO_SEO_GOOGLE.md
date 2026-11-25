# 🚀 Guía Paso a Paso para Posicionar a John Polo #1 en Google
**URL Oficial en Producción (Vercel):** `https://johnpoloconcejo2027.vercel.app/`  
**Objetivo:** Que cualquier ciudadano en Ibagué o Colombia que busque en Google **«john polo»**, **«jhon polo»**, **«john pollo»**, **«jhon pollo»** o **«john fredy polo»** encuentre la página en el **primer lugar (#1)** lista para ingresar.

---

## ✅ 1. Lo que YA quedó implementado en el código de la página

Estos ajustes técnicos ya fueron aplicados y compilados en tu proyecto:

1. **[index.html](../index.html)**
   - **Etiqueta `<title>` y `<meta name="description">`:** Optimizadas con el nombre oficial (`John Polo`, `John Fredy Polo Campos`) y las variaciones fonéticas y de escritura reales (`Jhon Polo`, `John Pollo`, `Jhon Pollo`, `El Gerente Campesino`, `Concejo de Ibagué 2027–2030`).
   - **Canonical y Open Graph oficiales:** Apuntando directamente a `https://johnpoloconcejo2027.vercel.app/`.
   - **Datos Estructurados `Schema.org JSON-LD` (`Person`, `WebSite` y `FAQPage`):** Le indican explícitamente al motor de Google que `John Polo`, `Jhon Polo` y `John Pollo` son la misma figura pública en Ibagué, Tolima, y habilitan las preguntas frecuentes desplegables en los resultados de búsqueda.
   - **Contenido Semántico Pre-renderizado dentro de `<div id="root">`:** Permite que el robot de Google (`Googlebot`) lea todo el texto de los 7 Ejes Estratégicos en el primer milisegundo, antes incluso de ejecutar JavaScript.
   - **Geo-SEO Local (`CO-TOL`):** Coordenadas de Ibagué (`4.4389, -75.2322`) para máxima prioridad en búsquedas hechas desde Ibagué y el Tolima.
2. **[public/sitemap.xml](../public/sitemap.xml) y [public/robots.txt](../public/robots.txt)**
   - Configurados con la URL `https://johnpoloconcejo2027.vercel.app/sitemap.xml`, indexando la plataforma principal y los PDFs oficiales del Documento Maestro.
3. **[vercel.json](../vercel.json)**
   - Configurado con la cabecera `X-Robots-Tag: index, follow` (para asegurar que Vercel nunca bloquee la indexación en el subdominio `.vercel.app`) y excluyendo `/sitemap.xml` y `/robots.txt` del rewrite de React para que Google los lea con su `Content-Type` exacto.

---

## 📋 2. Lo que HACE FALTA hacer ahora (Checklist de 5 Pasos)

### PASO 1: Subir estos últimos cambios de SEO a GitHub para que Vercel actualice la URL en vivo (2 minutos)
Como tu proyecto está conectado a GitHub (`jnaveros40/jhon_polo_2027`) y desplegado en Vercel, ejecuta en tu terminal:

```powershell
git add index.html vercel.json public/robots.txt public/sitemap.xml src/
git commit -m "feat(seo): configurar SEO tecnico, Schema.org JSON-LD y sitemap para johnpoloconcejo2027.vercel.app"
git push origin main
```
*(Apenas hagas `git push`, Vercel actualizará `https://johnpoloconcejo2027.vercel.app/` en ~30 segundos).*

---

### PASO 2: Dar de alta la página en Google Search Console (¡El paso más importante! — 5 minutos)
Sin este paso, Google puede tardar semanas en descubrir una URL nueva `.vercel.app`. Con este paso, la indexa en **24 a 48 horas**:

1. Entra a **[Google Search Console](https://search.google.com/search-console/welcome)** con tu cuenta de Gmail.
2. En las dos cajas que aparecen, elige la de la derecha: **«Prefijo de la URL»** (NO elijas "Dominio", porque `vercel.app` es compartido).
3. Escribe exactamente:
   ```text
   https://johnpoloconcejo2027.vercel.app/
   ```
   y haz clic en **Continuar**.
4. **Verificación de propiedad:**
   - Google te mostrará varios métodos. Despliega la opción **«Etiqueta HTML»** (*Add a meta tag to your site's home page*).
   - Te dará una línea parecida a esta:
     ```html
     <meta name="google-site-verification" content="CODIGO_QUE_TE_DA_GOOGLE" />
     ```
   - **Pásame ese código aquí en el chat** (o pégalo debajo de `<head>` en `index.html`, haz `git push`, y dale al botón **«Verificar»** en Google Search Console).
5. **Enviar el Sitemap y forzar la indexación:**
   - Una vez verificado, en el menú izquierdo de Search Console entra a **«Sitemaps»**, escribe `sitemap.xml` y haz clic en **Enviar**.
   - Luego ve a la barra de búsqueda superior de Search Console (*«Inspeccionar cualquier URL...»*), pega `https://johnpoloconcejo2027.vercel.app/`, presiona Enter y haz clic en **«Solicitar indexación»**.

---

### PASO 3: Crear enlaces hacia la web desde todas las Redes Sociales (Backlinks de Autoridad — 10 minutos)
Google decide qué página poner de **#1** cuando alguien escribe **«john polo»** o **«john pollo»** mirando cuántos perfiles reales enlazan a `https://johnpoloconcejo2027.vercel.app/`.

Coloca el enlace `https://johnpoloconcejo2027.vercel.app/` en el campo **«Sitio web»** de:
- [ ] **Instagram Oficial de John Polo** (en la biografía).
- [ ] **Página de Facebook / Fan Page de John Polo** (en la sección "Información -> Sitio web" y en una publicación fijada arriba).
- [ ] **TikTok Oficial de John Polo** (en el perfil y en el primer comentario de los videos).
- [ ] **Canal de YouTube / Shorts** (crea un canal con el nombre `John Polo - Concejo de Ibagué 2027` y pon el enlace `https://johnpoloconcejo2027.vercel.app/` en la descripción: YouTube es propiedad de Google y posiciona en menos de 24 horas).
- [ ] **WhatsApp Business** (en el perfil de empresa, campo Sitio Web).

> 💡 **Texto recomendado para la biografía de todas las redes:**
> ```text
> John Polo (John Fredy Polo Campos) 🐎🚩
> «El Gerente Campesino» al Concejo de Ibagué 2027–2030 | Partido Liberal
> 🎵 ¡Ibagué merece sonar más fuerte!
> 👇 Conoce nuestro Plan de 7 Ejes y reporta tu comuna:
> https://johnpoloconcejo2027.vercel.app/
> ```

---

### PASO 4: Crear la Ficha Gratuita en Google Perfil de Empresa / Google Maps (10 minutos)
Cuando alguien busca un nombre propio en Google desde Ibagué, lo primero que muestra Google arriba de todo es la ficha local:

1. Entra a **[Google Business Profile](https://business.google.com/)**.
2. Crea un perfil con estos datos exactos:
   - **Nombre:** `John Polo - Concejo de Ibagué 2027 (John Fredy Polo)`
   - **Categoría:** `Organización política` o `Figura pública`
   - **Ubicación / Área de servicio:** `Ibagué, Tolima, Colombia`
   - **Teléfono:** `+57 310 309 3272`
   - **Sitio web:** `https://johnpoloconcejo2027.vercel.app/`
3. Sube allí los **5 nuevos posts con el sombrero tolimense** y el **póster oficial**.

---

### PASO 5: (Opcional pero Muy Recomendado) Conectar un Dominio `.com` o `.co` Propio en Vercel
Aunque `https://johnpoloconcejo2027.vercel.app/` indexa perfectamente en Google, tener un dominio propio corto como **`johnpolo.co`** o **`johnpolo2027.com`** (~$45.000 COP/año):
1. Es mucho más fácil de recordar en radio, perifoneo, gorras y volantes.
2. Tiene mayor peso de marca en Google Colombia (`.co`).
3. En Vercel se conecta en 2 clics (*Project Settings -> Domains*) sin cambiar nada del código ni pagar hosting adicional.
