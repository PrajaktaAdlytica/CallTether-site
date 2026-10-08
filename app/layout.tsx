import type { Metadata } from "next";
import { Navigation, Footer } from "@/components/navigation";
import { MotionProvider } from "@/components/motion";
import "lenis/dist/lenis.css";
import "./tokens.css";
import "./globals.css";
import "./entry-video.css";
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "CallTether — Clarity at the point of action",
    template: "%s | CallTether",
  },
  description:
    "Explore a clearer policy boundary for routed agent tool calls. See the proposed workflow and request a guided CallTether demo.",
  icons: {
    icon: [
      { url: "/assets/favicons/favicon.svg", type: "image/svg+xml" },
      { url: "/assets/favicons/favicon.ico" },
    ],
    apple: "/assets/favicons/icon-180.png",
  },
  manifest: "/assets/favicons/site.webmanifest",
  openGraph: {
    title: "CallTether — Give agent actions a clear boundary",
    description: "Clarity at the point of action.",
    images: [
      {
        url: "/assets/images/selected-direction-reference.png",
        width: 1086,
        height: 1448,
      },
    ],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body id="top">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <MotionProvider />
        <Navigation />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
