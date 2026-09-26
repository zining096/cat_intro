"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function Parallax({
  children,
  speed = 0.15,
  className = "",
}: {
  children?: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight || 1;
      const centerOffset = rect.top + rect.height / 2 - viewportH / 2;
      const progress = centerOffset / viewportH;
      el.style.transform = `translate3d(0, ${(progress * speed * 100).toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
