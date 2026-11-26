# ⚖️ Auditoría Integral de Cumplimiento Legal, Privacidad y Accesibilidad (20 Puntos)
**Proyecto:** Plataforma Oficial de Posicionamiento Político y Participación Ciudadana — **John Fredy Polo Campos («John Polo»)** al Concejo de Ibagué 2027–2030 (`https://johnpoloconcejo2027.vercel.app/`)  
**Jurisdicción Principal:** República de Colombia (Municipio de Ibagué, Tolima)  
**Contexto verificado de la aplicación:**
- **¿Qué es?:** Plataforma web progresiva (PWA) de posicionamiento programático, buzón territorial de control político (13 comunas y 144 veredas), inscripción de voluntarios, generador de credencial ciudadana en `Canvas 2D` y asistente interactivo de consulta programática.
- **Países donde tiene usuarios:** Colombia.
- **¿Cobra pagos online?:** **No** (100% gratuita, sin pasarela de pagos, sin carrito de compras ni donaciones monetarias en línea).
- **¿Puede haber usuarios menores de edad?:** **No** (dirigida exclusivamente a ciudadanos mayores de 18 años habilitados para el ejercicio de derechos políticos).
- **¿Hay un chat o asistente con IA que responde a usuarios?:** **Antes:** No existía. **Ahora:** Se implementó el componente interactivo `JohnPoloAIChat.tsx` con aviso permanente de transparencia de IA.

---

## 📊 Resumen Ejecutivo de los 20 Puntos (Cómo Estaba vs. Cómo Quedó)

