# Cloud Skin Clinic + Wellness — Design System

An integrated identity, component, and content system for **Cloud Skin Clinic + Wellness**, an aesthetics clinic in Baguio City, Philippines. The system spans two production surfaces:

| Product            | Audience          | Primary action           | Source repo |
| ------------------ | ----------------- | ------------------------ | ----------- |
| **Marketing Site** | Patients / public | "Book Now" (teal pill)   | `joelgabatin/Cloudskinclinicwellnesswebsite` |
| **Staff Portal**   | Admin / Practitioner / Receptionist | "Sign In" (deep-blue) | `iamredeemedjn316-cell/CloudSkinAdmin` (mirror: `joelgabatin/Cloudskinclinicwellnessadminwebsite`) |

A linked Figma source exists at `https://www.figma.com/design/JTWbgU7QlZYYaXYuIExzPn/CloudSkinClinicWellness-AdminWebsite` — the reader is not assumed to have access.

> **Brand vibe:** clinical-clean meets soft sky. Crisp whites, navy chrome, sky-blue accents and a single mint-teal CTA. Floating cloud SVGs drift behind hero panels; corner radii are pill-shaped (buttons) or asymmetric "0 70px 0 70px" (signature photo frames). No emoji in product chrome, no gradients on body copy — gradients live only on dark hero panels and the "01→02→03" connector line.

---

## Index — what's in this folder

```
README.md                ← you are here
SKILL.md                 ← Agent-Skills entry point (use this in Claude Code)
colors_and_type.css      ← single source of truth for tokens
assets/                  ← logos, clinic photo, service hero shots
fonts/                   ← (none locally — Google Fonts used; see Typography)
preview/                 ← cards rendered into the Design System tab
ui_kits/
  admin/                 ← staff portal — sidebar, topbar, dashboard, statcards, tables
  marketing/             ← public site — navbar, hero, service card, footer, booking form
```

---

## CONTENT FUNDAMENTALS

### Tone

- **Confident-warm clinical.** Reads like a board-certified practitioner who happens to be kind. Never "girlboss / wellness influencer". Never "edgy tech start-up".
- **You-addressed in public copy** — *"Reveal Your Most Radiant Skin"*, *"Book your consultation today and let our licensed practitioners create a personalized treatment plan just for you."*
- **Plain-spoken in admin copy** — *"3 proof-of-payment uploads await review"*, *"Retinol Cream is running low (85 units left)"*. No "Whoops!" or "Oopsie!" — staff-facing strings name the thing and the number.
- **Filipino-context fluency** — peso glyph (₱) is used for money, GCash is a payment method on equal footing with cash and card. Examples include Filipino names (Maria Santos, Miguel Cruz, Jose Dela Cruz).

### Casing

| Surface                          | Casing         | Example                              |
| -------------------------------- | -------------- | ------------------------------------ |
| Page titles, section headlines   | Title Case     | "Our Signature Treatments"           |
| Buttons & CTAs                   | Title Case     | "Book Now", "View All Services"      |
| Status badges                    | UPPERCASE      | "CONFIRMED", "OUT OF STOCK"          |
| Table column headers             | UPPERCASE      | "CLIENT", "SERVICE", "STATUS"        |
| Eyebrows / role tags             | UPPERCASE      | "ADMIN", "PRACTITIONER"              |
| Body copy & marketing prose      | Sentence case  | "Skincare tips, treatment insights." |
| Wordmark logo                    | UPPERCASE      | "CLOUD SKIN  /  CLINIC + WELLNESS"   |

### Voice rules

- **No exclamation marks** in product chrome. Marketing prose allows one per page max ("Leave radiant!"). Admin: zero.
- **Numbers stay numerals**, never spelled out ("3 simple steps", "12 today", "20% off"). Money: `₱2,800` (peso glyph + comma).
- **Ampersands** never replace "and" in body copy — they're allowed only in "Clinic + Wellness" lockup (which uses `+`, not `&`).
- **Em-dashes are fine** for separating clauses in marketing — *"From advanced laser procedures to luxurious skin therapies — each treatment is tailored to your unique skin profile."*

### Emoji & decorative chars

- **Emoji**: avoid. The codebase has *one* exception — the May Glow Special banner uses 🎉 as a copywriter's flourish. Don't use ☁️ as a logo stand-in (the real logo is a "CS" monogram in a soft scalloped frame).
- **Unicode**: `+` is used in the brand lockup ("Clinic + Wellness"). `→` and `←` appear in "View Offer →" tail flourishes. `"` (smart quote / large display quote) is rendered in Cormorant Garamond as a decorative glyph on testimonial cards.

