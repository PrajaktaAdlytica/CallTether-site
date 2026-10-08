# CallTether website structure

**Status:** information architecture for the next website build  
**Product maturity:** concept stage; product behavior and commercial details must be verified before launch  
**Primary conversion:** request a guided product demo / walkthrough  
**Secondary conversion:** discuss a scoped shadow-mode pilot

## 1. Sitemap

```text
/
├── /product                 Product overview and proposed workflow
├── /request-demo            Request a guided product demo / walkthrough
├── /solutions               Solutions by team and job
├── /trust                   Security, governance, data scope and limitations
├── /pilot                   Pilot engagement and request form
├── /resources               FAQ and technical explainers
├── /about                   Company and product principles
├── /contact                 General inquiries and pilot routing
├── /sign-in                 Invited workspace presentation; auth status disclosed
└── /legal
    ├── /privacy             Publish only after privacy practices are verified
    └── /terms               Publish only after terms are reviewed
```

Pricing lives within **Pilot** until the commercial model is confirmed. The page should explain how to discuss scope and pricing without showing invented tiers or fees. Add separate pricing, integration directory, documentation, or module pages only when the offer and product support them.

## 2. Navigation and footer

**Desktop navigation:** Product · Solutions · Trust · Resources · About · Sign in · **Request a demo** (primary CTA). On mobile, keep the CTA and sign-in available from the menu.

**Footer groups:**

- Product: Product, Solutions, Request a demo
- Learn: Resources, FAQ, technical explainers
- Company: About, Contact
- Trust: Trust, Privacy, Terms
- Social: show only verified CallTether accounts

Use real links only. The primary conversion action routes to `/request-demo`; the pilot option routes to `/pilot`; general questions route to `/contact`. Do not add a fake status, careers, press, or integration link.

## 3. Page structure

### Home — `/`

1. Header with **Request a demo** and sign-in.
2. Hero: “Give agent actions a clear boundary.” Explain the concept: evaluate routed AI tool calls against explicit policy before execution. Primary CTA: **Request a demo**. Secondary CTA: **Explore the product**.
3. Problem: show a distinct call path where unclear permissions or destinations create a policy gap. Explain the concrete security/platform job in plain language.
4. Product workflow: request/context → policy check → allow, deny, or approval request → reason/record. One visual tells this story from input to decision.
5. Product walkthrough preview: show a labeled, illustrative interface frame and invite a visitor to request a guided demo. This is a preview, not a self-serve interactive simulation.
6. Product facts and stats: separate the proposed model from measured performance. It is safe to describe the three proposed decision outcomes as product structure. Keep operational measures—eligible calls, policy coverage, outcome mix, and decision time—under “Measured in a scoped evaluation” until real data is approved. Never present placeholders as company traction.
7. Testimonials and proof: provide a designed quote area for a real, approved customer or design-partner statement with accurate attribution and permission. If no approved quote exists, use a transparent “No customer results published yet” proof panel with the product’s evaluation plan; do not fabricate a quote, logo, or attribution.
8. Scope and fit: clarify which calls the proposed route evaluates, what remains outside it, and which team may own each step.
9. Use cases: security review, platform/developer controls, and operational exceptions.
10. Trust snapshot: link to verified security, data-handling, and deployment details; label unimplemented practices as planned or unknown.
11. FAQ: product status, what the demo shows, coverage, deployment assumptions, data exposure, approval behavior, and pilot availability.
12. Final **Request a demo** CTA and complete footer.

Visual assignments: `routed-boundary.svg`, `coverage-gap.svg`, `decision-paths.svg`, and `pilot-sequence.svg`. Give the problem, workflow, proof, and trust sections distinct compositions. Mark all concept UI **Illustrative · Synthetic data**.

### Product — `/product`

1. Product overview and current maturity.
2. Proposed architecture and the route boundary.
3. Policy inputs and evaluation context.
4. Decision states: allow, deny, and approval request.
5. Example decision record and review workflow.
6. Deployment assumptions and what is outside the proposed scope.
7. Product FAQ and **Request a demo** CTA; secondary pilot CTA where relevant.

Visual assignments: `platform-architecture.svg`, `policy-composition.svg`, and `deployment-options.svg`. Present unbuilt behavior as proposed behavior, not shipped functionality.

