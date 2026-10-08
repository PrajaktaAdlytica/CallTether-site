import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Button, Diagram, Eyebrow } from "@/components/ui";
const guides: Record<
  string,
  { title: string; lead: string; diagram: string; sections: [string, string][] }
> = {
  "routed-boundaries": {
    title: "Where a routed boundary begins.",
    lead: "The first design decision is the route. It tells you which actions are eligible for evaluation and which remain outside the proposed boundary.",
    diagram: "routed-boundary",
    sections: [
      [
        "Start with an action you can name.",
        "Choose one agent workflow: reading from a database, exporting records, creating a support ticket, or sending an external message. Identify the tool request and its destination before deciding which policy applies.",
      ],
      [
        "Map the route and its exclusions.",
        "A policy decision point can only evaluate calls passed through its route. Document direct tool calls, manual access, and other paths separately. Coverage should always refer to eligible routed calls.",
      ],
      [
        "Agree on behavior at the boundary.",
        "Define what an allow, deny, or approval outcome means for this route. Include failure and timeout behavior. Shadow-mode evaluation is a way to explore proposed decisions without implying production enforcement.",
      ],
      [
        "Measure the scope you actually evaluated.",
        "Volume, coverage, and outcome measures need a clear denominator and test period. Keep example figures labeled until measured evidence is available.",
      ],
    ],
  },
  "policy-context": {
    title: "Give the decision enough context.",
    lead: "A policy needs a clear description of the action, its destination, and the scope that matters for the decision.",
    diagram: "policy-composition",
    sections: [
      [
        "Separate intent from permission.",
        "An agent instruction describes what the agent wants to accomplish. A policy describes the conditions under which a specific action may proceed. Reading data and exporting it can require different decisions.",
      ],
      [
        "Name the conditions in plain terms.",
        "Consider tool action, permitted destination, data category, role, and operational scope. Keep the rule understandable enough that its matched condition can explain the result.",
      ],
      [
        "Use the minimum useful context.",
        "More fields are not automatically better. Agree which inputs the decision actually requires, and confirm masking, processing, and retention practices before connecting real systems.",
      ],
      [
        "Make changes reviewable.",
        "Policy ownership and version history should be defined. A useful evaluation connects a decision to the policy version and input context used for that decision.",
      ],
    ],
  },
  "human-review": {
    title: "An approval needs an owner.",
    lead: "A review queue only becomes a useful decision path when it has a responsible person, sufficient context, and explicit behavior when the review expires.",
    diagram: "owner-approval",
    sections: [
      [
        "Define what requires a person.",
        "Select the action types or contexts that should request human review. Make that condition explicit rather than routing every uncertain action into an unowned queue.",
      ],
      [
        "Give the reviewer enough context.",
        "Present the requested action, destination, matched rule, and reason for escalation together. The reviewer should understand what their decision would authorize.",
      ],
      [
        "Decide what happens when no one responds.",
        "Set an agreed review window and define escalation, denial, or another deliberate fallback. Timeout behavior is part of the policy decision, not an afterthought.",
      ],
      [
        "Keep responsibility connected to the record.",
        "A proposed approval record should make the owner, decision, and relevant context understandable. Confirm the operational and data requirements before any production implementation.",
      ],
    ],
  },
};
export function generateStaticParams() {
  return Object.keys(guides).map((guide) => ({ guide }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ guide: string }>;
}): Promise<Metadata> {
  const { guide } = await params;
  return { title: guides[guide]?.title || "Field note" };
}
export default async function Guide({
  params,
}: {
  params: Promise<{ guide: string }>;
}) {
  const { guide } = await params;
  const g = guides[guide];
  if (!g) notFound();
  return (
    <article className="guide-page">
      <div className="guide-content">
        <Eyebrow>CallTether field notes · Proposed model</Eyebrow>
        <h1>{g.title}</h1>
        <p className="lead">{g.lead}</p>
        <Diagram name={g.diagram} alt={g.lead} />
        {g.sections.map(([title, text]) => (
          <section key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </section>
        ))}
        <div style={{ marginTop: 45 }}>
          <Button href="/request-demo">Discuss your workflow</Button>
        </div>
      </div>
    </article>
  );
}
