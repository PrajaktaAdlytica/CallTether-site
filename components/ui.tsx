import Link from "next/link";
import type { ReactNode } from "react";
export function Icon({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  return (
    <svg
      className={`icon ${className}`}
      width="20"
      height="20"
      aria-hidden="true"
    >
      <use href={`/assets/icons/sprite.svg#ct-${name}`} />
    </svg>
  );
}
export function Button({
  href,
  children,
  secondary = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  className?: string;
}) {
  return (
    <Link
      className={`button ${secondary ? "secondary" : "primary"} ${className}`}
      href={href}
    >
      <span>{children}</span>
      <Icon name="arrow-right" />
    </Link>
  );
}
export function Eyebrow({
  children,
  number,
}: {
  children: ReactNode;
  number?: string;
}) {
  return (
    <div className="eyebrow">
      {number && <span className="chapter-number">{number}</span>}
      {children}
    </div>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  text,
  number,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  number?: string;
}) {
  return (
    <div className="section-heading" data-reveal>
      <Eyebrow number={number}>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {text && <p className="lead">{text}</p>}
    </div>
  );
}
export function Diagram({ name, alt }: { name: string; alt: string }) {
  return (
    <figure className="diagram">
      <img
        src={`/assets/diagrams/${name}.svg`}
        alt={alt}
        loading="lazy"
        width="800"
        height="500"
      />
      <figcaption>
        <span>Illustrative architecture · Proposed workflow</span>
        <a
          href={`/assets/diagrams/${name}.svg`}
          target="_blank"
          rel="noreferrer"
          aria-label="Open diagram at full size"
        >
          Open diagram
          <Icon name="arrow-up-right" />
        </a>
      </figcaption>
    </figure>
  );
}
export function Status({ value }: { value: "Allow" | "Deny" | "Approval" }) {
  return (
    <span className={`status ${value.toLowerCase()}`}>
      <Icon name={value.toLowerCase()} />
      {value}
    </span>
  );
}
