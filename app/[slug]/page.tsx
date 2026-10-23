import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Button,
  Diagram,
  Eyebrow,
  Icon,
  SectionHeading,
  Status,
} from "@/components/ui";
import { FAQ, FinalCTA, TeamTabs, WorkspacePreview } from "@/components/home";
import { RequestForm, SignInForm } from "@/components/forms";
const titles: Record<string, string> = {
  product: "The CallTether product",
  solutions: "Solutions for your team",
  trust: "Trust & scope",
  pilot: "Scope a pilot",
  resources: "Resources & field notes",
  about: "Our approach",
  contact: "Contact",
  "request-demo": "Request a demo",
  "sign-in": "Sign in",
};
export function generateStaticParams() {
  return Object.keys(titles).map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: titles[slug] || "Page not found" };
}
function PageHero({
  eyebrow,
  title,
  text,
  art,
  diagram = false,
  photo = false,
  secondaryHref = "/pilot",
}: {
  eyebrow: string;
  title: string;
  text: string;
  art: string;
  diagram?: boolean;
  photo?: boolean;
  secondaryHref?: string;
}) {
  return (
    <section className="page-hero">
      <div className="container">
        <div className="page-hero-copy" data-reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1>{title}</h1>
          <p>{text}</p>
          <div className="hero-actions">
            <Button href="/request-demo">Request a demo</Button>
            <Button href={secondaryHref} secondary>
              Scope a pilot
            </Button>
          </div>
          <div className="page-subtitle">
            Concept preview · Proposed product behavior
          </div>
        </div>
        <div
          className={`page-hero-art ${photo ? "photo-art" : ""}`}
          data-reveal
        >
          {diagram ? (
            <Diagram name={art} alt={`${title} — illustrative architecture`} />
          ) : (
            <img
              src={`/assets/images/${art}.webp`}
              alt={
                photo
                  ? "A tactile Gatekeeper material study in cream, pine, and copper"
                  : "The architectural Gatekeeper with its copper latch"
              }
              width={photo ? 1536 : 1254}
              height={photo ? 1024 : 1254}
            />
          )}
        </div>
      </div>
    </section>
  );
}
function Editorial({
  id,
  number,
  eyebrow,
  title,
  text,
  points,
  diagram,
  reverse = false,
  dark = false,
}: {
  id?: string;
  number: string;
  eyebrow: string;
  title: string;
  text: string;
  points: string[];
  diagram: string;
  reverse?: boolean;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={`section subpage-section ${dark ? "dark" : ""}`}
    >
      <div className={`container editorial-block ${reverse ? "reverse" : ""}`}>
        <div className="editorial-copy" data-reveal>
          <Eyebrow number={number}>{eyebrow}</Eyebrow>
          <h2>{title}</h2>
          <p>{text}</p>
          <ul className="detail-list">
            {points.map((point) => (
              <li key={point}>
                <Icon name="check" />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal>
          <Diagram name={diagram} alt={`${title} — ${text}`} />
        </div>
      </div>
    </section>
  );
}
function Product() {
  return (
    <>
      <PageHero
        eyebrow="Meet CallTether"
        title="A deliberate pause before action."
        text="Explore a policy boundary for routed agent tool calls. Understand the request, evaluate the context, and make the decision readable."
        art="gatekeeper-closed"
      />
      <Editorial
        number="01"
        eyebrow="The proposed architecture"
        title="A boundary in the route."
        text="The proposed model puts a policy decision point between a routed agent request and the destination tool. Routing defines the coverage."
        points={[
          "Action, destination, and scope become policy inputs",
          "Direct calls remain outside the proposed boundary",
          "Deployment details are agreed during evaluation",
        ]}
        diagram="platform-architecture"
      />
      <Editorial
        id="policy"
        number="02"
        eyebrow="Explicit policy context"
        title="Make the conditions understandable."
        text="Compose conditions around the job your agent performs. Define which destinations, scopes, and action types need a different decision."
        points={[
          "Set permitted destinations and action types",
          "Identify the context each decision requires",
          "Version and review policy changes deliberately",
        ]}
        diagram="policy-composition"
        reverse
        dark
      />
      <section className="section">
        <div className="container">
          <SectionHeading
            number="03"
            eyebrow="Three deliberate outcomes"
            title="A decision that has a next step."
            text="Each proposed outcome carries a matched policy and a reason."
          />
          <div className="outcomes">
            {[
              {
                status: "Allow" as const,
                title: "Continue within scope.",
                text: "The routed call matches the permitted conditions. The action can continue to its destination.",
                rule: "scope.support_write",
              },
              {
                status: "Deny" as const,
                title: "Stop at the boundary.",
                text: "The request falls outside an explicit condition. The reason is visible for review.",
                rule: "destination.allowlist",
              },
              {
                status: "Approval" as const,
                title: "Bring a person into the loop.",
                text: "A designated reviewer considers the request context. Review and timeout behavior are defined in scope.",
                rule: "review.external_send",
              },
            ].map((o) => (
              <article className="outcome-card" data-outcome={o.status.toLowerCase()} key={o.status} data-reveal>
                <Status value={o.status} />
                <h3>{o.title}</h3>
                <p>{o.text}</p>
                <code>{o.rule}</code>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section subpage-section" id="records">
        <div className="container">
          <SectionHeading
            number="04"
            eyebrow="Readable evidence"
            title="The request, the rule, the reason."
            text="Explore synthetic records from the concept workspace. Select an outcome or a record to inspect its context."
          />
          <div style={{ marginTop: 48 }} data-reveal>
            <WorkspacePreview />
          </div>
        </div>
      </section>
      <Editorial
        number="05"
        eyebrow="Deployment conversations"
        title="Start with one agreed route."
        text="A useful evaluation begins with a clear boundary. Supported deployment models and system connections are to be confirmed before any production use."
        points={[
          "Map the route before defining the test",
          "Agree on data and responsibility boundaries",
          "Define fail, timeout, and review behavior",
        ]}
        diagram="deployment-options"
        reverse
      />
      <FinalCTA />
    </>
  );
}
function Solutions() {
  return (
    <>
      <PageHero
        eyebrow="Solutions by responsibility"
        title="One shared boundary. A clearer role for everyone."
        text="Explore a different workflow for security, platform, and operations. Each starts with the same question: what should happen before this action reaches a system?"
        art="decision-archive"
        photo
      />
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Find your workflow"
            title="Control that teams can understand."
          />
          <div style={{ marginTop: 42 }}>
            <TeamTabs />
          </div>
        </div>
      </section>
      <Editorial
        id="security"
        number="01"
        eyebrow="For security"
        title="See the decision in its context."
        text="Review proposed policy decisions with the request, destination, and matched rule alongside the reason."
        points={[
          "Identify the boundary your policy owns",
          "Review exceptions with the relevant context",
          "Agree on evidence and coverage measures",
        ]}
        diagram="security-review"
      />
      <Editorial
        id="platform"
        number="02"
        eyebrow="For platform engineering"
        title="Give routed calls a consistent checkpoint."
        text="Explore how policy context fits into the route between agent and tool. Start with one workflow rather than assumed system-wide coverage."
        points={[
          "Map agent-to-tool relationships",
          "Define minimal decision inputs",
          "Evaluate a proposed shadow-mode route",
        ]}
        diagram="developer-route"
        reverse
        dark
      />
      <Editorial
        id="operations"
        number="03"
        eyebrow="For operations"
        title="Give the exception an owner."
        text="A proposed approval should answer who reviews, which context they need, and what happens when review is unavailable."
        points={[
          "Name owners and escalation rules",
          "Keep review context readable",
          "Define timeout and fallback decisions",
        ]}
        diagram="owner-approval"
      />
      <FinalCTA />
    </>
  );
}
function Trust() {
  return (
    <>
      <PageHero
        eyebrow="Trust & scope"
        title="Clarity includes the limits."
        text="Understand what the proposed route covers, which responsibilities need an owner, and which product details are still to be confirmed."
        art="trust-boundary"
        diagram
      />
      <Editorial
        number="01"
        eyebrow="Coverage"
        title="Routing determines the boundary."
        text="Only eligible calls passed through the proposed route are evaluated. Direct execution, manual access, and unmonitored systems remain outside that boundary."
        points={[
          "Agree on eligible tool-call paths",
          "Document coverage and exclusions",
          "Review changes to routing and scope",
        ]}
        diagram="logging-scope"
      />
      <Editorial
        number="02"
        eyebrow="Data context"
        title="Use only the context the decision needs."
        text="Data minimization is a design goal. A scoped evaluation must confirm which fields are needed, where they are processed, and how long any record is retained."
        points={[
          "Define required fields before evaluation",
          "Agree on masking and redaction expectations",
          "Confirm retention and processing practices",
        ]}
        diagram="data-minimization"
        reverse
        dark
      />
      <Editorial
        number="03"
        eyebrow="Responsibilities"
        title="Every control needs an owner."
        text="Separate policy ownership, review responsibility, and execution authority. Make their roles visible before a pilot begins."
        points={[
          "Name the policy owner and reviewers",
          "Agree on escalation and timeouts",
          "Confirm operational responsibilities",
        ]}
        diagram="trust-responsibilities"
      />
      <section className="section subpage-section">
        <div className="container">
          <SectionHeading
            eyebrow="Current status"
            title="Questions to resolve before production."
            text="This is a concept preview. It does not claim certifications, audited controls, production deployments, or verified performance."
          />
          <div className="principle-grid">
            {[
              [
                "Deployment",
                "Hosting, residency, system support, and availability must be confirmed.",
              ],
              [
                "Security practices",
                "Identity controls, encryption, incident response, and audit procedures need implementation and review.",
              ],
              [
                "Data handling",
                "Retention, deletion, access, subprocessors, and lawful processing need an agreed policy.",
              ],
              [
                "Product behavior",
                "Failure modes, approval timeouts, decision consistency, and routing coverage need validation.",
              ],
            ].map(([title, text], i) => (
              <article key={title} data-reveal>
                <Eyebrow>0{i + 1} / To confirm</Eyebrow>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <Button href="/contact" secondary>
            Discuss your requirements
          </Button>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
function Pilot() {
  return (
    <>
      <PageHero
        eyebrow="A scoped evaluation"
        title="Start small. Make the boundary concrete."
        text="Bring one agent workflow and a question worth answering. A proposed shadow-mode pilot starts with an agreed scope, policies, and success measures."
        art="pilot-boundary"
        secondaryHref="#pilot-request"
        diagram
      />
      <section className="section">
        <div className="container">
          <SectionHeading
            number="01"
            eyebrow="The evaluation sequence"
            title="Agree on the test before measuring it."
          />
          <div className="engagement-steps">
            {[
              [
                "Map the route",
                "Identify the agent, tools, destinations, and which calls are eligible for evaluation.",
              ],
              [
                "Define the policies",
                "Agree on the conditions, decision outcomes, and reviewers for the selected workflow.",
              ],
              [
                "Observe in shadow mode",
                "Explore proposed decisions without implying the boundary is enforcing production actions.",
              ],
              [
                "Review the evidence",
                "Compare coverage, outcome mix, exceptions, and decision timing against agreed criteria.",
              ],
            ].map(([title, text], i) => (
              <div className="engagement-step" key={title} data-reveal>
                <span>0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Editorial
        number="02"
        eyebrow="A useful scorecard"
        title="Measure the boundary you actually tested."
        text="Evaluation results should be tied to the agreed route. Volume, policy coverage, decisions, and review behavior all need a defined denominator."
        points={[
          "Eligible routed-call volume",
          "Coverage by agreed policy",
          "Outcome and exception distribution",
          "Decision timing and review completion",
        ]}
        diagram="pilot-scorecard"
        reverse
      />
      <section className="form-page" id="pilot-request">
        <div className="container">
          <div className="form-page-copy" data-reveal>
            <Eyebrow>Scope & commercial discussion</Eyebrow>
            <h2>What would you like to learn?</h2>
            <p>
              Tell us about the workflow and the outcome you want to evaluate.
              Pilot availability, scope, and pricing are discussed individually.
            </p>
            <div className="form-page-visual">
              <Diagram
                name="pilot-intake"
                alt="The proposed pilot intake moves from scope definition to agreed evaluation criteria."
              />
            </div>
          </div>
          <div className="form-panel" data-reveal>
            <h2>Request a pilot conversation</h2>
            <RequestForm mode="pilot" />
          </div>
        </div>
      </section>
    </>
  );
}
function About() {
  return (
    <>
      <PageHero
        eyebrow="Our approach"
        title="Clarity at the point of action."
        text="CallTether explores a simple idea: when an agent is about to act, the policy boundary should be explicit and the decision should be understandable."
        art="approval-chamber"
        photo
      />
      <Editorial
        number="01"
        eyebrow="The product principle"
        title="Make the consequential moment visible."
        text="Useful automation brings decisions closer to execution. We are exploring how a calm, deliberate boundary can make that moment easier for people to understand and govern."
        points={[
          "A clear input, decision, and next step",
          "A readable reason alongside the outcome",
          "A scope that acknowledges its limits",
        ]}
        diagram="company-principle"
      />
      <section className="section subpage-section">
        <div className="container">
          <SectionHeading
            number="02"
            eyebrow="The principles behind the product"
            title="A boundary built with intention."
          />
          <div className="principle-grid">
            {[
              [
                "Explicit scope",
                "Coverage follows the route. The product story should always make that boundary clear.",
              ],
              [
                "Understandable decisions",
                "A policy result should carry the reason and context needed for meaningful review.",
              ],
              [
                "Deliberate human input",
                "Approval should belong to a named person with clear responsibility and an agreed review window.",
              ],
              [
                "Honest evidence",
                "Concepts, example interfaces, and sample figures are labeled until real results can support them.",
              ],
            ].map(([title, text], i) => (
              <article key={title} data-reveal>
                <Eyebrow>0{i + 1} / Product principle</Eyebrow>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Editorial
        number="03"
        eyebrow="From concept to evaluation"
        title="Learn through a focused workflow."
        text="A useful next step is a guided product conversation around one specific route. It makes the assumptions visible before a wider implementation."
        points={[
          "Choose the action that matters",
          "Name the decision and responsibility",
          "Agree on what evidence would be useful",
        ]}
        diagram="company-process"
        reverse
      />
      <section className="section subpage-section">
        <div className="container">
          <h2>Company details</h2>
          <h3>CallTether</h3>
          <address className="company-address">
              364 Cong Hoa Street, Ward 13, Tan Binh District<br />
              Ho Chi Minh City, 790329<br />
              Vietnam
            </address>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
const guides = [
  {
    slug: "routed-boundaries",
    eyebrow: "Architecture / 04 min",
    title: "Where a routed boundary begins.",
    text: "A practical way to identify eligible calls, destinations, and the coverage gaps that routing creates.",
    art: "decision-archive",
  },
  {
    slug: "policy-context",
    eyebrow: "Policy design / 05 min",
    title: "Give the decision enough context.",
    text: "How to think about actions, destinations, scopes, and the minimum fields a policy needs.",
    art: "redaction-machine",
  },
  {
    slug: "human-review",
    eyebrow: "Operations / 04 min",
    title: "An approval needs an owner.",
    text: "Define the reviewer, the context, and what happens when an exception cannot be reviewed.",
    art: "approval-chamber",
  },
];
function Resources() {
  return (
    <>
      <PageHero
        eyebrow="Field notes & resources"
        title="A little clarity goes a long way."
        text="Explore the thinking behind policy boundaries, routed tool calls, and deliberate review. These guides explain the proposed model."
        art="guide-map"
        diagram
      />
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Start with the fundamentals"
            title="Useful ideas for your next conversation."
          />
          <div className="resource-grid">
            {guides.map((g) => (
              <article className="resource-card" key={g.slug} data-reveal>
                <Link
                  href={`/resources/${g.slug}`}
                  className="resource-art"
                  aria-label={g.title}
                >
                  <img
                    src={`/assets/images/${g.art}.webp`}
                    alt=""
                    width="1536"
                    height="1024"
                    loading="lazy"
                  />
                </Link>
                <Eyebrow>{g.eyebrow}</Eyebrow>
                <h3>
                  <Link href={`/resources/${g.slug}`}>{g.title}</Link>
                </h3>
                <p>{g.text}</p>
                <Link className="text-link" href={`/resources/${g.slug}`}>
                  Read the field note
                  <Icon name="arrow-right" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section faq-section">
        <div className="container faq-layout">
          <SectionHeading
            eyebrow="Frequently asked"
            title="Before you explore the boundary."
          />
          <FAQ />
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
function Conversion({ contact = false }: { contact?: boolean }) {
  return (
    <section className="form-page">
      <div className="container">
        <div className="form-page-copy" data-reveal>
          <Eyebrow>
            {contact ? "Start a conversation" : "A guided product walkthrough"}
          </Eyebrow>
          <h1>
            {contact
              ? "Let’s find your next step."
              : "See the boundary in context."}
          </h1>
          <p>
            {contact
              ? "Have a product, scope, or workspace question? Bring it into the conversation."
              : "Bring one agent workflow. Explore the proposed request, policy, and decision with a walkthrough built around your questions."}
          </p>
          <ul className="walkthrough-list">
            {(contact
              ? [
                  [
                    "Product questions",
                    "Explore the proposed model and its boundaries.",
                  ],
                  [
                    "A scoped pilot",
                    "Discuss the route and measures you want to evaluate.",
                  ],
                  [
                    "Workspace access",
                    "Ask about invitations and the concept workspace.",
                  ],
                ]
              : [
                  [
                    "Trace a routed request",
                    "Understand its action, destination, and scope.",
                  ],
                  [
                    "Inspect the policy decision",
                    "See how a rule changes the next step.",
                  ],
                  [
                    "Review the evidence",
                    "Connect the record back to the original request.",
                  ],
                ]
            ).map(([title, text], i) => (
              <li key={title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="form-page-visual">
            <Diagram
              name={contact ? "contact-routing" : "demo-selection"}
              alt={
                contact
                  ? "Contact inquiries are routed to the relevant conversation."
                  : "A guided walkthrough shows sample requests and their policy context."
              }
            />
          </div>
        </div>
        <div className="form-panel" data-reveal>
          <h2>{contact ? "How can we help?" : "Request a demo"}</h2>
          <RequestForm mode={contact ? "contact" : "demo"} />
        </div>
      </div>
    </section>
  );
}
function SignIn() {
  return (
    <section className="signin-page">
      <div className="container signin-layout">
        <div className="signin-art">
          <Eyebrow>The CallTether workspace</Eyebrow>
          <h2>
            Your boundary.
            <br />
            Your perspective.
          </h2>
          <p>
            A proposed shared workspace for decisions, policies, and deliberate
            review.
          </p>
          <img
            src="/assets/images/gatekeeper-closed.webp"
            width="1254"
            height="1254"
            alt="The CallTether Gatekeeper"
          />
        </div>
        <div className="signin-content">
          <Eyebrow>Invited workspace</Eyebrow>
          <h1>Welcome back.</h1>
          <p>Sign in to your workspace preview.</p>
          <SignInForm />
        </div>
      </div>
    </section>
  );
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!titles[slug]) notFound();
  switch (slug) {
    case "product":
      return <Product />;
    case "solutions":
      return <Solutions />;
    case "trust":
      return <Trust />;
    case "pilot":
      return <Pilot />;
    case "about":
      return <About />;
    case "resources":
      return <Resources />;
    case "contact":
      return <Conversion contact />;
    case "request-demo":
      return <Conversion />;
    case "sign-in":
      return <SignIn />;
    default:
      notFound();
  }
}