| # | Punto Auditado | Estado ANTES (Cómo estaba) | Estado DESPUÉS (Cómo quedó) | Archivo(s) y Línea(s) Clave |
| :-: | :--- | :---: | :---: | :--- |
| **1** | Términos y condiciones | **FALTA** | **CUMPLE** | `src/components/LegalPrivacyModal.tsx` (L198-L240), `CitizenMailbox.tsx` (L332-L361), `VolunteersSection.tsx` (L363-L393), `Footer.tsx` (L206-L241) |
| **2** | Sin costos ocultos | **CUMPLE** *(N/A Pagos)* | **CUMPLE** | `src/components/LegalPrivacyModal.tsx` (L209-L217) — Declaración expresa de gratuidad 100% |
| **3** | Botón para borrar mis datos | **FALTA** | **CUMPLE** | `src/components/LegalPrivacyModal.tsx` (L21-L34, L301-L366), `CitizenMailbox.tsx` (L372-L398), `Footer.tsx` (L234-L241) |
| **4** | Licencias de fotos y tipografías | **NO VERIFICABLE** *(Parcial)* | **NO VERIFICABLE** *(Documentado)* | `index.html` (L136-L140 Google Fonts OFL), `package.json` (`lucide-react` ISC), `public/images/*` (Requiere soporte escrito del fotógrafo) |
| **5** | Consentimiento en cada formulario | **FALTA** | **CUMPLE** | `src/components/CitizenMailbox.tsx` (L39, L81-L84, L330-L361), `src/components/VolunteersSection.tsx` (L24, L37, L363-L393) |
| **6** | Datos de la empresa / responsable visibles | **PARCIAL** | **CUMPLE** | `src/components/Footer.tsx` (L192-L205), `src/components/LegalPrivacyModal.tsx` (L243-L261) |
| **7** | Sin reseñas falsas | **CUMPLE** | **CUMPLE** | Todo `src/components/*` y `src/data/campaignData.ts` (No utiliza testimonios ficticios ni estrellas falsas) |
| **8** | Política de privacidad | **FALTA** | **CUMPLE** | `src/components/LegalPrivacyModal.tsx` (L136-L195) — Adaptada a la **Ley 1581 de 2012** y **Decreto 1377 de 2013** |
| **9** | Uso sin mouse (teclado) | **PARCIAL** | **CUMPLE** | `src/App.tsx` (L17-L22), `src/index.css` (L15-L25), `Navbar.tsx` (L11-L19, L82-L84), `CaballoLiberal.tsx` (L81-L89), `PillarsSection.tsx` (L447-L468) |
| **10** | Qué datos mandan las integraciones | **PARCIAL** | **CUMPLE** | `src/components/LegalPrivacyModal.tsx` (L263-L282) — Declaración de Google Fonts, WhatsApp `wa.me` y hosting Vercel |
| **11** | Botón de arrepentimiento | **CUMPLE** *(N/A Pagos)* | **CUMPLE** | No hay ventas online (Art. 47 Ley 1480/2011 no aplica a portal cívico gratuito; se ofrece revocatoria de Habeas Data en 1 clic) |
| **12** | Aviso de cookies / almacenamiento local | **FALTA** | **CUMPLE** | `src/components/CookieConsentBanner.tsx` (L1-L82), `CitizenMailbox.tsx` (L90-L99), `JohnPoloAIChat.tsx` (L234-L242) |
| **13** | Promesas que se puedan probar | **PARCIAL** | **CUMPLE** | `src/data/campaignData.ts` (L95-L142, L450-L479), `LegalPrivacyModal.tsx` (L227-L237) — Marco Art. 313 C.P. y MFMP 2026–2035 |
| **14** | Permiso de padres / Restricción menores | **FALTA** | **CUMPLE** | `CitizenMailbox.tsx` (L341), `VolunteersSection.tsx` (L374), `LegalPrivacyModal.tsx` (L177-L183) — Declaración obligatoria `>= 18 años` |
| **15** | No pedir datos de más (Minimización) | **CUMPLE** | **CUMPLE** | `CitizenMailbox.tsx` (L270-L315), `VolunteersSection.tsx` (L275-L333) — No pide cédula, dirección exacta ni ingresos |
| **16** | Link para darse de baja en cada mensaje | **PARCIAL** | **CUMPLE** | `LegalPrivacyModal.tsx` (L74-L77, L343-L364) — Flujo de baja en 1 clic por WhatsApp (`SOLICITUD DE SUPRESIÓN / BAJA`) |
| **17** | Sin trucos para que compren sin querer | **CUMPLE** | **CUMPLE** | No existen cobros, suscripciones ocultas ni *dark patterns* |
| **18** | Política de devoluciones | **CUMPLE** *(N/A Pagos)* | **CUMPLE** | `LegalPrivacyModal.tsx` (L209-L217) — Se deja constancia expresa de no comercialización |
| **19** | Texto alternativo en las imágenes | **CUMPLE** | **CUMPLE** | `Navbar.tsx` (L45), `HeroSection.tsx` (L64, L213, L238), `CaballoLiberal.tsx` (L102), `IbagueHighlights.tsx` (L46), `Footer.tsx` (L29) |
| **20** | Avisar cuando responde una IA | **N/A** *(No había chat)* | **CUMPLE** | `src/components/JohnPoloAIChat.tsx` (L28-L34, L326-L338, L355-L360) — Aviso permanente y etiqueta en cada burbuja de IA |

---

## 🔍 Detalle Punto por Punto (Auditoría Antes vs. Después)

### 1. Términos y condiciones
- **1. Estado:**
  - **ANTES:** **FALTA** (No existía documento ni modal de Términos y Condiciones de uso en toda la aplicación).
  - **DESPUÉS:** **CUMPLE**.
