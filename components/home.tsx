"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button, Diagram, Eyebrow, Icon, SectionHeading, Status } from "./ui";
import { RequestForm } from "./forms";
import { EntryVideo } from "./entry-video";
gsap.registerPlugin(ScrollTrigger, useGSAP);
const records = [
  {
    id: "CT-00482",
    tool: "export_contacts",
    path: "POST /v1/export",
    agent: "research-agent",
    destination: "api.partner.com",
    rule: "destination.allowlist",
    status: "Deny" as const,
    reason:
      "The external destination is outside the permitted list. The proposed route stops the request before execution.",
    time: "10:42:08",
  },
  {
    id: "CT-00481",
    tool: "read_database",
    path: "GET /customers",
    agent: "support-agent",
    destination: "internal.crm",
    rule: "scope.read_only",
    status: "Allow" as const,
    reason:
      "Read-only scope and destination match the policy context. The routed request may continue.",
    time: "10:42:06",
  },
  {
    id: "CT-00480",
    tool: "send_email",
    path: "POST /v1/send",
    agent: "outreach-agent",
    destination: "external.recipient",
    rule: "review.external_send",
    status: "Approval" as const,
    reason:
      "External communications require a named reviewer. The proposed request waits for deliberate review.",
    time: "10:41:59",
  },
  {
    id: "CT-00479",
    tool: "create_ticket",
    path: "POST /v1/tickets",
    agent: "support-agent",
    destination: "internal.support",
    rule: "scope.support_write",
    status: "Allow" as const,
    reason: "The ticket action matches the agreed workspace and support scope.",
    time: "10:41:52",
  },
];
const scorecard = [
  { value: 12480, decimals: 0, suffix: "", label: "Routed calls reviewed", note: "Sample evaluation volume" },
  { value: 3, decimals: 0, suffix: "", label: "Decision outcomes", note: "Allow · Deny · Approval" },
  { value: 96.4, decimals: 1, suffix: "%", label: "Policy coverage", note: "Illustrative coverage target" },
  { value: 42, decimals: 0, suffix: " ms", label: "Decision time", note: "Illustrative timing example" },
];
function Metrics() {
  const section = useRef<HTMLElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      section.current?.querySelectorAll<HTMLElement>("[data-counter]").forEach((element, index) => {
        const metric = scorecard[index];
        const count = { value: 0 };
        const render = () => { element.textContent = count.value.toLocaleString("en-US", {
          minimumFractionDigits: metric.decimals, maximumFractionDigits: metric.decimals,
        }) + metric.suffix; };
        render();
        gsap.to(count, { value: metric.value, duration: 2, delay: index * 0.12,
          ease: "power2.out", onUpdate: render,
          scrollTrigger: { trigger: section.current, start: "top 82%", once: true },
        });
      });
      return () => section.current?.querySelectorAll<HTMLElement>("[data-counter]").forEach((el, i) => {
        el.textContent = scorecard[i].value.toLocaleString("en-US") + scorecard[i].suffix;
      });
    });
    return () => media.revert();
  }, { scope: section });
  return <section className="metric-section" ref={section}
    onPointerMove={event => {
      if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
      event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
    }}
    onPointerLeave={event => {
      event.currentTarget.style.removeProperty("--pointer-x");
      event.currentTarget.style.removeProperty("--pointer-y");
    }}>
    <div className="metric-orbits" aria-hidden="true"><i /><i /><i /><b /></div>
    <div className="container">
      <div className="metrics-intro">
        <Eyebrow number="05">A sample evaluation, made visible</Eyebrow>
        <p>Illustrative pilot scorecard.<br />These are sample numbers, not measured results.</p>
      </div>
      <div className="metrics">
        {scorecard.map(metric => <div className="metric" key={metric.label}>
          <strong aria-label={metric.value.toLocaleString("en-US") + metric.suffix}>
            <span data-counter aria-hidden="true">{metric.value.toLocaleString("en-US") + metric.suffix}</span>
          </strong>
          <h3>{metric.label}</h3><small>{metric.note}</small>
        </div>)}
      </div>
    </div>
  </section>;
}

