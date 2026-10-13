# Datos pendientes

Lista de lo que falta para tener la versión definitiva. La web funciona sin ello: cada hueco se muestra como "Pendiente".

## Prioridad alta (afecta a la conversión)

- [x] **Email comercial** → `jordigw@gmail.com` (valor por defecto en `lib/env.ts`; `NEXT_PUBLIC_CONTACT_EMAIL` lo sobrescribe).
- [ ] **Fotos reales** de Kazukun, BlueKen y Gise (retrato vertical 4:5, mínimo 1200 px de alto). Idealmente también fotos en EVO.
- [x] Alias de la creadora: **Gise**.
- [ ] **Gise**: bio propia, redes y 3–6 piezas de portfolio.
- [ ] **Enlace de agenda** (opcional) → `NEXT_PUBLIC_BOOKING_URL`.
- [ ] Activar **analítica** (`NEXT_PUBLIC_ANALYTICS=true` + Vercel Analytics) antes de enviar propuestas.
- [ ] Revisar las **propuestas por marca** (`data/proposals.ts`) y añadir las marcas a las que vayáis a escribir.
- [x] YouTube (@ElMovimentOndulatori) y Twitch (elmovimentondulatori) añadidos.
- [ ] **Seguidores de Twitch** (panel de creador) y, si existen, Instagram/TikTok → `data/social.ts`.
- [ ] **Presupuesto 2027** por concepto → `data/next-challenge.ts`.
- [ ] **Showreel** (ID de vídeo de YouTube) y fotos → `data/media.ts`.
- [ ] Regenerar el media kit (`npm run media-kit`) tras configurar el email.
- [ ] **Métricas propias reales** (seguidores, visualizaciones medias) para la propuesta comercial. La web no muestra ninguna hasta tenerlas.
- [ ] **Dominio** y `NEXT_PUBLIC_SITE_URL`.

## Resultados

- [ ] Importar los **40 registros restantes** (60 en total: Kazukun 16, BlueKen 44). Ahora solo están los 20 destacados del brief.
- [ ] Resultados de **2018–2020 y 2024**. La cronología marca 2024 como pendiente.
- [ ] **Fechas exactas** (`date`) de cada evento, para ordenar dentro del mismo año.
- [ ] **Ubicación** de HFSPlay 2025 y SNTKDD 9 (ahora "Por verificar").
- [ ] Verificar los nombres marcados con `needsReview: true`:
  - "EVO France 2025 – USF4" (¿side event oficial?)
  - "HFSPlay 2025" (3rd Strike por equipos, 9/15)
  - "SNTKDD 9" (nombre completo del torneo)
  - "Marvel Tōkon" (nombre comercial completo, p. ej. "MARVEL Tōkon: Fighting Souls")
  - "Avatar Legends" (nombre completo del juego)
- [ ] Confirmar que la lista de juegos y eventos de cada perfil (`data/team.ts`) es correcta, incluidos "Fighting Holidays" y "Power Rangers".
- [ ] Confirmar 2018 como inicio de BlueKen y si Kazukun tiene registros anteriores a 2022.

## Comercial

- [ ] Estrategia de **precios** por modalidad (ahora "Presupuesto a medida").
- [ ] Calendario de la **próxima temporada** (eventos objetivo y fechas) para la sección "Próxima temporada".
- [ ] Media kit en PDF descargable (opcional).
- [ ] Nombre e identidad definitivos (logo). Cambio en `config/site.ts`.

## Legal

- [x] Página de privacidad básica en `/privacy`.
- [ ] Revisar `/privacy` (y si hace falta, un aviso legal) con alguien de confianza antes del lanzamiento.
- [ ] Revisar con cada marca el uso de su logo antes de mostrarlo como partner.

## Fuentes EVO usadas (verificadas el 13/10/2026)

- 7.083 jugadores en SF6, EVO 2023 — https://www2.evo.gg/news/evo-2024-record
- 10.000+ competidores únicos, EVO 2024 — https://shacknews.com/article/140397/evo-2024-competitor-record-10000
- Origen 1996 (Battle by the Bay) y nombre EVO en 2002 — https://en.wikipedia.org/wiki/Evolution_Championship_Series
- EVO France 2025, 10–12 oct, Palais des Expositions (Niza) — https://webedia-group.com/news/corporate/evo-the-biggest-fighting-video-game-competition-is-coming-to-nice-in-october-2025/
- EVO France 2026, 9–11 oct, Niza — https://www.invenglobal.com/articles/24221/evo-france-2026-early-bird-registration-closes-event-set-for-october-9
- Evo Moment 37 (Guinness) — https://www.guinnessworldrecords.com/world-records/most-viewed-competitive-videogame-match

Nota: el primer anuncio oficial de EVO 2023 daba 7.061 inscritos en SF6; el recap posterior de EVO da 7.083 (coincide con start.gg).
