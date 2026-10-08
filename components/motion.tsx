"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
gsap.registerPlugin(ScrollTrigger);
export function MotionProvider() {
  const pathname = usePathname();
  useEffect(() => {
    const media = gsap.matchMedia();
    let lenis: Lenis | undefined;
    media.add("(prefers-reduced-motion: no-preference)", () => {
      lenis = new Lenis({ duration: 1.05, smoothWheel: true, anchors: { offset: -100 } });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) =>
        gsap.from(el, { autoAlpha: 0, y: 24, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true } }),
      );
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) =>
        gsap.to(el, { yPercent: -7, ease: "none",
          scrollTrigger: { trigger: el.closest("section") || el, start: "top top", end: "bottom top", scrub: 1 } }),
      );
      return () => { gsap.ticker.remove(tick); lenis?.destroy(); };
    });
    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);
    const timer = window.setTimeout(refresh, 500);
    return () => { clearTimeout(timer); window.removeEventListener("load", refresh); media.revert(); };
  }, [pathname]);
  return null;
}
