"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Horizontal "chapters" rail on large screens (wheel → sideways, drag to scroll,
 * keyboard arrows), plain vertical stack on small screens.
 */
export function NeonRail({ children, label }: { children: React.ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(min-width: 1024px)");

    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? Math.round((el.scrollLeft / max) * 100) : 0);
    };
    const onWheel = (e: WheelEvent) => {
      if (!mq.matches || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault();
      el.scrollBy({ left: e.deltaY, behavior: "auto" });
    };

    // Drag to scroll (mouse only; touch already scrolls natively).
    let down = false;
    let startX = 0;
    let startLeft = 0;
    const onDown = (e: PointerEvent) => {
      if (!mq.matches || e.pointerType !== "mouse" || (e.target as HTMLElement).closest("a,button")) return;
      down = true;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      el.dataset.dragging = "true";
    };
    const onMove = (e: PointerEvent) => {
      if (down) el.scrollLeft = startLeft - (e.clientX - startX);
    };
    const onUp = () => {
      down = false;
      delete el.dataset.dragging;
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  // In-page anchors (#chapter-03) scroll the rail sideways on desktop.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a || !window.matchMedia("(min-width: 1024px)").matches) return;
      const target = document.getElementById(a.hash.slice(1));
      if (!target || !el.contains(target)) return;
      e.preventDefault();
      el.scrollTo({ left: target.offsetLeft, behavior: reduce ? "auto" : "smooth" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [reduce]);

  return (
    <>
      <div
        ref={ref}
        tabIndex={0}
        role="region"
        aria-label={label}
        className="focus-visible:outline-none lg:flex lg:h-[calc(100dvh-3.5rem)] lg:overflow-x-auto lg:overflow-y-hidden lg:[scrollbar-width:none] lg:data-[dragging=true]:cursor-grabbing lg:data-[dragging=true]:select-none"
      >
        {children}
      </div>
      {/* Scroll progress */}
      <div aria-hidden className="pointer-events-none fixed inset-x-0 bottom-0 z-40 hidden h-1 bg-white/10 lg:block">
        <div className="h-full bg-[#B8FF2C] transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>
      <p aria-hidden className="fixed bottom-4 right-5 z-40 hidden font-[family-name:var(--font-archivo-wide)] text-[11px] uppercase tracking-wider text-white/70 mix-blend-difference lg:block">
        Scroll {progress}%
      </p>
    </>
  );
}

/** Small lime dot that trails the pointer (fine pointers only, off with reduced motion). */
export function CursorDot() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const dot = ref.current;
    if (!dot) return;
    let x = 0, y = 0, cx = 0, cy = 0, raf = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.opacity = "1";
    };
    const tick = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      dot.style.transform = `translate3d(${cx - 20}px, ${cy - 20}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", move);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[80] size-10 rounded-full bg-[#B8FF2C] opacity-0 mix-blend-difference"
    />
  );
}