export function Hero() {
  const hero = useRef<HTMLElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const cards = Array.from(hero.current?.querySelectorAll<HTMLElement>(".route-ticket") ?? [])
        .filter(card => getComputedStyle(card).display !== "none");
      gsap.fromTo(cards, { autoAlpha: 0 }, {
        autoAlpha: 1, duration: 0.65, delay: 0.3, stagger: 1.5, ease: "power2.out",
      });
    });
    return () => media.revert();
  }, { scope: hero });
  return (
    <section className="hero" id="hero" ref={hero}>
      <img
        className="hero-courtyard"
        src="/assets/images/mineral-courtyard.webp"
        alt=""
        width="1672"
        height="941"
        fetchPriority="high"
      />
      <div className="hero-wash" />
      <div className="hero-content">
        <Eyebrow>Clarity at the point of action</Eyebrow>
        <h1>
          Give agent actions
          <br />a clear boundary.
        </h1>
        <p>
          Evaluate routed tool calls against your policies.
          <br className="desktop-break" /> Before they reach your systems.
        </p>
        <div className="hero-actions">
          <Button href="/request-demo">Request a demo</Button>
          <Button href="#boundary-story" secondary>
            Meet the boundary
          </Button>
        </div>
      </div>
      <div className="hero-side left">
        <span>More control</span>
        <span>for agent</span>
        <span>actions</span>
        <i />
      </div>
      <div className="hero-side right">
        <span>Safer systems.</span>
        <span>Brighter</span>
        <span>possibilities.</span>
        <i />
      </div>
      <div className="hero-world">
        <img
          className="hero-gate"
          data-parallax
          src="/assets/images/gatekeeper-closed.webp"
          alt="An architectural Gatekeeper in cream stone, pine green and copper, representing a policy boundary"
          width="1254"
          height="1254"
        />
        <div className="hero-route" aria-label="Illustrative routed tool calls">
          <div className="route-line" />
          <div className="route-ticket ticket-read">
            <Icon name="layers" />
            <div>
              <strong>read_database</strong>
              <small>GET /customers</small>
            </div>
            <Icon name="arrow-right" />
          </div>
          <div className="route-ticket ticket-export">
            <Icon name="document" />
            <div>
              <strong>export_contacts</strong>
              <small>POST /v1/export</small>
            </div>
            <Icon name="arrow-right" />
          </div>
          <div className="route-ticket ticket-create">
            <Icon name="queue" />
            <div>
              <strong>create_ticket</strong>
              <small>POST /v1/tickets</small>
            </div>
            <Icon name="arrow-right" />
          </div>
          <div className="route-ticket ticket-email">
            <Icon name="email" />
            <div>
              <strong>send_email</strong>
              <small>POST /v1/send</small>
            </div>
            <Icon name="arrow-right" />
          </div>
        </div>
        <div className="hero-decision">
          <span className="eyebrow">Illustrative decision</span>
          <div>
            <Icon name="document" />
            <strong>export_contacts</strong>
          </div>
          <small>destination.allowlist</small>
          <Status value="Deny" />
          <p>Unapproved destination</p>
        </div>
        <div className="hero-scope">
          <Icon name="boundary" /> Only routed calls are evaluated
        </div>
      </div>
      <div className="hero-bottom">
        <span>Concept preview · Synthetic data</span>
        <a href="#problem">
          Scroll to discover
          <Icon name="chevron-down" />
        </a>
        <span>01 / The boundary</span>
      </div>
    </section>
  );
}
const storyChapters = [
  {
    title: "First, understand the request.",
    description:
      "An agent wants to export customer records. The route brings the action, destination, and scope into view.",
    label: "Request arrives",
    icon: "route",
  },
  {
    title: "Then, make the rule explicit.",
    description:
      "The destination is checked against an agreed policy. A read permission is not permission to send data anywhere.",
    label: "Policy evaluates",
    icon: "policy",
  },
  {
    title: "A clear decision. A reason you can read.",
    description:
      "The proposed route denies this export. The matched rule and context become a record for your team to review.",
    label: "Decision recorded",
    icon: "receipt",
  },
];
export function BoundaryStory() {
  const ref = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState(0);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 1024px) and (min-height: 800px) and (prefers-reduced-motion: no-preference)",
        () => {
          const timeline = gsap.timeline({
            scrollTrigger: {
              id: "boundary-story",
              trigger: ref.current,
              start: "top top+=80",
              end: "+=1900",
              pin: ".story-stage",
              scrub: 0.6,
              onUpdate: (self) =>
                setPhase(Math.min(2, Math.floor(self.progress * 3))),
            },
          });
          timeline
            .fromTo(
              ".story-packet",
              { x: -30, opacity: 0.9 },
              { x: 0, opacity: 1, duration: 1 },
            )
            .fromTo(
              ".policy-row",
              { opacity: 0.75, x: 12 },
              { opacity: 1, x: 0, stagger: 0.25, duration: 1 },
            )
            .fromTo(
              ".story-result",
              { scale: 0.96, opacity: 0.85 },
              { scale: 1, opacity: 1, duration: 1 },
            )
            .to(".story-progress-fill", { scaleX: 1, duration: 3 }, 0);
          return () => timeline.kill();
        },
      );
      return () => mm.revert();
    },
    { scope: ref },
  );
  function moveChapter(index: number) {
    const trigger = ScrollTrigger.getById("boundary-story");
    if (trigger) {
      window.scrollTo({
        top:
          trigger.start + (trigger.end - trigger.start) * ((index + 0.15) / 3),
        behavior: "smooth",
      });
    } else setPhase(index);
  }
  return (
    <section className="boundary-story dark" id="boundary-story" ref={ref}>
      <div className="story-stage">
        <div className="container">
          <div className="story-top">
            <Eyebrow number="03">Meet the boundary</Eyebrow>
            <a className="text-link" href="#workspace">
              Skip the story
              <Icon name="arrow-right" />
            </a>
          </div>
          <div className="story-heading">
            <div>
              <h2>{storyChapters[phase].title}</h2>
              <p>{storyChapters[phase].description}</p>
            </div>
            <span className="story-index">
              0{phase + 1}
              <small>/ 03</small>
            </span>
          </div>
          <div className="story-flow">
            <div
              className={`story-panel story-packet ${phase === 0 ? "active" : ""}`}
            >
              <div className="panel-title">
                <Icon name="document" />
                <span>01 / Request</span>
              </div>
              <h3>export_contacts</h3>
              <dl>
                <div>
                  <dt>Agent</dt>
                  <dd>research-agent</dd>
                </div>
                <div>
                  <dt>Destination</dt>
                  <dd>api.partner.com</dd>
                </div>
                <div>
                  <dt>Scope</dt>
                  <dd>12,480 records</dd>
                </div>
              </dl>
              <div className="panel-footer">
                <Icon name="route" /> Routed through boundary
              </div>
            </div>
            <div className="flow-arrow">
              <Icon name="arrow-right" />
            </div>
            <div
              className={`story-panel policy-panel ${phase === 1 ? "active" : ""}`}
            >
              <div className="panel-title">
                <Icon name="policy" />
                <span>02 / Policy</span>
              </div>
              <h3>Context meets conditions.</h3>
              <div className="policy-row">
                <Icon name="check" />
                <span>Action recognized</span>
                <small>01</small>
              </div>
              <div className="policy-row">
                <Icon name="check" />
                <span>Scope identified</span>
                <small>02</small>
              </div>
              <div className="policy-row rule-mismatch">
                <Icon name="deny" />
                <span>Destination not on list</span>
                <small>03</small>
              </div>
              <code>destination.allowlist</code>
            </div>
            <div className="flow-arrow">
              <Icon name="arrow-right" />
            </div>
            <div
              className={`story-panel story-result ${phase === 2 ? "active" : ""}`}
            >
              <div className="panel-title">
                <Icon name="receipt" />
                <span>03 / Decision</span>
              </div>
              <Status value="Deny" />
              <h3>A boundary held.</h3>
              <p>
                Unapproved destination.
                <br />
                Request does not proceed.
              </p>
              <div className="decision-receipt">
                <span>CT-00482</span>
                <span>Rule + reason + context</span>
              </div>
            </div>
          </div>
          <div className="story-chapters">
            {storyChapters.map((chapter, i) => (
              <button
                key={chapter.label}
                onClick={() => moveChapter(i)}
                aria-pressed={phase === i}
                className={phase === i ? "selected" : ""}
              >
                <span>0{i + 1}</span>
                <Icon name={chapter.icon} />
                {chapter.label}
              </button>
            ))}
          </div>
          <div className="story-progress">
            <div className="story-progress-fill" />
          </div>
          <p className="story-caption">
            Illustrative workflow · Synthetic data · Proposed product behavior
          </p>
        </div>
      </div>
    </section>
  );
}
export function WorkspacePreview() {
  const [selected, setSelected] = useState(0);
  const [filter, setFilter] = useState("All");
  const record = records[selected];
  return (
    <div className="workspace">
      <div className="workspace-sidebar">
        <img
          src="/assets/logos/mark-primary.svg"
          width="25"
          height="33"
          alt=""
        />
        <div className="workspace-sidebar-item selected">
          <Icon name="receipt" />
          <span>Decisions</span>
        </div>
        <div className="workspace-sidebar-item">
          <Icon name="policy" />
          <span>Policies</span>
        </div>
        <div className="workspace-sidebar-item">
          <Icon name="approval" />
          <span>Review queue</span>
        </div>
        <div className="workspace-sidebar-bottom">
          <Icon name="user" />
          <span>Sample workspace</span>
        </div>
      </div>
      <div className="workspace-main">
        <div className="workspace-head">
          <div>
            <span className="eyebrow">Research workspace</span>
            <h3>Decision records</h3>
          </div>
          <span className="synthetic-tag">
            <span />
            Synthetic data
          </span>
        </div>
        <div className="workspace-toolbar">
          <span>
            <Icon name="filter" />
            Outcome
          </span>
          <div
            className="segmented"
            role="group"
            aria-label="Filter decision records"
          >
            {["All", "Allow", "Deny", "Approval"].map((f) => (
              <button
                key={f}
                aria-pressed={filter === f}
                className={filter === f ? "selected" : ""}
                onClick={() => {
                  setFilter(f);
                  setSelected(
                    f === "All" ? 0 : records.findIndex((r) => r.status === f),
                  );
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="workspace-body">
          <div className="record-list">
            {records.map(
              (r, i) =>
                (filter === "All" || filter === r.status) && (
                  <button
                    key={r.id}
                    className={`record-row ${selected === i ? "selected" : ""}`}
                    onClick={() => setSelected(i)}
                  >
                    <div className="record-icon">
                      <Icon
                        name={
                          r.status === "Approval"
                            ? "email"
                            : r.status === "Deny"
                              ? "document"
                              : "layers"
                        }
                      />
                    </div>
                    <div>
                      <strong>{r.tool}</strong>
                      <small>
                        {r.agent} · {r.time}
                      </small>
                    </div>
                    <Status value={r.status} />
                    <Icon name="chevron-right" />
                  </button>
                ),
            )}
          </div>
          <div className="record-inspector" aria-live="polite">
            <div className="inspector-top">
              <span className="eyebrow">Decision details</span>
              <span>{record.id}</span>
            </div>
            <Status value={record.status} />
            <h4>{record.tool}</h4>
            <p>{record.reason}</p>
            <dl>
              <div>
                <dt>Matched rule</dt>
                <dd>{record.rule}</dd>
              </div>
              <div>
                <dt>Destination</dt>
                <dd>{record.destination}</dd>
              </div>
              <div>
                <dt>Route</dt>
                <dd>{record.path}</dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="workspace-foot">
          <Icon name="info" /> Select a record to inspect its context. This is a
          concept UI, using synthetic data.
        </div>
      </div>
    </div>
  );
}
const teams = [
  {
    name: "Security",
    title: "Make the boundary visible.",
    text: "Inspect which policy matched, what the agent asked to do, and why the proposed route allowed or stopped the action.",
    image: "decision-archive",
    icon: "boundary",
    href: "/solutions#security",
    points: [
      "Understand the decision context",
      "Review the policy boundary",
      "Agree on evidence for a pilot",
    ],
  },
  {
    name: "Platform",
    title: "Keep control close to execution.",
    text: "Explore how a policy check could sit in your routed tool-call flow, with explicit inputs and readable decisions.",
    image: "redaction-machine",
    icon: "code",
    href: "/solutions#platform",
    points: [
      "Map your routed tool calls",
      "Define minimal policy context",
      "Start with shadow-mode evaluation",
    ],
  },
  {
    name: "Operations",
    title: "Give exceptions a deliberate path.",
    text: "Define which actions need a person, who reviews them, and what happens when the proposed review window expires.",
    image: "approval-chamber",
    icon: "approval",
    href: "/solutions#operations",
    points: [
      "Name the review owner",
      "Keep requests and reasons together",
      "Decide timeout behavior up front",
    ],
  },
];
export function TeamTabs() {
  const [active, setActive] = useState(0);
  const team = teams[active];
  return (
    <div className="team-explorer">
      <div className="team-tabs" role="tablist" aria-label="Explore by team">
        {teams.map((t, i) => (
          <button
            role="tab"
            id={`team-tab-${i}`}
            aria-selected={i === active}
            aria-controls="team-panel"
            tabIndex={i === active ? 0 : -1}
            key={t.name}
            className={i === active ? "selected" : ""}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                e.preventDefault();
                const n = (active + (e.key === "ArrowRight" ? 1 : -1) + 3) % 3;
                setActive(n);
                document.getElementById(`team-tab-${n}`)?.focus();
              }
            }}
          >
            <Icon name={t.icon} />
            {t.name}
            <Icon name="arrow-up-right" />
          </button>
        ))}
      </div>
      <div
        className="team-panel"
        role="tabpanel"
        id="team-panel"
        aria-labelledby={`team-tab-${active}`}
        key={active}
      >
        <div className="team-image">
          <img
            src={`/assets/images/${team.image}.webp`}
            alt={
              team.name === "Security"
                ? "Stone decision records arranged as an archive"
                : team.name === "Platform"
                  ? "A mineral and copper mechanism representing controlled data flow"
                  : "A tactile approval chamber in the Gatekeeper material palette"
            }
            loading="lazy"
            width="1536"
            height="1024"
          />
          <span className="image-caption">
            Gatekeeper / {team.name.toLowerCase()} study
          </span>
        </div>
        <div className="team-copy">
          <Eyebrow>For {team.name.toLowerCase()} teams</Eyebrow>
          <h3>{team.title}</h3>
          <p>{team.text}</p>
          <ul>
            {team.points.map((p) => (
              <li key={p}>
                <Icon name="check" />
                {p}
              </li>
            ))}
          </ul>
          <Link className="text-link" href={team.href}>
            Explore the workflow
            <Icon name="arrow-right" />
          </Link>
        </div>
      </div>
    </div>
  );
}
const voices = [
  {
    quote:
      "“I want to see the reason for a decision at the exact point an agent is about to act.”",
    name: "Maya Chen",
    role: "Security lead",
    initials: "MC",
    context: "Policy visibility",
  },
  {
    quote:
      "“A clear route boundary gives us something concrete to evaluate, measure, and improve.”",
    name: "Elliot Reed",
    role: "Platform engineer",
    initials: "ER",
    context: "Routed workflows",
  },
  {
    quote:
      "“Exceptions need an owner and a decision. A queue alone doesn’t answer either question.”",
    name: "Nora Patel",
    role: "Operations lead",
    initials: "NP",
    context: "Deliberate review",
  },
];
export function Testimonials() {
  const [active, setActive] = useState(0);
  const voice = voices[active];
  return (
    <section className="testimonials">
      <div className="container">
        <div className="testimonial-head">
          <Eyebrow number="07">Perspectives on a clearer boundary</Eyebrow>
          <span className="sample-label">
            Fictional quotes & people · Design samples
          </span>
        </div>
        <div className="quote-layout">
          <span className="quote-context">
            <Icon name="user" />
            {voice.context}
          </span>
          <div className="quote-content" aria-live="polite">
            <blockquote>{voice.quote}</blockquote>
            <div className="quote-person">
              <div className="avatar">{voice.initials}</div>
              <div>
                <strong>{voice.name}</strong>
                <small>{voice.role} · Fictional persona</small>
              </div>
            </div>
          </div>
        </div>
        <div className="quote-controls">
          <span>
            0{active + 1} <i>/ 03</i>
          </span>
          <div>
            <button
              aria-label="Previous sample testimonial"
              onClick={() => setActive((active + 2) % 3)}
            >
              <Icon name="arrow-left" />
            </button>
            <button
              aria-label="Next sample testimonial"
              onClick={() => setActive((active + 1) % 3)}
            >
              <Icon name="arrow-right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
const faqs = [
  [
    "What does CallTether evaluate?",
    "The proposed boundary evaluates agent tool calls routed through it, using the action, destination, and agreed policy context. Direct calls and unmonitored systems are outside that route.",
  ],
  [
    "What will the demo show?",
    "A guided prototype walkthrough of a routed request, a policy check, a decision, and a reviewable record. All displayed data is synthetic.",
  ],
  [
    "Is CallTether available in production?",
    "This website presents a concept and product direction. Production capabilities, supported deployments, and availability have not been verified. A walkthrough can explore the proposed model.",
  ],
  [
    "Can a person approve an action?",
    "Human approval is part of the proposed model. A scoped evaluation would define the reviewer, required context, and behavior when a review expires or an owner is unavailable.",
  ],
  [
    "How would a pilot start?",
    "Start by identifying one agent workflow and its route boundary. Agree on policies, success measures, and data handling before exploring a shadow-mode evaluation.",
  ],
  [
    "Does it cover every agent action?",
    "Coverage depends on routing. Only eligible calls passed through the proposed boundary are evaluated. It does not imply coverage of direct execution, manual access, or unconnected systems.",
  ],
];
export function FAQ({ limit }: { limit?: number }) {
  return (
    <div className="faq-list">
      {faqs.slice(0, limit).map(([q, a], i) => (
        <details key={q}>
          <summary>
            <span className="faq-index">0{i + 1}</span>
            <span>{q}</span>
            <Icon name="plus" />
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
export function FinalCTA() {
  return (
    <section className="final-cta" id="demo-request">
      <div className="container">
        <div className="cta-copy" data-reveal>
          <Eyebrow>Your next deliberate step</Eyebrow>
          <h2>
            Let’s make your
            <br />
            boundary clearer.
          </h2>
          <p>
            Bring one agent workflow. We’ll walk through the proposed route, its
            policies, and the decisions that matter.
          </p>
          <div className="cta-bottom">
            <Icon name="calendar" />
            <span>
              Guided prototype walkthrough
              <br />
              <small>Built around your workflow</small>
            </span>
          </div>
        </div>
        <div className="cta-form" data-reveal>
          <h3>Request a demo</h3>
          <RequestForm compact />
        </div>
      </div>
    </section>
  );
}
export function Home() {
  return (
    <>
      <aside className="funding-announcement" aria-label="Funding announcement">
        <strong>CallTether has secured venture capital funding.</strong>
        <span>Investor and funding amount to be announced.</span>
      </aside>
      <EntryVideo />
      <Hero />
      <div className="intro-strip">
        <div className="container">
          <span>
            <Icon name="route" />
            Routed tool calls
          </span>
          <Icon name="arrow-right" />
          <span>
            <Icon name="policy" />
            Explicit policies
          </span>
          <Icon name="arrow-right" />
          <span>
            <Icon name="receipt" />
            Understandable decisions
          </span>
          <span className="intro-caption">One deliberate boundary.</span>
        </div>
      </div>
      <section className="problem section" id="problem">
        <div className="container">
          <div className="split-heading">
            <SectionHeading
              number="02"
              eyebrow="The moment that matters"
              title="An instruction isn’t a permission."
            />
            <div className="section-aside" data-reveal>
              <p className="lead">
                Agents can move from a useful answer to a consequential action
                in a single tool call.
              </p>
              <p>
                The question changes from “What did it say?” to “What is it
                allowed to do, with this data, to this destination?”
              </p>
            </div>
          </div>
          <div className="problem-layout">
            <div className="problem-statement" data-reveal>
              <span className="large-symbol">
                <Icon name="split" />
              </span>
              <h3>
                A small request.
                <br />A different risk.
              </h3>
              <p>
                Reading customer records and exporting them are two different
                decisions. The boundary should make that difference visible.
              </p>
              <Link href="/product" className="text-link">
                Explore the product approach
                <Icon name="arrow-right" />
              </Link>
            </div>
            <Diagram
              name="coverage-gap"
              alt="A routed call path is evaluated at the gate; direct calls bypass the proposed boundary."
            />
          </div>
        </div>
      </section>
      <BoundaryStory />
      <section className="section workspace-section" id="workspace">
        <div className="container">
          <div className="split-heading">
            <SectionHeading
              number="04"
              eyebrow="A record, not a mystery"
              title="See the action. Understand the decision."
            />
            <div className="section-aside" data-reveal>
              <p>
                Every example brings the request, policy, and reason into one
                view. Explore the concept interface, then request a guided
                walkthrough.
              </p>
              <Button href="/request-demo" secondary>
                Request a product demo
              </Button>
            </div>
          </div>
          <div data-reveal>
            <WorkspacePreview />
          </div>
        </div>
      </section>
      <Metrics />
      <section className="section teams-section">
        <div className="container">
          <SectionHeading
            number="06"
            eyebrow="One boundary. Different responsibilities."
            title="Built around the people behind the policies."
            text="A shared decision story for security, platform, and operations teams."
          />
          <div data-reveal>
            <TeamTabs />
          </div>
        </div>
      </section>
      <Testimonials />
      <section className="section trust-section">
        <div className="container">
          <div className="split-heading">
            <SectionHeading
              number="08"
              eyebrow="Trust starts with scope"
              title="Know where the boundary begins. And ends."
            />
            <div className="section-aside" data-reveal>
              <p>
                Clear coverage is the foundation of a useful evaluation. Agree
                on the route, the policy context, and the responsibility for
                each decision.
              </p>
              <Link href="/trust" className="text-link">
                Explore trust & scope
                <Icon name="arrow-right" />
              </Link>
            </div>
          </div>
          <div className="trust-layout">
            <Diagram
              name="trust-boundary"
              alt="A proposed policy boundary separating routed agent calls from external and internal tool destinations."
            />
            <div className="trust-principles">
              {[
                [
                  "route",
                  "Explicit routing",
                  "Eligible calls must pass through the proposed route.",
                ],
                [
                  "redact",
                  "Deliberate context",
                  "Define the minimum information needed for a policy decision.",
                ],
                [
                  "user",
                  "Named responsibility",
                  "Agree on who sets policies and who owns exceptions.",
                ],
              ].map(([icon, title, text]) => (
                <div key={title} data-reveal>
                  <Icon name={icon} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section faq-section" id="questions">
        <div className="container faq-layout">
          <SectionHeading
            number="09"
            eyebrow="A few useful answers"
            title="Clear questions. Clearer next steps."
            text="Understand the concept, its scope, and what a walkthrough can show."
          />
          <FAQ />
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
