# BEYOND THE FIGHT — From Barcelona to EVO

Web comercial bilingüe (ES/EN) para presentar a Kazukun, BlueKen y la creadora de contenido del equipo a marcas y conseguir patrocinadores.

> "BEYOND THE FIGHT" es una identidad provisional. El nombre, los claims y los enlaces se cambian en un único archivo: `config/site.ts`.

## Stack

- **Next.js 16** (App Router, `cacheComponents`, Turbopack) · React 19 · TypeScript estricto
- **Tailwind CSS v4** (tokens de diseño en `app/globals.css`)
- **next-intl** (rutas `/es` y `/en`, locale leído con `next/root-params`)
- **motion** (animaciones con soporte de `prefers-reduced-motion`) · **lucide-react**

## Requisitos

- **Node.js ≥ 20.9** (Next 16 no funciona con Node 18). El repo incluye `.nvmrc` → `nvm use`.

## Puesta en marcha

```bash
nvm use            # Node 22
npm install
cp .env.example .env.local   # y rellena las variables
npm run dev        # http://localhost:3000 → redirige a /es
```

Otros comandos:

```bash
npm run lint
npx tsc --noEmit
npm run build && npm start
```

## Variables de entorno

| Variable | Obligatoria | Uso |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | En producción | URL pública (sin `/` final). Canonical, Open Graph, `sitemap.xml`, `robots.txt`. Por defecto `http://localhost:3000`. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Recomendada | Email comercial. El formulario abre el cliente de correo (`mailto:`) dirigido a esta dirección. Vacía → la web muestra un estado explícito "no configurado". |
| `NEXT_PUBLIC_BOOKING_URL` | Opcional | Enlace para agendar una llamada de 15 minutos (Calendly, Cal.com…). Aparece en `/contact` y en las propuestas por marca. |
| `NEXT_PUBLIC_ANALYTICS` | Opcional | `true` activa Vercel Web Analytics (sin cookies). Actívalo también en el proyecto de Vercel. Registra visitas por página y eventos de conversión (copiar email, abrir correo, descargar media kit, agendar llamada). |
| `NEXT_PUBLIC_STYLE_NAV` | Opcional | `false` oculta la barra flotante de estilos (hazlo antes de enviar la web a marcas). |

El formulario **no envía datos a ningún servidor**. Para pasar a envío real (Resend, Formspree, etc.) habría que añadir una Server Action en `components/contact/` y documentar la nueva clave.

## Estructura

```
app/[locale]/(site)/     Páginas de producción: / team journey results content partners contact
app/[locale]/designs/    Propuestas de diseño A/B/C + comparador
app/sitemap.ts           Sitemap con alternates ES/EN
app/robots.ts
app/[locale]/opengraph-image.tsx   OG image tipográfica (sin fotos)
proxy.ts                 Detección de idioma y redirección (next-intl)
i18n/                    Routing, request config y navegación tipada
messages/es.json, en.json   Todos los textos de la web
config/site.ts           Nombre, claims, URL, email, redes, nº de registros
data/results.json        Resultados competitivos (fuente local tipada)
data/team.ts             Perfiles (fotos = null hasta tener fotos reales)
data/evo.ts              Datos editoriales de EVO, cada uno con su fuente
data/journey.ts          Años de la cronología
data/content.ts          Portfolio publicado (vacío a propósito)
lib/results/             Tipos, repositorio, filtros y estadísticas
components/              UI, secciones de home, resultados, contacto…
```

## Propuestas de diseño (`/designs`)

Cuatro direcciones visuales funcionales, con los mismos datos reales, para elegir antes de rediseñar la web de producción:

| Ruta | Dirección |
|---|---|
| `/designs` | Comparador (escritorio / móvil, las tres a la vez o una a una) |
| `/designs/esports` | A · Esports Elite |
| `/designs/editorial` | B · Sports Editorial |
| `/designs/underground` | C · FGC Underground |
| `/designs/neon` | D · Neon Chapters (inspirada en la referencia "Neon City") |

Código en `app/[locale]/designs/` y `components/designs/`. Las rutas llevan `noindex`. Cuando se elija una, se aplica a `app/[locale]/(site)/` y se elimina la carpeta `designs` (y el `DesignSwitcher`).

## Diseño principal y navegación de estilos

La web usa **C · FGC Underground** como diseño principal: paleta asfalto/papel/ácido/rojo y tipografías Dela Gothic One + JetBrains Mono (tokens en `app/globals.css`, fuentes en `app/[locale]/layout.tsx`). La home está en `components/underground/` e incluye además el resumen «En 30 segundos», los canales, la sección EVO, la temporada 2027 y el media kit. Las páginas internas heredan el tema a través de los tokens.
La home anterior (A · Esports Elite) sigue en `components/elite/`, y todas las propuestas siguen en `/designs`. La A conserva su paleta original mediante la clase `.theme-elite`.
La barra flotante inferior permite moverse entre la web principal, A, B, C, D y el comparador. **Desactívala antes de enviar la web a marcas** con `NEXT_PUBLIC_STYLE_NAV=false`.

### Criterio de las barras de resultados
`(participantes − posición) ÷ participantes`, por torneo (`lib/results/stats.ts → bracketBeaten`). start.gg publica posiciones empatadas, por eso se etiqueta como «bracket a su altura o por detrás». «Top X%» = posición ÷ participantes. Nunca se suman participantes de torneos distintos.