- **2. Dónde se vio:**
  - Antes: `src/components/Footer.tsx` (líneas 188–203 solo tenían un texto de copyright estático) y los formularios en `CitizenMailbox.tsx` y `VolunteersSection.tsx` no enlazaban a términos.
  - Después: Implementado en [src/components/LegalPrivacyModal.tsx](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/components/LegalPrivacyModal.tsx#L198-L240) (pestaña `terminos`), enlazado antes de enviar cada formulario en [CitizenMailbox.tsx](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/components/CitizenMailbox.tsx#L351-L357) y [VolunteersSection.tsx](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/components/VolunteersSection.tsx#L383-L389), y visible en [Footer.tsx](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/components/Footer.tsx#L210-L216).
- **3. Cambio concreto realizado:**
  - Se redactaron e integraron los Términos y Condiciones bajo legislación colombiana y se conectaron a la casilla de aceptación previa obligatoria en ambos formularios.

---

### 2. Sin costos ocultos
- **1. Estado:**
  - **ANTES:** **CUMPLE** (Por naturaleza del proyecto: no hay cobros ni pagos online).
  - **DESPUÉS:** **CUMPLE** (Reforzado contractualmente).
- **2. Dónde se vio:**
  - Verificado en todo `src/` y `package.json` (ausencia total de SDKs de pago como Wompi, PayU, MercadoPago o Stripe) y documentado explícitamente en [src/components/LegalPrivacyModal.tsx](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/components/LegalPrivacyModal.tsx#L209-L217).
- **3. Cambio concreto realizado:**
  - Se añadió la Cláusula 1 de los Términos y Condiciones dejando constancia expresa de que el portal y la descarga de la credencial ciudadana son **100% gratuitos** y no generan ningún cargo.

---

### 3. Botón para borrar mis datos
- **1. Estado:**
  - **ANTES:** **FALTA** (`CitizenMailbox.tsx` guardaba en `localStorage.setItem('jp_reports', ...)` en la línea 87 sin ningún botón en la interfaz para que el ciudadano pudiera borrar esos reportes locales ni solicitar la supresión de sus datos enviados por WhatsApp).
  - **DESPUÉS:** **CUMPLE**.
- **2. Dónde se vio:**
  - Antes: `src/components/CitizenMailbox.tsx` (líneas 80–90).
  - Después:
    - Función `clearAllLocalUserData()` y pestaña `borrar-datos` en [src/components/LegalPrivacyModal.tsx](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/components/LegalPrivacyModal.tsx#L21-L34).
    - Botón directo **«Borrar mis datos locales»** debajo del formulario en [src/components/CitizenMailbox.tsx](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/components/CitizenMailbox.tsx#L372-L398).
    - Botón **«Borrar Mis Datos»** en el pie de página [src/components/Footer.tsx](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/components/Footer.tsx#L234-L241) y en el menú lateral [src/components/Navbar.tsx](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/components/Navbar.tsx#L179-L189).
- **3. Cambio concreto realizado:**
  - Se implementó el borrado instantáneo en 1 clic de `jp_reports`, `jp_cookie_consent` y `jp_chat_history` del navegador, más un botón de **Solicitud Formal de Supresión (Art. 8 Ley 1581 de 2012 - Habeas Data)** vía WhatsApp.

---

### 4. Licencias de fotos y tipografías
- **1. Estado:**
  - **ANTES:** **NO VERIFICABLE** (para las fotografías reales) / **CUMPLE** (para fuentes e íconos).
  - **DESPUÉS:** **NO VERIFICABLE** en código respecto a contratos de fotografía, pero **CUMPLE y DOCUMENTADO** en la ficha legal para fuentes (`OFL 1.1`), íconos (`ISC License`) e ilustraciones propias.
- **2. Dónde se vio:**
  - Tipografías: `index.html` (líneas 136–140: `Montserrat` e `Inter` desde Google Fonts, licencia abierta **SIL Open Font License 1.1**).
  - Íconos: `package.json` (`lucide-react`, licencia **ISC / MIT**).
  - Fotografías e imágenes: `public/images/john-polo-poster.jpg`, `public/images/john-polo-territorio.jpg`, `public/images/ibague-banner.jpg`, `public/images/logo-jp.png` y `public/images/john-polo-sombrero-tolimense.png`.
- **3. Qué cambio se hizo y qué necesitamos que nos pases / verifiques:**
  - Se documentaron las licencias de software, fuentes e íconos en [src/components/LegalPrivacyModal.tsx](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/components/LegalPrivacyModal.tsx#L284-L297).
  - ⚠️ **Lo que debes conservar en carpeta física/digital de campaña (Derechos de Autor - Ley 23 de 1982 en Colombia):**
    1. Cesión o autorización escrita del fotógrafo que tomó las fotos de `john-polo-poster.jpg` y `john-polo-territorio.jpg`.
    2. Autorización de imagen si en alguna fotografía de territorio aparecen rostros identificables de terceros o menores de edad.

---

### 5. Consentimiento en cada formulario
- **1. Estado:**
  - **ANTES:** **FALTA** (Ni el formulario del Buzón Territorial en `CitizenMailbox.tsx` ni el de Voluntarios en `VolunteersSection.tsx` tenían casilla de autorización previa de tratamiento de datos personales conforme a la Ley 1581 de 2012).
  - **DESPUÉS:** **CUMPLE**.
- **2. Dónde se vio:**
  - Antes: `src/components/CitizenMailbox.tsx` (líneas 183–326) y `src/components/VolunteersSection.tsx` (líneas 271–368).
  - Después: [src/components/CitizenMailbox.tsx](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/components/CitizenMailbox.tsx#L330-L361) (`id="buzon-consent"`, estado inicial `false`) y [src/components/VolunteersSection.tsx](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/components/VolunteersSection.tsx#L363-L393) (`id="vol-consent"`, estado inicial `false`).
- **3. Cambio concreto realizado:**
  - Se agregaron casillas de verificación obligatorias (`required`), **desmarcadas por defecto (`useState(false)`)**, con validación en el `onSubmit` y enlaces directos a la Política de Privacidad (Ley 1581 de 2012) y los Términos de Uso.

---

### 6. Datos de la empresa / responsable visibles
- **1. Estado:**
  - **ANTES:** **PARCIAL** (Aparecía el nombre del candidato y el partido, pero faltaba el bloque formal de identificación del Responsable del Tratamiento de Datos exigido por el Art. 13 del Decreto 1377 de 2013 y la leyenda electoral de la Ley 1475 de 2011).
  - **DESPUÉS:** **CUMPLE**.
- **2. Dónde se vio:**
  - Después: [src/components/Footer.tsx](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/components/Footer.tsx#L192-L205) y pestaña `responsable` en [src/components/LegalPrivacyModal.tsx](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/components/LegalPrivacyModal.tsx#L243-L261).
- **3. Cambio concreto realizado (y nota para abogado electoral):**
  - Se hizo visible en el `Footer` y en el Centro Legal: nombre completo del candidato responsable (**John Fredy Polo Campos**), organización política (**Partido Liberal Colombiano**), domicilio (**Ibagué, Tolima, Colombia**), canal oficial de Habeas Data (**WhatsApp +57 310 309 3272**) y naturaleza del sitio.
  - ⚠️ **Para revisar con el contador/abogado electoral ante el CNE:** Una vez se inscriba formalmente el comité/gerente de campaña y el RUT o cuenta única ("Cuentas Claras" del CNE), agregar el número de acto administrativo o NIT de campaña en `Footer.tsx`.

---

### 7. Sin reseñas falsas
- **1. Estado:**
  - **ANTES:** **CUMPLE**.
  - **DESPUÉS:** **CUMPLE**.
- **2. Dónde se vio:**
  - Revisado en todos los componentes (`HeroSection.tsx`, `PillarsSection.tsx`, `CitizenMailbox.tsx`, `VolunteersSection.tsx`, `IbagueHighlights.tsx`, `Footer.tsx`).
- **3. Cambio concreto realizado:**
  - No fue necesario eliminar contenido porque la plataforma no contiene testimonios inventados ni calificaciones falsas. Cita únicamente referentes académicos verificables (Manfred Max-Neef, Amartya Sen y Mariana Mazzucato) en `src/data/campaignData.ts` (líneas 49–91).

---

### 8. Política de privacidad
- **1. Estado:**
  - **ANTES:** **FALTA** (No existía documento ni pantalla de Política de Tratamiento de Datos Personales).
  - **DESPUÉS:** **CUMPLE**.
- **2. Dónde se vio:**
  - Implementada en [src/components/LegalPrivacyModal.tsx](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/components/LegalPrivacyModal.tsx#L136-L195) y accesible desde el `Footer`, el `Navbar`, el `CookieConsentBanner`, el `JohnPoloAIChat` y los 2 formularios.
- **3. Cambio concreto realizado:**
  - Se redactó e integró la **Política de Tratamiento de Datos Personales conforme a la Ley Estatutaria 1581 de 2012 y el Decreto 1377 de 2013 (Colombia)**, detallando: datos recolectados, finalidad programática y territorial, prohibición de datos de menores, no transferencia a terceros comerciales y procedimiento gratuito para ejercer los derechos de Conocer, Actualizar, Rectificar y Suprimir (Habeas Data).

---

### 9. Uso sin mouse (teclado)
- **1. Estado:**
  - **ANTES:** **PARCIAL** (Faltaba enlace «Saltar al contenido principal», el Drawer de `Navbar.tsx` no cerraba con la tecla `Escape`, los `div` interactivos del sello en `HeroSection.tsx` y `CaballoLiberal.tsx` y las filas clicables `<tr>` de la matriz en `PillarsSection.tsx` no tenían `tabIndex={0}` ni soporte para `Enter`/`Espacio`, y 2 inputs de la tarjeta digital en `VolunteersSection.tsx` no tenían `id`/`htmlFor` asociados).
  - **DESPUÉS:** **CUMPLE** (Conforme a **NTC 5854 / WCAG 2.1 Nivel AA** en Colombia).
- **2. Dónde se vio:**
  - [src/App.tsx](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/App.tsx#L17-L22): Enlace `Saltar al contenido principal` (`sr-only focus:not-sr-only`).
  - [src/index.css](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/index.css#L15-L25): Anillo `:focus-visible` de alto contraste (`3px solid #D32F2F`).
  - [src/components/Navbar.tsx](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/components/Navbar.tsx#L11-L19): Cierre con tecla `Escape`, `aria-expanded` y `aria-controls`.
  - [src/components/HeroSection.tsx](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/components/HeroSection.tsx#L36-L44) y [L231-L245](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/components/HeroSection.tsx#L231-L245): Convertidos de `<div onClick>` a `<button type="button">` nativos accesibles por teclado.
  - [src/components/CaballoLiberal.tsx](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/components/CaballoLiberal.tsx#L81-L91): `role="button"`, `tabIndex={0}` y manejador `onKeyDown` (`Enter` / `Espacio`).
  - [src/components/PillarsSection.tsx](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/components/PillarsSection.tsx#L447-L468): Filas de la Matriz Estratégica navegables y activables con teclado (`tabIndex={0}`, `Enter` / `Espacio`).
  - [src/components/VolunteersSection.tsx](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/components/VolunteersSection.tsx#L431-L459): `htmlFor="cardNameInput"` y `htmlFor="cardComunaSelect"`.

---

### 10. Qué datos mandan las integraciones
- **1. Estado:**
  - **ANTES:** **PARCIAL** (El código no incluía trackers ocultos, pero tampoco declaraba al usuario qué servicios externos se invocaban).
  - **DESPUÉS:** **CUMPLE**.
- **2. Dónde se vio:**
  - Declarado detalladamente en la pestaña `responsable` («Responsable, Integraciones y Licencias») de [src/components/LegalPrivacyModal.tsx](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/components/LegalPrivacyModal.tsx#L263-L282).
- **3. Cambio concreto realizado:**
  - Se declaró de forma transparente el comportamiento de: (1) **Google Fonts** (`fonts.googleapis.com`), (2) **Enlace oficial de WhatsApp** (`wa.me`, activado solo por acción humana explícita) y (3) **Hosting en Vercel Inc.** (logs técnicos de red), confirmando que no se envían datos a píxeles publicitarios ocultos.

---

### 11. Botón de arrepentimiento
- **1. Estado:**
  - **ANTES:** **CUMPLE** *(No aplicable a ventas online porque no se vende nada)*.
  - **DESPUÉS:** **CUMPLE**.
- **2. Dónde se vio:**
  - Documentado en [src/components/LegalPrivacyModal.tsx](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/components/LegalPrivacyModal.tsx#L209-L217) y [L301-L366](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/components/LegalPrivacyModal.tsx#L301-L366).
- **3. Marco legal colombiano:**
  - En Colombia, el **Derecho de Retracto (Art. 47 de la Ley 1480 de 2011 - Estatuto del Consumidor)** aplica a ventas de bienes o prestación de servicios a distancia con cobro. Al ser una plataforma política y ciudadana 100% gratuita, no aplica retracto comercial; sin embargo, implementamos su equivalente en protección de datos: el **Botón de Revocatoria de Autorización y Supresión de Datos (Art. 8 Ley 1581 de 2012)**.

---

### 12. Aviso de cookies
- **1. Estado:**
  - **ANTES:** **FALTA** (La aplicación escribía en `localStorage` bajo la llave `jp_reports` sin aviso previo ni opción de rechazo).
  - **DESPUÉS:** **CUMPLE**.
- **2. Dónde se vio:**
  - Nuevo componente [src/components/CookieConsentBanner.tsx](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/components/CookieConsentBanner.tsx#L1-L82), integrado con [CitizenMailbox.tsx](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/components/CitizenMailbox.tsx#L90-L99) y [JohnPoloAIChat.tsx](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/components/JohnPoloAIChat.tsx#L234-L242).
- **3. Cambio concreto realizado:**
  - Se creó el banner inferior de privacidad con dos botones de igual jerarquía visual: **«Solo Esenciales (Rechazar opcionales)»** y **«Aceptar Todo»**. Si el usuario elige «Solo Esenciales», la aplicación borra y desactiva la persistencia opcional en `localStorage` (`jp_reports` y `jp_chat_history`).

---

### 13. Promesas que se puedan probar
- **1. Estado:**
  - **ANTES:** **PARCIAL** (Las cifras estaban sustentadas en el Documento Maestro y se explicaba el alcance de un Concejal según el Art. 313 C.P., pero faltaba la cláusula legal sobre el alcance de las estimaciones técnicas y presupuestales).
  - **DESPUÉS:** **CUMPLE**.
- **2. Dónde se vio:**
  - [src/data/campaignData.ts](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/data/campaignData.ts#L95-L142) (Competencia Funcional del Concejal: Iniciativa Normativa, Control Político y Presupuesto), [src/components/PillarsSection.tsx](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/components/PillarsSection.tsx#L161-L192) y Cláusula 3 de Términos en [src/components/LegalPrivacyModal.tsx](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/components/LegalPrivacyModal.tsx#L227-L237).
- **3. Cambio concreto realizado:**
  - Se dejó explícito que todas las cifras diagnósticas provienen del **Documento Maestro 2027–2030** y del **Marco Fiscal de Mediano Plazo (MFMP 2026–2035)**, y que las propuestas se ejecutan dentro de las competencias constitucionales del Concejo Municipal (**Art. 313 C.P. y Ley 136 de 1994**).

---

### 14. Permiso de los padres si hay menores
- **1. Estado:**
  - **ANTES:** **FALTA** (Aunque la plataforma no está dirigida a menores, no existía advertencia ni declaración de mayoría de edad en los formularios).
  - **DESPUÉS:** **CUMPLE**.
- **2. Dónde se vio:**
  - [src/components/CitizenMailbox.tsx](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/components/CitizenMailbox.tsx#L341), [src/components/VolunteersSection.tsx](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/components/VolunteersSection.tsx#L374), [src/components/Footer.tsx](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/components/Footer.tsx#L202) y Cláusula 3 de Privacidad en [src/components/LegalPrivacyModal.tsx](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/components/LegalPrivacyModal.tsx#L177-L183).
- **3. Cambio concreto realizado:**
  - En cumplimiento del **Art. 7 de la Ley 1581 de 2012 (Colombia)**, se restringió explícitamente el uso de los formularios a **ciudadanos mayores de 18 años** y se incorporó la declaración obligatoria `«Declaro que soy mayor de 18 años...»` en la casilla de consentimiento de ambos formularios.

---

### 15. No pedir datos de más (Principio de Minimización)
- **1. Estado:**
  - **ANTES:** **CUMPLE**.
  - **DESPUÉS:** **CUMPLE**.
- **2. Dónde se vio:**
  - [src/components/CitizenMailbox.tsx](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/components/CitizenMailbox.tsx#L270-L315) (solo pide nombre/JAC, comuna, reporte y teléfono *opcional*) y [src/components/VolunteersSection.tsx](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/components/VolunteersSection.tsx#L275-L333) (nombre, WhatsApp, comuna y rol).
- **3. Verificación:**
  - No se solicita número de cédula, fecha de nacimiento, dirección exacta de residencia, correo electrónico obligatorio ni datos sensibles o financieros.

---

### 16. Link para darse de baja en cada mail / mensaje
- **1. Estado:**
  - **ANTES:** **PARCIAL** (La app no envía correos comerciales automatizados porque no pide email; sin embargo, al usar WhatsApp como canal de contacto ciudadano, faltaba un mecanismo de 1 clic para solicitar la baja de listas de difusión de WhatsApp).
  - **DESPUÉS:** **CUMPLE**.
- **2. Dónde se vio:**
  - Implementado en [src/components/LegalPrivacyModal.tsx](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/components/LegalPrivacyModal.tsx#L74-L77) y [L343-L364](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/components/LegalPrivacyModal.tsx#L343-L364) («Enviar Solicitud de Baja por WhatsApp»).
- **3. Cambio concreto realizado:**
  - Se creó un enlace directo de 1 clic que abre WhatsApp con el mensaje prellenado `⚖️ SOLICITUD DE SUPRESIÓN DE DATOS (HABEAS DATA - LEY 1581 DE 2012)` para darse de baja inmediatamente de cualquier lista de difusión de campaña.

---

### 17. Sin trucos para que compren sin querer
- **1. Estado:**
  - **ANTES:** **CUMPLE**.
  - **DESPUÉS:** **CUMPLE**.
- **2. Dónde se vio:**
  - Revisado en toda la interfaz (`Navbar.tsx`, `HeroSection.tsx`, `PwaInstallBanner.tsx`, `CitizenMailbox.tsx`, `VolunteersSection.tsx`).
- **3. Verificación:**
  - No existen suscripciones ocultas, cobros automáticos ni patrones oscuros (*dark patterns*). El banner de instalación de la PWA ([src/components/PwaInstallBanner.tsx](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/components/PwaInstallBanner.tsx#L47-L62)) tiene botones claros de «Quizás luego» y «Cerrar (`X`)».

---

### 18. Política de devoluciones
- **1. Estado:**
  - **ANTES:** **CUMPLE** *(No aplicable por ausencia de ventas online)*.
  - **DESPUÉS:** **CUMPLE**.
- **2. Dónde se vio:**
  - Documentado explícitamente en [src/components/LegalPrivacyModal.tsx](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/components/LegalPrivacyModal.tsx#L209-L217).
- **3. Cambio concreto realizado:**
  - Se dejó constancia explícita en los Términos y Condiciones de que no se comercializan productos ni servicios ni se recaudan pagos, por lo cual no aplican políticas de devolución o reembolso.

---

### 19. Texto alternativo en las imágenes
- **1. Estado:**
  - **ANTES:** **CUMPLE**.
  - **DESPUÉS:** **CUMPLE** (Verificado al 100% incluyendo el nuevo avatar del Asistente IA).
- **2. Dónde se vio:**
  - `src/components/Navbar.tsx` (L45: `alt="Logo John Polo Concejo de Ibagué 2027-2030"`).
  - `src/components/HeroSection.tsx` (L64, L213, L238).
  - `src/components/CaballoLiberal.tsx` (L102: `alt="Caballo Galopando con Bandera Ondulante - John Polo Concejo 2027"`).
  - `src/components/VolunteersSection.tsx` (L477: `alt="Logo JP"`).
  - `src/components/IbagueHighlights.tsx` (L46: `alt="Ibagué merece sonar más fuerte - John Polo"`).
  - `src/components/Footer.tsx` (L29: `alt="Logo JP John Fredy Polo Campos"`).
  - `src/components/JohnPoloAIChat.tsx` (L290: `alt="Logo John Polo Asistente IA"`).

---

### 20. Avisar cuando responde una IA
- **1. Estado:**
  - **ANTES:** **N/A** (No existía chat ni asistente con IA).
  - **DESPUÉS:** **CUMPLE** (Implementado el chat interactivo solicitado por el usuario con triple aviso de transparencia de IA).
- **2. Dónde se vio:**
  - Nuevo componente [src/components/JohnPoloAIChat.tsx](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/components/JohnPoloAIChat.tsx#L1-L426), montado en [src/App.tsx](file:///c:/Juan_Naveros/CODE/jhon_polo_2027/src/App.tsx#L41).
- **3. Cambio concreto realizado:**
  - Se construyó el **Asistente Interactivo con IA de John Polo** capaz de responder preguntas sobre quién es John Polo («El Gerente Campesino»), los 7 Ejes Estratégicos, el Esquema Financiero 80-10-10, las 144 veredas, la Central de Acopio de la Calle 19, el IBAL (30 km/año y telemetría), el SETP + 2 Cables Aéreos, INFIBAGUÉ 75/25 y la obra específica para cada una de las **13 Comunas**.
  - Incluye **triple aviso de transparencia de IA**:
    1. En el botón flotante: `🤖 Asistente IA • 24/7`.
    2. En la franja fija superior de la ventana del chat: `Aviso de Transparencia IA: Te responde un asistente automatizado con Inteligencia Artificial, no una persona en vivo.`
    3. En el encabezado de cada burbuja de respuesta: `🤖 Respuesta generada por IA` + enlace directo para pasar a conversar con una **persona real en WhatsApp**.

---

## 🚨 Lista Priorizada Final (Riesgo Legal en Colombia vs. Experiencia de Usuario)

### Prioridad 1 — Riesgo Legal y Regulatorio en Colombia (Superintendencia de Industria y Comercio - SIC & Consejo Nacional Electoral - CNE)
1. **Protección de Datos Personales / Habeas Data (Ley 1581 de 2012 y Decreto 1377 de 2013):**
   - ✅ **Ya resuelto en el código:** Consentimiento previo sin premarcar en los 2 formularios (`CitizenMailbox.tsx` y `VolunteersSection.tsx`), Política de Tratamiento de Datos Personales, declaración de mayoría de edad (`>= 18 años`) y botón de supresión/baja.
   - ⚠️ **Acción operativa recomendada con tu abogado:** Mantener un archivo Excel/registro interno donde anotes cualquier número de WhatsApp que pida la **«BAJA»** para no volver a incluirlo en listas de difusión.
2. **Transparencia Electoral y Publicidad Política (Ley 1475 de 2011 y Resoluciones del CNE):**
   - ✅ **Ya resuelto en el código:** Ficha de identificación del responsable (**John Fredy Polo Campos**, aval **Partido Liberal Colombiano**, domicilio **Ibagué, Tolima**) en `Footer.tsx` y `LegalPrivacyModal.tsx`.
   - ⚠️ **Acción recomendada con tu contador/abogado electoral:** Cuando se abra oficialmente el periodo de inscripción y el aplicativo **«Cuentas Claras»** del CNE, reportar el gasto del dominio/producción digital si aplica y añadir el número de resolución o registro del comité en el `Footer`.
3. **Propiedad Intelectual y Derechos de Imagen (Ley 23 de 1982):**
   - ⚠️ **Pendiente documental fuera del código (`NO VERIFICABLE` desde el repositorio):** Guardar firmada la autorización de uso de imagen y cesión patrimonial del fotógrafo para las fotos reales en `public/images/john-polo-poster.jpg` y `public/images/john-polo-territorio.jpg`.

### Prioridad 2 — Experiencia de Usuario (UX), Confianza Ciudadana y Accesibilidad (NTC 5854 / WCAG 2.1 AA)
1. **Asistente Interactivo con IA y Transparencia (Punto 20):**
   - ✅ **Ya activo en la app (`JohnPoloAIChat.tsx`):** Permite a cualquier ciudadano preguntar por su comuna, barrio o cualquiera de los 7 Ejes las 24 horas, dejando claro en todo momento que habla con una IA y ofreciendo el botón para pasar a WhatsApp humano.
2. **Control del Ciudadano sobre su Almacenamiento Local y Cookies (Puntos 3 y 12):**
   - ✅ **Ya activo en la app (`CookieConsentBanner.tsx` y `LegalPrivacyModal.tsx`):** El usuario puede elegir «Solo Esenciales» y borrar sus reportes locales o el historial del chat en un solo clic.
3. **Navegación 100% con Teclado y Lectores de Pantalla (Puntos 9 y 19):**
   - ✅ **Ya activo en la app:** Enlace «Saltar al contenido principal», foco visible rojo de alto contraste (`:focus-visible`), cierre con `Escape` en el menú lateral, modal legal y chat IA, y soporte de teclado en todas las tarjetas interactivas y filas de la matriz estratégica.