### Sample copy lifted verbatim

> Reveal Your Most Radiant Skin
> Advanced aesthetic treatments personalized for your skin. Book your consultation today and start your glow journey.

> Why Cloud Skin Clinic
> At Cloud Skin Clinic, we combine the latest aesthetic technology with genuine care for your wellbeing. Every treatment is backed by science and delivered by licensed professionals.

> Staff Sign In
> For Admin, Practitioners, and Receptionists only

> Low Stock Alert — Retinol Cream is running low (85 units left)

> 🎉 May Glow Special — 20% off all facial treatments
> Valid until May 31, 2026. Limited slots available.

---

## VISUAL FOUNDATIONS

### Color

A two-track palette that shares 80% of its values across both products:

- **Shared backbone:** navy `#1A3A5C / #1A2E40 / #152F4A` for hero panels, sidebar, primary text. Sky `#5BC0EB` as an always-present accent (active state, sparkle, hover highlight). Cool tints `#EBF6FD → #D0E8F5 → #B8D4EC` for badges, borders, muted text.
- **Marketing primary:** **Teal `#069494`** (CTA pills, hover `#047A7A`). Always rendered as a pill button.
- **Admin primary:** **Deep blue `#2D6A9F`** (links, primary buttons, active-row highlight). Sky `#5BC0EB` is reserved for the 3px active-item left-border in the sidebar.
- **No purple, no pink, no warm browns** in chrome. Status badges use the standard Tailwind-ish semantic ramps (green / yellow / red / blue / violet / orange), but only inside the badge — never on surfaces.

Full token list in `colors_and_type.css` and rendered in `preview/`.

### Type

- **DM Sans** — display, headings, buttons, labels, badges. Weights 400/500/600/700. Tracking is opened up (`letter-spacing: 0.18em`) for the wordmark and eyebrows; otherwise default.
- **Inter** — long-form body copy, paragraph text. Weights 400/500/600. Italic used only inside testimonial quote bodies.
- **JetBrains Mono** — SKUs (`SKIN-002`), times of day (`10:00 AM`), tabular numerals. Never for prose.
- **Cormorant Garamond** — *single decorative use*: the giant 64px `"` glyph that opens testimonial cards. Never as body or display copy.

### Spacing & layout

- **4px base grid.** Card padding is 20–24px, section padding is 80px vertical on marketing, 24px on admin.
- **Container max-width:** 1280px (marketing). Admin is a full-width grid behind a 240px fixed sidebar + 60px topbar.
- **Sidebar:** 240px expanded → 64px collapsed. Animated `width 200ms ease`. 3px sky-blue left-border marks the active row.
- **Cards have generous breathing room:** dashboard stat cards are `padding: 20px 24px; gap: 12px between metric rows`.

### Backgrounds

- **No full-bleed photography on marketing chrome.** Photos live inside asymmetric-corner frames (`border-radius: 0 70px 0 70px`).
- **Hero panels use radial gradient washes** on white — `radial-gradient(ellipse at 70% 40%, rgba(208,232,245,0.45) 0%, rgba(232,244,253,0.3) 40%, white 70%)`. Soft sky-tint fading out.
- **Floating Cloud SVGs** drift behind hero panels — five hand-crafted cloud paths (`a`–`e` in `FloatingClouds.tsx`) at varying opacities (0.1–0.55), animating with Motion (y: ±14–22px, x: ±10–20px) over 4.5–7s durations. Always behind content, never above.
- **Dark hero panels** (footer, page-hero, CTA section) use **navy `#1A3A5C`** + two large blurred teal radial blobs (`rgba(6,148,148, 0.06–0.10)`) bleeding off-canvas top-right and bottom-left. Never a linear gradient on a hero.
- **CTA section gradient:** `linear-gradient(135deg, #1A3A5C 0%, #2D6A9F 100%)` — *only* place a linear gradient appears.
- Alternating section bg on marketing: `#E8F4FD` (very pale sky) vs white. No grain, no texture.

### Imagery

- **Cool, clean, well-lit medical-spa interiors.** White walls, glass shelves, soft daylight or LED panel lighting. Slight cool tint.
- **People photography** is shot against neutral / off-white backdrops (e.g. `team-doctor.png`). No outdoor / lifestyle shots.
- **Service hero shots** are tight crops on a treatment or product. Backgrounds are out-of-focus pastels.
- **Photo treatment:** **no filter**, no grain, no heavy color grade. Slight cool cast is okay. Hero photos sit at `opacity: 0.25` when used as backdrops behind page titles.

