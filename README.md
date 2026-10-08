# CallTether website

A runnable, responsive website based on the approved **Gatekeeper** visual direction. The corrected logo and brand assets are reused from `../outputs/calltether-brand`.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000. For a production preview:

```sh
npm run build
npm run start
```

## Implementation

- Next.js App Router, React, TypeScript, and custom CSS.
- GSAP ScrollTrigger for the pinned request → policy → decision story, reversible text and diagram reveals across page templates, and subtle parallax.
- Lenis for smooth wheel scrolling, synchronized with the GSAP ticker.
- Cream, pine, copper, and mint design tokens; self-hosted Space Grotesk, Manrope, and IBM Plex Mono. Font licenses are included in `public/assets/fonts`.
- Approved outlined SVG logo, branded favicon/manifest, SVG icon sprite, distinct diagrams, generated courtyard, and WebP imagery.
- Click navigation with Escape dismissal, keyboard team tabs, filterable decision records, manual testimonial controls, FAQ disclosures, form validation, local completion states, and password visibility.
- Native disabled LinkedIn, X, GitHub, and YouTube controls in the footer.

## Pages

| Route | Content |
| --- | --- |
| `/` | Hero, problem, scroll story, sample product UI, stats, teams, testimonials, trust, FAQ, demo form |
| `/product` | Overview, routing, policy context, outcomes, decision records |
| `/solutions` | Security, platform, and operations workflows |
| `/trust` | Coverage, data context, responsibilities, questions for evaluation |
| `/pilot` | Scope, evaluation sequence, scorecard, pilot request |
| `/resources` | Three field notes with readable article pages |
| `/about` | Approach and principles |
| `/contact` | Contact preview form |
| `/request-demo` | Guided demo explanation and request preview form |
| `/sign-in` | Polished invited-workspace sign-in preview |
| `/legal/privacy`, `/legal/terms` | Clearly identified preview notices |

## Motion and responsiveness

The three-chapter story pins on screens at least 1024px wide and 800px tall. Shorter screens scroll normally; mobile panels stack. Chapter controls also work without pinning. Reduced-motion preferences disable Lenis, pinning, reveals, parallax, CSS transitions, and decorative animation. Story text remains readable throughout animation. Complex diagrams can be opened at full size.

## Current scope

This is a complete local website frontend, not a connected product backend. Request forms and sign-in do not send or store details. The completion states state this explicitly. Decision records use synthetic data. Statistics, testimonial people, and quotes are labeled as fictional or illustrative; they are not real customer claims. Social controls remain disabled until real URLs exist.

## Before public launch

1. Connect request forms to an approved CRM or delivery endpoint and add the appropriate spam protection.
2. Connect sign-in to the chosen authentication provider and define access, password reset, and session flows.
3. Replace sample proof with approved customer quotes and measured results.
4. Confirm product capabilities and finalize company details and legal documents.
5. Set `NEXT_PUBLIC_SITE_URL` to the real HTTPS origin for canonical social-image URLs. Until configured, metadata uses localhost.
6. Add the real social profiles, publish to the selected host, and connect the domain.

The project is ready to import into Vercel as a Next.js project. No deployment or domain changes have been made.

## Review artifacts

See `design-qa.md` for browser and build checks. The `qa` directory contains desktop/mobile screenshots and the approved-reference comparison. `specs/website-structure.md` preserves the planned content architecture.
