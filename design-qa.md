# CallTether design QA

Date: 2026-10-08

## Target and evidence

- Source visual truth: `/Users/prajaktagaikwad/Downloads/ChatGPT Image 8 Oct 2026, 11_01_29.png`, also preserved as `public/assets/images/selected-direction-reference.png`.
- Source pixels: 1086 × 1448. The brand-board strip and later chapters were excluded for the homepage comparison; the navigation/hero crop is 1086 × 760, starting at y=103.
- Implementation: `http://localhost:3000/`.
- Browser-rendered evidence: `qa/home-reference-width.jpg` (1086 × 940 CSS/pixel viewport), `qa/home-desktop.jpg` (1440 × 1000), `qa/home-mobile.jpg` (390 × 844), `qa/home-mobile-320.jpg` (320 × 800), and `qa/story-desktop.jpg` (1440 × 1000).
- State: light homepage at the top, fonts loaded, synthetic default decision; story capture is chapter three with pinning active below the 80px navbar.
- Full-view comparison: `qa/reference-comparison.png`. Source and implementation use the same 1086px content width and are both downsampled to 720px without stretching. Their different heights are retained and visible. This is a visual-direction implementation, not a pixel-for-pixel copy of a static concept board.
- Focused comparison: `qa/focused-comparison.png`. Logo regions are enlarged 2×; headline regions retain their native pixels. Both source and rendered screenshot were inspected together.
- Additional evidence: `qa/product-desktop.jpg`, `qa/trust-desktop.jpg`, `qa/resources-desktop.jpg`, and `qa/footer-desktop.jpg`.

## Findings and comparison history

No actionable P0/P1/P2 findings remain for the local frontend scope.

1. **[P2, resolved] Narrow navbar overflow.** At 320px, the original logo, CTA, and menu exceeded the viewport (335px document width). Reduced the logo and action spacing at the narrow breakpoint and kept the menu reachable. The final 320 × 800 browser capture shows all controls; document width is 320px.
2. **[P2, resolved] Faded decision text during a chapter.** Early in chapter three, the result panel began at 45% opacity. See `qa/story-before-readability-fix.jpg`. Raised its starting opacity to 85%, the policy rows to 75%, and the request panel to 90%. Post-fix `qa/story-desktop.jpg` visibly retains readable decision text during the transition; inspected opacity was 0.8524 at the chapter start.
3. **[P2, resolved] Short-screen pinning could put controls below the viewport.** Pinning now requires both 1024px width and 800px height. Browser inspection at 1280 × 720 and 320 × 800 confirms zero pin spacers. At 1440 × 1000, one pin spacer is present and the stage top remains at y=80.
4. **[P2, resolved] Pilot CTA repeated its current page.** Changed the pilot hero's secondary CTA to `#pilot-request`. Browser navigation now lands at `/pilot#pilot-request` and visibly shows the pilot form.
5. **[P3, resolved] Footer wordmark sizing.** Aligned the image dimensions with the approved SVG's 590:104 viewBox. The final footer capture shows the large wordmark, distinct mark, page links, and disabled social icons.

## Required fidelity surfaces