### Animation

- **Library:** Framer Motion (`motion@12.x`). Used for ScrollReveal entry, hero text reveals, "How it works" connector line (`scaleX 0→1`, `duration: 3s`, `ease: "linear"`), and FloatingClouds (`repeat: Infinity, ease: "easeInOut"`).
- **Default easing:** `ease-in-out` for clouds, `ease-out` for entry. Admin transitions use linear `150–200ms` (`transition: background 150ms`).
- **No bounce.** Springs are reserved for testimonial carousel auto-advance (5s interval, no spring overshoot).
- **Hover lifts:** cards translate `Y(-1px)` and gain `--shadow-md`. 150ms cubic.
- **Page transitions:** none — just `ScrollReveal` on first-paint of each section (entry delays staggered 0.1s apart).

### Hover / press states

- **Pill buttons (primary):** background darkens — teal `#069494 → #047A7A`, blue `#2D6A9F → ~#1A5685`. `transition: background 0.2s`.
- **Outline buttons:** fill the body with a tint (`#E8F4FD` for blue outline; transparent → border-tone for teal outline).
- **Cards:** `translateY(-1px)` + shadow upgrade (sm → md).
- **Table rows:** background `→ #F8FBFF` (the lightest sky tint).
- **Sidebar items:** background `→ #1E3F61` (navy-600). Active item gets `background: #2D6A9F` + `border-left: 3px solid #5BC0EB`.
- **Active dot indicator** (testimonial carousel): inactive dots are 8×8 `#D0E8F5`; active is 24×8 pill `#069494`.
- **No press / `:active` scale-down**. The system relies on color, not transform, to communicate press.

### Borders & dividers

- Hairlines are `1px solid #D0E8F5` (tint-200). Used for card outlines, divider lines, dropdown bottoms.
- Sub-hairlines inside denser tables: `1px solid #F0F6FC` (tint-100).
- **Border-on-dark:** `1px solid rgba(184,212,236,0.10)` — used for sidebar section separators and footer bottom-bar.
- **No 2px borders** except on outline buttons (`border: 2px solid #2D6A9F`) and the "How it works" step circles (`border: 3px solid #069494`).

### Corner radii

| Radius      | Token            | Used for                                |
| ----------- | ---------------- | --------------------------------------- |
| 6 px        | `--radius-xs`    | small tags                              |
| 8 px        | `--radius-sm`    | inputs, secondary buttons               |
| 10 px       | `--radius-md`    | logo plate, role-selector tile          |
| 12 px       | `--radius-lg`    | dashboard cards, quick-action tiles     |
| 16 px       | `--radius-xl`    | StatCard, step card                     |
| 20 px       | `--radius-2xl`   | service cards, blog cards, testimonial  |
| 9999 px     | `--radius-pill`  | buttons, badges, dot indicators         |
| 0 70px 0 70px | `--radius-asym` | signature photo frames (hero + Why Us)  |

### Shadows

Tinted navy, never grey/black. Five-stop ramp:

- `--shadow-xs`: `0 1px 3px rgba(26,58,92,0.06)` — navbar at rest
- `--shadow-sm`: `0 1px 4px rgba(26,58,92,0.08), 0 2px 8px rgba(26,58,92,0.04)` — stat cards, panels
- `--shadow-md`: `0 4px 12px rgba(26,58,92,0.08)` — testimonial card, dropdown
- `--shadow-lg`: `0 8px 24px rgba(26,58,92,0.12)` — hover state for service cards
- `--shadow-xl`: `0 16px 48px rgba(26,58,92,0.16)` — mobile drawer, side-on hero photo
- `--shadow-hero`: `0 24px 64px rgba(26,58,92,0.20)` — only on the main banner photo

No inset shadows. No multi-layer "elevation" stacks beyond the two-shadow combo on `--shadow-sm`.

### Transparency & blur

- **Used sparingly.** `backdrop-filter: blur(4px)` appears in two places: the category chip floating on a service photo, and the mobile-nav backdrop (`rgba(26,58,92,0.5) + blur(4px)`).
- **Translucent backgrounds:** `rgba(91,192,235,0.20)` on the role-tag pill ("ADMIN") sitting inside the dark sidebar. `rgba(255,255,255,0.92)` for chips on top of photography.

### Layout rules

