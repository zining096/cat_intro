"use client";

import { useState } from "react";
import Image from "next/image";
import Parallax from "./Parallax";

type CardKey = "houtong" | "orange" | "alley";

const cards: {
  key: CardKey;
  img: string;
  alt: string;
  title: string;
  subtitle: string;
  restSize: string;
  restTransform: string;
  restZ: number;
  parallaxSpeed: number;
}[] = [
  {
    key: "houtong",
    img: "/images/houtong-01.jpg",
    alt: "猴硐貓村的貓咪",
    title: "猴硐",
    subtitle: "Houtong Village",
    restSize: "h-48 w-36 sm:h-56 sm:w-44",
    restTransform: "-translate-x-[68%] -translate-y-1/2 -rotate-6",
    restZ: 10,
    parallaxSpeed: 0.16,
  },
  {
    key: "orange",
    img: "/images/orange-cat-01.jpg",
    alt: "路邊睡覺的橘貓",
    title: "橘貓天團",
    subtitle: "十橘九胖",
    restSize: "h-52 w-40 sm:h-60 sm:w-48",
    restTransform: "-translate-x-1/2 -translate-y-1/2 rotate-2",
    restZ: 20,
    parallaxSpeed: 0.1,
  },
  {
    key: "alley",
    img: "/images/alley-cat-01.jpg",
    alt: "巷弄街貓",
    title: "巷弄街貓",
    subtitle: "台灣日常",
    restSize: "h-48 w-36 sm:h-56 sm:w-44",
    restTransform: "-translate-x-[32%] -translate-y-1/2 rotate-12",
    restZ: 30,
    parallaxSpeed: 0.2,
  },
];

export default function HeroCollage() {
  const [active, setActive] = useState<CardKey | null>(null);

  return (
    <div className="relative mx-auto h-64 w-full max-w-sm sm:h-72 md:h-80">
      <Parallax
        speed={0.06}
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-clay/15 blur-3xl"
      />

      {cards.map((card) => {
        const isActive = active === card.key;
        const isDimmed = active !== null && !isActive;

        return (
          <button
            key={card.key}
            type="button"
            onClick={() => setActive(isActive ? null : card.key)}
            aria-pressed={isActive}
            aria-label={
              isActive
                ? `收合${card.title}照片`
                : `放大顯示${card.title}照片`
            }
            style={{ zIndex: isActive ? 40 : card.restZ }}
            className={[
              "absolute left-1/2 top-1/2 cursor-pointer overflow-hidden rounded-2xl border shadow-lg transition-all duration-500 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay",
              isActive
                ? "h-full w-[88%] max-w-xs -translate-x-1/2 -translate-y-1/2 rotate-0 border-clay shadow-2xl sm:max-w-sm"
                : `${card.restSize} ${card.restTransform} border-sand/70 ${
                    isDimmed ? "scale-90 opacity-60" : ""
                  }`,
            ].join(" ")}
          >
            <Parallax speed={card.parallaxSpeed} className="absolute inset-x-0 -inset-y-8">
              <Image
                src={card.img}
                alt={card.alt}
                fill
                priority
                sizes="(min-width: 640px) 320px, 220px"
                className="object-cover"
              />
            </Parallax>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-4 text-left">
              <p className="font-serif text-sm font-semibold text-cream">
                {card.title}
              </p>
              <p className="text-xs text-cream/70">{card.subtitle}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
