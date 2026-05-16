---
name: cloud-skin-design
description: Use this skill to generate well-branded interfaces and assets for Cloud Skin Clinic + Wellness, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files. The key foundations are:

- `colors_and_type.css` — copy this in and import it; every design token + base type class lives here.
- `assets/` — real logos (`logo-mark.png`, `logo-stacked.png`), the clinic interior photo, and four service hero shots.
- `ui_kits/admin/` — staff portal recreations (sidebar, topbar, dashboard, stat cards, status badges, appointments table). Use for any "internal tool" / dashboard work.
- `ui_kits/marketing/` — public-site recreations (navbar, hero, service card, testimonials, footer). Use for any patient-facing / promo / blog / booking work.
- `preview/` — cards that show every token and component in isolation, useful as a reference cheat-sheet.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. **Always pull Lucide icons from CDN** rather than inlining SVG — production uses `lucide-react@0.487.0`. Use **DM Sans** for headings/labels, **Inter** for body, **JetBrains Mono** for SKUs and times.

If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand. Both production codebases (`CloudSkinAdmin` and `Cloudskinclinicwellnesswebsite`) use Tailwind v4 + shadcn/ui + Radix primitives — the visual tokens in `colors_and_type.css` can be wired in either as CSS variables or as a Tailwind theme.

If the user invokes this skill without any other guidance, ask them what they want to build or design (e.g. "a new admin page", "a marketing landing for a promo", "a slide deck for investors"), ask which **surface** (admin / marketing) it belongs on so you pick the right primary color (deep-blue `#2D6A9F` for admin, teal `#069494` for marketing), and then act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

**Two non-negotiables for this brand:**

1. **No emoji as logo.** The source code occasionally uses `☁️` as a placeholder — always substitute `assets/logo-mark.png` instead.
2. **Tinted shadows.** All elevation uses `rgba(26,58,92, …)` — never pure black.