| Surface | Assessment |
| --- | --- |
| Fonts and typography | Existing approved brand-kit fonts are self-hosted: Space Grotesk display, Manrope body/UI, IBM Plex Mono metadata. Font loading was confirmed. The static concept uses a heavier custom display face; retaining the previously approved implementation font system is an intentional difference. Headlines keep the two-line desktop hierarchy; mobile wrapping stays readable. The logo remains an outlined SVG asset rather than live typeset text. |
| Spacing and layout rhythm | Preserved centered headline, paired CTAs, central architectural gate, horizontal call tickets, and decision annotation. The hero has more vertical space than the source board to support an actual website viewport. Expanded navigation and later chapters follow the requested sitemap. Desktop grids, mobile stacks, card padding, borders, and CTA alignment were visually reviewed. |
| Colors and tokens | Mineral #F0F3EF, pine #18352C, copper #BB864D, and mint #C4D6C7 carry through the site. Restrained red distinguishes deny. Pine chapters balance the light pages. Muted labels remain secondary; primary text and controls are readable. |
| Image quality and fidelity | Reused approved Gatekeeper and corrected logo assets. The new courtyard retains the cream architectural setting and edge foliage; its lighter treatment is intentional. Imagery uses optimized WebP; logos/icons/diagrams remain vectors. No broken images were reported in the loaded homepage. Diagrams have full-size links for narrow displays. |
| Copy and content | Kept the main boundary promise. Changed source conversion copy to Request a demo per the user's clarification. Expanded product, solutions, trust, pilot, resources, about, contact, and sign-in content. Fictional testimonials, example statistics, synthetic records, and preview forms are explicitly labeled. |

## Functional and responsive checks

- Production build passes, including TypeScript and static generation.
- All 15 content routes returned HTTP 200. Initial internal-resource crawl checked 52 unique local routes/assets; no failed resources or missing referenced anchor IDs. The subsequently repaired pilot anchor was also verified in the browser.
- Desktop menu opens; Escape dismisses it and returns focus. Mobile menu expands and its product links appear.
- Desktop story advances through request, policy, and decision; direct chapter controls work; Skip the story reaches the product UI.
- Record filters, selection, and reason/rule details work. Choosing Approval now also selects the corresponding record automatically.
- Team tabs work by click and arrow keys. Their visual and copy panels change together.
- Testimonial controls change the fictional quote/person and counter. FAQ disclosures expand.
- Request-demo form rejects blank required fields, accepts sample details, displays a local completion state, and resets. It sends/stores nothing.
- Sign-in show/hide changes the input type. Sample submission shows the unconnected-authentication notice.
- Social controls are native disabled buttons with accessible account-coming-soon labels; no placeholder external URLs.
- No horizontal overflow observed at 1440, 1280, 1086, 390, or 320px in the reviewed states.
- Reduced-motion handling is implemented in GSAP media queries and CSS; it was reviewed in source. The operating system preference was not changed or emulated in this browser run.
- Browser warning/error log check returned an empty list after final navigation and interactions.

## Scope and follow-up

This passes as a complete local website frontend. Backend authentication, form delivery, real customer evidence, final legal documents, public deployment, and custom-domain setup remain launch work, as documented in `README.md`. No public deployment or external account changes were made.

Final implementation checklist:

- [x] Approved identity, logo, fonts, favicon, and vector icons
- [x] Homepage story, GSAP ScrollTrigger, Lenis, and responsive fallback
- [x] Supporting pages and working frontend controls
- [x] Disabled social profiles and clearly labeled sample proof
- [x] Production build and browser review
- [x] Source/rendered comparison and post-fix evidence
- [x] Handoff documentation

final result: passed

## Browser feedback refinement — 2026-10-08

Addressed the seven annotated homepage comments:
- Shared card hover transform/shadow; export placement now uses relative positioning so hover does not replace its horizontal offset. All cards use full opacity.
- Hero cards fade in with a 1.5-second stagger, skipping cards hidden at the current breakpoint.
- Coverage-gap SVG label moved above the dashed arrow with a clear gap.
- Workspace ledger grid and architectural outline; scorecard dotted field, orbital lines, and pointer-follow copper light; testimonial copper arch; trust boundary outlines.
- Scorecard values count up once on entering view. Reduced-motion mode keeps final values and skips entrance animation.
- Final CTA background shapes softened with a 75% color wash.

Production build succeeded including TypeScript compilation. Viewed the updated scorecard in the existing 1063×804 browser preview; values reach 12,480 / 3 / 96.4% / 42 ms. Screenshot: `qa/updated-scorecard.jpg`. Changed decorative overflow to `clip` to prevent content from scrolling inside the background section. This round did not repeat the full previous cross-page QA suite.

