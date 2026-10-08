"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./ui";

const links = [["Product", "/product"], ["Solutions", "/solutions"], ["Resources", "/resources"], ["Company", "/about"]];

export function EntryVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const section = useRef<HTMLElement>(null);
  const drawer = useRef<HTMLDialogElement>(null);
  const [playing, setPlaying] = useState(false);
  const [menu, setMenu] = useState(false);
  const wanted = useRef(true);

  useEffect(() => {
    const player = video.current;
    if (!player) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    const sync = () => {
      if (visible && !document.hidden && wanted.current) player.play().catch(() => setPlaying(false));
      else player.pause();
    };
    const motion = () => { wanted.current = !preference.matches; sync(); };
    motion();
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    if (section.current) observer.observe(section.current);
    document.addEventListener("visibilitychange", sync);
    preference.addEventListener("change", motion);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); preference.removeEventListener("change", motion); player.pause(); };
  }, []);

  useEffect(() => {
    if (!menu) return;
    const prior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawer.current?.showModal();
    return () => { document.body.style.overflow = prior; drawer.current?.close(); };
  }, [menu]);

  function togglePlayback() {
    const player = video.current;
    if (!player) return;
    wanted.current = player.paused;
    if (wanted.current) player.play().catch(() => setPlaying(false));
    else player.pause();
  }

  return <section id="entry-video" className="entry-video" ref={section} aria-label="Welcome to CallTether">
    <video ref={video} className="entry-film" autoPlay loop muted playsInline preload="metadata"
      poster="/assets/video/boundary-garden-poster.jpg" aria-hidden="true"
      onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}>
      <source src="/assets/video/boundary-garden-entry.mp4" type="video/mp4" />
    </video>
    <div className="entry-layout">
      <nav className="entry-nav" aria-label="Introduction navigation">
        <Link href="/" aria-label="CallTether home" className="entry-brand"><img src="/assets/logos/lockup-primary.svg" alt="CallTether" width="180" height="40" /></Link>
        <div className="entry-nav-desktop">
          <div className="entry-nav-pill">{links.map(([label, href]) => <Link key={label} href={href}>{label}{label === "Solutions" && <Icon name="chevron-down" />}</Link>)}</div>
          <Link href="/sign-in" className="entry-signin">Sign in <Icon name="arrow-up-right" /></Link>
          <Link className="entry-cta" href="/request-demo">Request a demo <Icon name="arrow-right" /></Link>
        </div>
        <button className="entry-menu-toggle" aria-label="Open menu" aria-expanded={menu} aria-controls="entry-menu" onClick={() => setMenu(true)}><Icon name="menu" /></button>
      </nav>

      <div className="entry-content">
        <div className="entry-copy">
          <h1>Brighter possibilities.<br />A clearer boundary.</h1>
          <p>Bring clarity to every routed agent action.</p>
          <form className="entry-email" action="#demo-request" onSubmit={event => {
            event.preventDefault();
            const email = new FormData(event.currentTarget).get("email")?.toString() || "";
            const input = document.querySelector<HTMLInputElement>("#demo-request input[name=email]");
            if (input) { input.value = email; input.dispatchEvent(new Event("input", { bubbles: true })); }
            document.getElementById("demo-request")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
          }}>
            <label className="entry-sr-only" htmlFor="entry-email">Work email</label>
            <input id="entry-email" name="email" type="email" autoComplete="email" placeholder="Your work email" required />
            <button type="submit" className="entry-cta">Request a demo <Icon name="arrow-right" /></button>
          </form>
        </div>
        <div className="entry-cards">
          <div className="entry-glass entry-stat">
            <strong>3</strong>
            <p>Clear paths for every<br />routed decision.</p>
            <span>Allow · Deny · Approval</span>
          </div>
          <figure className="entry-glass entry-quote">
            <figcaption>Clarity at the point of action</figcaption>
            <blockquote>“I want to see the reason for a decision at the exact point an agent is about to act.”</blockquote>
            <div className="entry-person"><span aria-hidden="true">MC</span><div><strong>Maya Chen</strong><small>Security lead · Fictional persona</small></div></div>
          </figure>
        </div>
      </div>
      <div className="entry-bottom">
        <a href="#hero" className="entry-explore">Explore CallTether <Icon name="chevron-down" /></a>
        <button className="entry-playback" onClick={togglePlayback} aria-label={playing ? "Pause background video" : "Play background video"}>
          <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">{playing ? <path d="M6 4v12M14 4v12" stroke="currentColor" strokeWidth="2.5" /> : <path d="M6 3l10 7-10 7z" fill="currentColor" />}</svg>
          <span>{playing ? "Pause film" : "Play film"}</span>
        </button>
      </div>
    </div>
    <dialog ref={drawer} id="entry-menu" className="entry-drawer" onCancel={() => setMenu(false)} onClick={e => { if (e.target === e.currentTarget) setMenu(false); }}>
      <div className="entry-drawer-inner" data-lenis-prevent>
        <button className="entry-drawer-close" aria-label="Close menu" onClick={() => setMenu(false)}><Icon name="close" /></button>
        <nav aria-label="Mobile introduction navigation">{[...links, ["Sign in", "/sign-in"]].map(([label, href], index) => <Link style={{ animationDelay: `${(index + 1) * 60}ms` }} key={label} href={href} onClick={() => setMenu(false)}>{label}<Icon name="arrow-up-right" /></Link>)}</nav>
        <Link className="entry-cta" href="/request-demo" onClick={() => setMenu(false)}>Request a demo <Icon name="arrow-right" /></Link>
      </div>
    </dialog>
  </section>;
}