- **Fixed navbar** (marketing): 80px tall, full-width, white, `--shadow-xs` at rest → `--shadow-md` once scrolled past 10px.
- **Fixed sidebar + topbar** (admin): sidebar `position: fixed; left: 0` + topbar `position: fixed; top: 0; left: var(--sidebar-w)`. Body content has a left margin equal to sidebar width.
- **Cards rarely full-bleed.** Always a 20–24px gap to the parent edge.
- **Two columns max on dashboard widgets**, sized 60fr/40fr or 1fr/1fr.

---

## ICONOGRAPHY

### Library

**Lucide React (`lucide-react@0.487.0`)** is the production icon system, used everywhere — sidebar, topbar, stat cards, table action buttons, marketing trust badges, footer contact icons.

- **Stroke style.** 1.5–2px round stroke, round line-caps, round line-joins.
- **Default sizes:**
  - 12–14px — inline metadata (clock next to "5 min ago")
  - 16px — submenu items, footer icons, trust-badge checkmarks
  - 18–20px — primary nav items, topbar bell/search
  - 22–24px — quick-action tiles, "Why us" feature icons

### Recreating

When reproducing this system in another tool, **load Lucide from CDN** rather than inlining SVG strings:

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<i data-lucide="calendar"></i>
<script>lucide.createIcons();</script>
```

This guarantees the exact same stroke geometry and weight as production.

### Icon→meaning mapping (from sidebar / dashboard)

| Concept           | Lucide name        |
| ----------------- | ------------------ |
| Dashboard         | `layout-dashboard` |
| Appointments      | `calendar`         |
| Patients          | `users`            |
| Staff             | `user-cog`         |
| Services          | `scissors`         |
| Packages          | `package`          |
| Inventory         | `boxes`            |
| Vouchers          | `tag`              |
| Payments          | `credit-card`      |
| Reports           | `bar-chart-2`      |
| Messages          | `message-square`   |
| Reviews           | `star`             |
| Blog              | `file-text`        |
| Settings          | `settings`         |
| Low stock         | `alert-triangle`   |
| Out of stock      | `ban`              |
| Confirmed / OK    | `check-circle`     |
| Pending / Time    | `clock`            |
| Cancelled / Error | `x-circle`         |
| In progress       | `loader`           |
| Toggle expand     | `chevron-right`    |
| Sign out          | `log-out`          |

### Logos

The brand mark is a stylized **CS monogram** sitting inside a soft scalloped (cloud-edged) plate, rendered in pale silver/sky blue. The stacked logo adds the wordmark **CLOUD SKIN** + tagline **CLINIC + WELLNESS** below.

- `assets/logo-mark.png` — small monogram only (header use, ≤ 56 px)
- `assets/logo-stacked.png` — full lockup (footer, login splash, signage)

### Emoji & non-Lucide

- **No emoji** in product chrome (despite the cloud emoji `☁️` appearing as a placeholder in source code, **the real logo is the CS monogram** — substitute it whenever you see the placeholder).
- **TikTok** is the only SVG drawn inline in the production code, because Lucide doesn't ship a TikTok mark. Pull it as-is from `Footer.tsx` if you need it.
- No icon font, no PNG icon sprites.

---

## TYPE FILES — substitution note

⚠️  **No local font files are bundled** with this design system. The production codebase loads DM Sans, Inter, JetBrains Mono and Cormorant Garamond from Google Fonts at runtime via the import in `colors_and_type.css`. If you ship an offline artifact, **embed the four families' WOFF2s under `fonts/`** and ask the brand owner for licensed copies — this system flags the substitution rather than rolling its own.

---

## Manifest — files in this folder

- `README.md` — this file
- `SKILL.md` — Agent-Skills compatible skill descriptor; the file Claude Code reads
- `colors_and_type.css` — all design tokens, type classes, and base styles
- `assets/` — `logo-mark.png`, `logo-stacked.png`, `clinic-interior.jpg`, `team-doctor.png`, `team-practitioner-sm.png`, `service-*.jpg`
- `preview/` — the rendered cards that populate the Design System tab (Type, Colors, Spacing, Components, Brand)
- `ui_kits/admin/` — staff portal recreations: `index.html` (sidebar, topbar, dashboard, stat cards, status badges, appointments table, low-stock panel), `appointments.html` (full "All Appointments" page — stat cards, tabs, status/type/payment filter chips, search, full data table with payment pills, pagination, month-view calendar with status-colored events, appointment details modal)
- `ui_kits/marketing/` — `index.html` + JSX components for the public site (navbar, hero, service card, "Why us", "How it works", testimonial carousel, promo banner, footer)
#   c l o u d - s k i n - a d m i n - v 4  
 