### Datos editables
| Archivo | Qué contiene |
|---|---|
| `data/social.ts` | Canales y métricas (solo cifras reales con fecha; `null` = no se muestra). YouTube: 497 suscriptores y 827 vídeos públicos a 13/10/2026. Twitch: añadir seguidores desde el panel de creador. |
| `data/next-challenge.ts` | Temporada 2027: objetivos (`status: "target"` hasta confirmar inscripción) y presupuesto por concepto (`null` = «en preparación»). |
| `data/media.ts` | Fotos (`/public/media/…`) y showreel de YouTube. Con `null` se muestra un marco diseñado, no un hueco. |

### Media kit PDF
Página imprimible en `/[locale]/media-kit` (A4, 3 páginas). Para regenerar los PDF de `public/media-kit/` después de cambiar datos o configurar el email:

```bash
npm run build && npm start          # en otra terminal
npm run media-kit                   # usa Chrome headless; MEDIA_KIT_BASE_URL=http://localhost:3000 por defecto
```

### Activar el formulario de contacto
Falta **`NEXT_PUBLIC_CONTACT_EMAIL`**. Añádelo en `.env.local` (o en Vercel → Environment Variables), vuelve a construir y regenera el media kit. En desarrollo, `/contact` muestra un aviso con lo que falta.

## Cómo actualizar contenido

### Añadir resultados

Edita `data/results.json`. Cada registro:

```json
{
  "id": "blueken-2026-evo-france-2026-fatal-fury-city-of-the-wolves-singles",
  "player": "blueken",            // "kazukun" | "blueken"
  "year": 2026,
  "date": null,                   // "YYYY-MM-DD" cuando se conozca (mejora el orden cronológico)
  "event": "EVO France 2026",
  "series": "evo-france",         // evo-las-vegas | evo-france | evo-online | hfsplay | other
  "game": "Fatal Fury: City of the Wolves",
  "placement": 49,
  "entrants": 227,
  "format": "singles",            // "singles" | "teams"
  "location": "Nice, France",     // o null si no está verificado
  "sourceUrl": "https://www.start.gg/user/ec511a2a/results",
  "needsReview": false,           // true = nombre abreviado pendiente de verificar
  "highlight": true               // aparece en la home / perfiles
}
```

Las estadísticas (ediciones EVO, mejores posiciones, por juego, por año) se recalculan solas. Si añades una nueva serie, añádela al tipo `Series` en `lib/results/types.ts`, a `SERIES_ORDER` en `lib/results/query.ts` y a `common.series` en ambos JSON de mensajes.

Cuando estén los 60 registros, actualiza también `documentedRecords` en `config/site.ts` si cambia el total.

**Migración futura a PostgreSQL / Strapi:** solo hay que reescribir `loadAll()` en `lib/results/repository.ts`; ningún componente lee el JSON directamente.

### Fotos reales

Copia las imágenes a `public/team/` y rellena `photo` en `data/team.ts`. Después sustituye `PhotoPlaceholder` por `next/image` en `components/home/team-intro.tsx` y `app/[locale]/team/page.tsx`. No uses imágenes de stock ni generadas presentadas como fotos del equipo.

### Creadora de contenido (Gise)

`creator` en `data/team.ts` (alias, redes) y la bio en `messages/*.json → teamPage.bios.creator`.

### Portfolio

Añade piezas reales a `contentItems` en `data/content.ts`. YouTube se incrusta con `youtube-nocookie`; TikTok e Instagram enlazan fuera (sus scripts de embed añaden tracking de terceros).

### Redes del equipo

`config/site.ts → social`. Las vacías no se muestran.

## Vender: propuestas por marca, informe y outreach

- **Propuesta por marca**: `/[locale]/proposal/<marca>` (no indexada, se comparte por enlace). Contenido en `data/proposals.ts`: por qué encajamos, ideas de activación con entregables, modalidad recomendada y qué se mediría. Ahora hay `pccomponentes`, `razer` y `hori`; para añadir una marca, copia una entrada. Sin logos ni relación implícita con la marca.
- **Informe post-evento**: `components/partners/report-sample.tsx`. Es la plantilla de lo que recibe un patrocinador, sin cifras inventadas; aparece en `/partners` y en cada propuesta.
- **Contacto**: email visible con botón de copiar (`components/contact/email-actions.tsx`), enlace para agendar llamada opcional y formulario `mailto` que admite `?company=` y `?type=`.
- **Medición**: con `NEXT_PUBLIC_ANALYTICS=true`, las visitas a cada `/proposal/<marca>` indican si la marca abrió su propuesta. Los eventos están en `lib/analytics.ts`.
- **Privacidad**: `/privacy`. Revisa el texto si cambias la analítica o añades envío de formulario por servidor.
- **Emails de contacto y seguimiento**: `docs/outreach.md` (ES/EN).

## Despliegue en Vercel

1. Sube el repo a GitHub/GitLab.
2. En Vercel: **Add New → Project** e importa el repo. Framework: Next.js (autodetectado).
3. **Settings → General → Node.js Version**: 22.x.
4. **Settings → Environment Variables**: añade `NEXT_PUBLIC_SITE_URL` (p. ej. `https://beyondthefight.gg`) y `NEXT_PUBLIC_CONTACT_EMAIL`.
5. Deploy. Al cambiar variables `NEXT_PUBLIC_*` hay que volver a desplegar (se incrustan en el build).
6. Añade el dominio en **Settings → Domains** y actualiza `NEXT_PUBLIC_SITE_URL`.

## Principios de contenido

- No se inventan resultados, métricas, patrocinadores ni fotos. Lo que falta se muestra como **Pendiente**.
- Los participantes de torneos distintos nunca se suman.
- Audiencia de EVO ≠ audiencia del equipo. Las cifras de EVO llevan su fuente.
- El equipo no tiene relación oficial con Evolution Championship Series (aviso en footer y sección EVO).

Datos pendientes: ver [`PENDING_DATA.md`](./PENDING_DATA.md).