### Request a demo — `/request-demo`

This is a request form for a guided demo/walkthrough, not an interactive demo page. Explain what the visitor will see: a sample routed tool call, the applicable policy context, a proposed decision, its reason, and the scope boundary. Because CallTether is concept-stage, state plainly if the walkthrough is a prototype and uses synthetic data; do not imply production availability or live system connections.

Ask for name, work email, company, role, the agent/tool-call workflow they want to discuss, and an optional note or preferred time. Keep the form short. Confirm what happens next only after the owner and process are known. Until form delivery is connected, show a non-submitting prototype state and never collect real personal data.

Visual assignment: adapt `demo-selection.svg` as a request-context illustration and `contact-context.svg` for the form. Do not include controls that look like a runnable sandbox unless the user can actually run one.

### Solutions — `/solutions`

Open with the shared problem, then give each team a distinct workflow rather than duplicating the same feature cards:

- **Security:** inspect policy decisions and define the governance boundary.
- **Platform and developers:** understand which calls are evaluated and how policy fits into a routed workflow.
- **Operations:** review exceptions and define what happens when approval is unavailable.

Each scenario should identify the job, inputs, decision point, limits, and what a scoped test could measure. End with a **Request a demo** CTA; offer the pilot conversation as a secondary route. Do not describe these as customer outcomes.

Visual assignments: `security-review.svg`, `developer-route.svg`, and `owner-approval.svg`.

### Trust — `/trust`

1. State product maturity and evaluation scope.
2. Explain which calls the proposed boundary covers and which it does not.
3. Describe the data minimization approach as a design goal until implemented.
4. Show control responsibilities and approval boundaries.
5. List verified security practices and current gaps; do not imply certifications or production controls that do not exist.
6. Link to Privacy and Terms only when those documents are reviewed and accurate.

Visual assignments: `trust-boundary.svg`, `data-minimization.svg`, and `trust-responsibilities.svg`.

### Pilot — `/pilot`

1. Explain the shadow-mode test in plain language and identify that scope is agreed with each participant.
2. Show a sample sequence and a pilot boundary diagram.
3. Define success criteria before any test; use measures to be agreed, not invented results.
4. Request form fields: name, work email, company, role, current tool-call workflow, selected use case, desired outcome, and optional deployment context.
5. State truthfully what happens after submission. Do not promise a response time until staffed and confirmed.
6. Consent and privacy link only after the form has an approved data-handling path.

Visual assignments: `pilot-intake.svg`, `pilot-scorecard.svg`, and `pilot-boundary.svg`. Until a backend is connected, present the form as a non-submitting prototype and do not collect real personal data.

### Resources — `/resources`

Start with a concise FAQ and technical explainers about policy decision points, routed tool calls, shadow-mode evaluation, and approval design. Mark concept examples and synthetic data clearly. Add docs or an API reference only when an actual implementation is available.

Visual assignments: `guide-map.svg` and `guide-chapters.svg`.

### About — `/about`

1. Product principle: clarity at the point of action.
2. Why CallTether is exploring policy boundaries for routed agent tool calls.
3. Principles: explicit scope, understandable decisions, deliberate human review, and honest limitations.
4. Team and company facts only when supplied and verified.
5. Contact and pilot CTAs.

Visual assignments: `company-principle.svg` and `company-process.svg`.

### Contact — `/contact`

Provide a concise contact form for general questions and route demo requests to `/request-demo` and pilot interest to `/pilot`. Use name, email, topic, and message. Explain whether the form sends or stores data; the initial front-end concept must say that it does not submit.

Visual assignments: `contact-context.svg` and `contact-routing.svg`.

### Sign in — `/sign-in`

Create a polished invited-workspace screen with labeled work-email and password fields, show/hide password, remember-me only if supported, recovery/help route, and privacy/security reassurance. If authentication is not connected, identify the screen as a presentation only, disable credential submission, and do not collect passwords or imply that a real account can be accessed. Add SSO only when actually planned and implemented.

Visual assignments: `workspace-entry.svg` and `access-recovery.svg`.

### Privacy and Terms — `/legal/privacy`, `/legal/terms`

