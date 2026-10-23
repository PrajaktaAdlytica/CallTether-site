"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button, Icon } from "./ui";
const menus = {
  Product: [
    {
      title: "Meet the boundary",
      detail: "From routed call to clear decision",
      href: "/product",
      icon: "gate",
    },
    {
      title: "Policy & context",
      detail: "Set the conditions for an action",
      href: "/product#policy",
      icon: "policy",
    },
    {
      title: "Decisions & records",
      detail: "See what happened and why",
      href: "/product#records",
      icon: "receipt",
    },
  ],
  Solutions: [
    {
      title: "Security teams",
      detail: "Make your governance boundary visible",
      href: "/solutions#security",
      icon: "boundary",
    },
    {
      title: "Platform teams",
      detail: "Keep control close to execution",
      href: "/solutions#platform",
      icon: "code",
    },
    {
      title: "Operations teams",
      detail: "Give exceptions a deliberate path",
      href: "/solutions#operations",
      icon: "approval",
    },
  ],
  Resources: [
    {
      title: "Field notes",
      detail: "Practical guides to agent boundaries",
      href: "/resources",
      icon: "book",
    },
    {
      title: "Trust & scope",
      detail: "Understand the proposed coverage",
      href: "/trust",
      icon: "lock",
    },
    {
      title: "A scoped pilot",
      detail: "Agree on what a test should measure",
      href: "/pilot",
      icon: "measure",
    },
  ],
};
export function Navigation() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const pathname = usePathname();
  const [entryVisible, setEntryVisible] = useState(true);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (pathname !== "/") return;
    const entry = document.getElementById("entry-video");
    if (!entry) return;
    const observer = new IntersectionObserver(([item]) => setEntryVisible(item.isIntersecting), { rootMargin: "-80px 0px 0px 0px" });
    observer.observe(entry);
    return () => observer.disconnect();
  }, [pathname]);
  useEffect(() => {
    setOpen(null);
    setMobile(false);
  }, [pathname]);
  useEffect(() => {
    const outside = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(null);
    };
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (open)
          ref.current
            ?.querySelector<HTMLButtonElement>(`[data-menu="${open}"]`)
            ?.focus();
        setOpen(null);
        setMobile(false);
      }
    };
    document.addEventListener("click", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("click", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);
  return (
    <header className={`site-header ${pathname === "/" ? `home-header ${entryVisible ? "entry-visible" : ""}` : ""}`} ref={ref} inert={pathname === "/" && entryVisible ? true : undefined}>
      <div className="nav-inner">
        <Link href="/" className="brand" aria-label="CallTether home">
          <img
            src="/assets/logos/lockup-primary.svg"
            width="180"
            height="40"
            alt="CallTether"
          />
        </Link>
        <nav
          className={`main-nav ${mobile ? "mobile-open" : ""}`}
          aria-label="Main navigation"
        >
          {Object.entries(menus).map(([title, items]) => (
            <div className="nav-group" key={title}>
              <button
                data-menu={title}
                className={`nav-link ${open === title ? "is-open" : ""}`}
                aria-expanded={open === title}
                aria-controls={`menu-${title}`}
                onClick={() => setOpen(open === title ? null : title)}
              >
                {title}
                <Icon name="chevron-down" />
              </button>
              {open === title && (
                <div className="mega-menu" id={`menu-${title}`}>
                  <div className="menu-caption">
                    <span className="eyebrow">{title}</span>
                    <p>
                      A clearer boundary.
                      <br />A more deliberate action.
                    </p>
                    <Link href="/request-demo" onClick={() => setOpen(null)}>
                      Request a walkthrough <Icon name="arrow-up-right" />
                    </Link>
                  </div>
                  <div className="menu-items">
                    {items.map((item) => (
                      <Link
                        href={item.href}
                        key={item.title}
                        onClick={() => {
                          setOpen(null);
                          setMobile(false);
                        }}
                      >
                        <Icon name={item.icon} />
                        <span>
                          <strong>{item.title}</strong>
                          <small>{item.detail}</small>
                        </span>
                        <Icon name="arrow-right" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <Link className="nav-link" href="/about">
            Company
          </Link>
          <div className="mobile-actions">
            <Link href="/sign-in">Sign in</Link>
            <Button href="/request-demo">Request a demo</Button>
          </div>
        </nav>
        <div className="nav-actions">
          <Link href="/sign-in" className="sign-in">
            Sign in
            <Icon name="arrow-up-right" />
          </Link>
          <Button href="/request-demo" className="small">
            Request a demo
          </Button>
        </div>
        <button
          className="menu-toggle"
          aria-label={mobile ? "Close menu" : "Open menu"}
          aria-expanded={mobile}
          onClick={() => {
            setMobile(!mobile);
            setOpen(null);
          }}
        >
          <Icon name={mobile ? "close" : "menu"} />
        </button>
      </div>
    </header>
  );
}
const groups = [
  {
    name: "Product",
    links: [
      ["Overview", "/product"],
      ["Solutions", "/solutions"],
      ["Request a demo", "/request-demo"],
      ["Scope a pilot", "/pilot"],
    ],
  },
  {
    name: "Explore",
    links: [
      ["Resources", "/resources"],
      ["Trust & scope", "/trust"],
      ["Questions", "/#questions"],
    ],
  },
  {
    name: "Company",
    links: [
      ["Our approach", "/about"],
      ["Contact", "/contact"],
      ["Sign in", "/sign-in"],
    ],
  },
];
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-intro">
            <img
              src="/assets/logos/mark-primary.svg"
              alt=""
              width="44"
              height="58"
            />
            <h3>
              A clearer boundary.
              <br />
              Brighter possibilities.
            </h3>
            <p>Clarity at the point of action.</p>
            <address className="company-address">
              364 Cong Hoa Street, Ward 13, Tan Binh District<br />
              Ho Chi Minh City, 790329<br />
              Vietnam
            </address>
            <div className="socials">
              {["linkedin", "x", "github", "youtube"].map((name) => (
                <button
                  disabled
                  key={name}
                  aria-label={`${name === "x" ? "X" : name.charAt(0).toUpperCase() + name.slice(1)} — account coming soon`}
                  title="Social account coming soon"
                >
                  <img
                    src={`/assets/icons/social-${name}.svg`}
                    width="18"
                    height="18"
                    alt=""
                  />
                </button>
              ))}
            </div>
            <small>Social channels coming soon.</small>
          </div>
          {groups.map((group) => (
            <div className="footer-group" key={group.name}>
              <h4>{group.name}</h4>
              {group.links.map(([label, href]) => (
                <Link key={label} href={href}>
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-wordmark">
          <img
            src="/assets/logos/wordmark.svg"
            alt="CallTether"
            width="590"
            height="104"
          />
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} CallTether</span>
          <span className="footer-note">
            Concept preview · Illustrative product data
          </span>
          <div>
            <Link href="/legal/privacy">Privacy</Link>
            <Link href="/legal/terms">Terms</Link>
            <a href="#top" aria-label="Back to top">
              <Icon name="arrow-up-right" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
