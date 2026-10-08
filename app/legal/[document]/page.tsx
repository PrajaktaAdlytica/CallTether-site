import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Button, Eyebrow, Icon } from "@/components/ui";
export function generateStaticParams() {
  return [{ document: "privacy" }, { document: "terms" }];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ document: string }>;
}): Promise<Metadata> {
  const { document } = await params;
  return {
    title: document === "privacy" ? "Privacy preview" : "Terms preview",
    robots: { index: false, follow: false },
  };
}
export default async function Legal({
  params,
}: {
  params: Promise<{ document: string }>;
}) {
  const { document } = await params;
  if (!["privacy", "terms"].includes(document)) notFound();
  const privacy = document === "privacy";
  return (
    <article className="legal-page">
      <div className="legal-content">
        <Eyebrow>Website concept · Legal information</Eyebrow>
        <h1>{privacy ? "Privacy information." : "Terms information."}</h1>
        <div className="legal-banner">
          <Icon name="info" />
          <span>
            This is a preview notice, not a final company policy. Legal text and
            actual operating practices require review before public launch.
          </span>
        </div>
        <h2>
          {privacy
            ? "How this local preview handles inputs"
            : "Using this concept preview"}
        </h2>
        <p>
          {privacy
            ? "The demo, pilot, contact, and sign-in forms in this local website do not send or store entered values. Inputs stay in the current page session and disappear when the page is closed or reloaded. Use sample details rather than personal information or real credentials."
            : "This website presents the CallTether product direction and proposed workflows. It does not provide a working policy proxy, customer workspace, production authentication, or a booking service. Concept interface data and figures are illustrative."}
        </p>
        <h2>
          {privacy
            ? "Assets and analytics"
            : "Sample content and product availability"}
        </h2>
        <p>
          {privacy
            ? "Fonts, icons, and visual assets are served with this site. The preview does not include marketing analytics, advertising scripts, or a connected customer data service. Hosting providers may process standard network requests if the preview is later hosted. Their actual practices need review at deployment."
            : "Testimonials and attributed people labeled as design samples are fictional. Statistics labeled as illustrative are not measured performance or customer results. Availability, deployment support, pilot scope, and commercial terms need agreement before an actual engagement."}
        </p>
        <h2>Before public launch</h2>
        <p>
          {privacy
            ? "A reviewed privacy policy must identify the legal entity, contact channel, purposes of processing, lawful basis where applicable, storage and retention, service providers, international transfers, and applicable user rights."
            : "Reviewed terms must identify the legal entity, permitted use, commercial and service conditions, intellectual property terms, responsibilities, limitations, applicable law, and a contact channel."}
        </p>
        <h2>Questions about this preview</h2>
        <p>
          Use the contact page to explore the intended inquiry flow. Its form is
          currently a local presentation and does not deliver messages.
        </p>
        <div style={{ marginTop: 35 }}>
          <Button href="/contact" secondary>
            Contact preview
          </Button>
        </div>
      </div>
    </article>
  );
}