Use clear, readable legal pages with actual reviewed text. The current diagram assets are art direction only; they are not legal documents. Do not publish placeholder privacy or terms as final policy.

Visual assignments: `privacy-lifecycle.svg` and `terms-scope.svg` may be used as decorative illustrations only, with accessible text carrying the legal meaning.

## 4. Conversion path

```text
Home → Problem → Product workflow → Product or Solutions → Request a demo
  ├── Trust / Resources answer evaluation questions before the form
  └── Pilot is a secondary path for teams ready to discuss an evaluation
```

Keep one dominant CTA per page. Use **Request a demo** in navigation and on the homepage; use **Request a pilot conversation** on the pilot page. The demo request promises a guided walkthrough, with prototype/synthetic-data disclosure when applicable.

## 5. Build order

1. Verify product facts, pilot scope, data handling, contact path, and legal copy.
2. Wireframe Home, Product, Request a demo, Solutions, Trust, and Pilot around the journeys above. Include the problem, stats, and testimonial modules in the Home wireframe.
3. Build complete Contact, Sign-in presentation, and legal pages with honest functionality states.
4. Add Resources as useful FAQ/technical content rather than a placeholder blog.
5. Apply the selected Gatekeeper identity and the page-specific visual assignments in `page-visual-map.csv`.
6. Review mobile and desktop layout, forms, navigation, keyboard/focus behavior, reduced motion, links, metadata, and favicon before launch.

## 6. Content facts to confirm before publication

- Whether the policy decision point is implemented, and which calls it evaluates.
- Actual policy inputs, decision logging, approval, and timeout behavior.
- Supported deployment model, integrations, and data boundaries.
- Pilot availability, owner, response expectations, and success measures.
- Contact destination, privacy/terms owner, and any verified security controls.

Until confirmed, describe these as concept or proposed behavior. The visual and interaction files in the brand book are design assets; they do not prove that a feature or service exists.

## 7. SaaS homepage reference review

Reviewed the public homepages of [Klimori](https://www.klimori.com/), [BessOpt](https://www.bessopt.com/), and [HeatOptx](https://www.heatoptx.com/) on 8 October 2026. This comparison covers their visible homepage story and CTA framing; it does not validate their internal product behavior, metrics, customer claims, or form submission flows.

| Reference | Observed homepage structure | Useful pattern for CallTether | Avoid copying |
|---|---|---|---|
| [Klimori](https://www.klimori.com/) | Operating conditions and product story, then an operational gap, monitor/optimize/peak workflow, portfolio view, operator perspectives, and an access request. | Explain a decision path with visible evidence and follow it through to a reviewable outcome. Keep the story grounded in one workflow. | Long cinematic introduction, multi-product taxonomy before CallTether has distinct products, and illustrative figures that could read as traction. |
| [BessOpt](https://www.bessopt.com/) | Hero and platform proposition, forecast/dispatch workspace examples, a scenario prompt, product suite and use cases, economics/constraints, review controls, pilot model, FAQ, and a walkthrough invitation. | Make the walkthrough request feel specific: ask what agent/tool-call workflow the visitor wants to see, then explain what the guided demo covers. | A simulated prompt presented as a working product, a dashboard-heavy page before the product is built, and too many modules at concept stage. |
| [HeatOptx](https://www.heatoptx.com/) | Clear problem statement, map/detect/ROI workflow, suite and platform preview, solutions, value sequence, quantified ROI examples, pricing, and a specific assessment form. | Use a direct problem → workflow → evidence → request sequence. Tie the form to the job the visitor wants assessed. | Unsupported industry statistics, simulated ROI as proof, pricing tiers before the commercial model is confirmed, and unverified trust claims. |

### Recommended CallTether homepage flow

**Hero / Request a demo → problem → one routed-call decision story → product walkthrough preview → product facts and pilot measures → testimonials when approved → scope and team use cases → trust/FAQ → request-a-demo form.** This takes the strongest structural idea from each reference: Klimori’s explainable decision story, BessOpt’s scenario-led walkthrough invitation, and HeatOptx’s clear problem-to-action conversion path.

The references display proof-oriented content, but CallTether should publish only measured pilot results and approved testimonials. Until those exist, make the product model and evaluation plan clear, label concept visuals, and ask visitors to request a guided walkthrough.
