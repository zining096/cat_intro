"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { useUser } from "../components/UserProvider";
import { addScore, type ScoreEntry } from "./leaderboard";

type Status = "idle" | "playing" | "over";

interface Particle {
  id: number;
  x: number;
}

const SAFE_IMG = "/images/S__95166647_0.jpg";
const DANGER_IMG = "/images/S__95166646_0.jpg";

export default function GameBoard() {
  const { name } = useUser();
  const playerName = name ?? "訪客";

  const [status, setStatus] = useState<Status>("idle");
  const [danger, setDanger] = useState(false);
  const [score, setScore] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [leaderboard, setLeaderboard] = useState<ScoreEntry[]>([]);

  const personalBest = leaderboard.reduce(
    (max, entry) => (entry.name === playerName ? Math.max(max, entry.score) : max),
    0,
  );

  const roundRef = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const particleId = useRef(0);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const scheduleCycle = useCallback(
    (round: number) => {
      const showDelay = 2500 + Math.random() * 4500;
      const t1 = setTimeout(() => {
        if (roundRef.current !== round) return;
        setDanger(true);
        const hideDelay = 500 + Math.random() * 400;
        const t2 = setTimeout(() => {
          if (roundRef.current !== round) return;
          setDanger(false);
          scheduleCycle(round);
        }, hideDelay);
        timers.current.push(t2);
      }, showDelay);
      timers.current.push(t1);
    },
    [],
  );

  useEffect(() => clearTimers, [clearTimers]);

  const start = () => {
    clearTimers();
    roundRef.current += 1;
    setScore(0);
    setDanger(false);
    setParticles([]);
    setStatus("playing");
    scheduleCycle(roundRef.current);
  };

  const handlePhotoClick = () => {
    if (status !== "playing") return;

    if (danger) {
      clearTimers();
      setStatus("over");
      setLeaderboard((prev) => addScore(prev, playerName, score));
      return;
    }

    setScore((s) => s + 1);
    const id = particleId.current++;
    const x = Math.round(Math.random() * 48 - 24);
    setParticles((p) => [...p, { id, x }]);
    const t = setTimeout(() => {
      setParticles((p) => p.filter((particle) => particle.id !== id));
    }, 900);
    timers.current.push(t);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_18rem] lg:items-start">
      <div
        className={`relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-sand shadow-xl ${
          status === "over" ? "animate-shake" : ""
        }`}
      >
        <button
          type="button"
          onClick={handlePhotoClick}
          disabled={status !== "playing"}
          aria-label={
            status === "playing"
              ? danger
                ? "危險！牠正張嘴警戒"
                : "貓咪很淡定，點擊得分"
              : "貓咪照片"
          }
          className="absolute inset-0 block h-full w-full cursor-pointer active:scale-[0.98] disabled:cursor-default"
        >
          <Image
            src={SAFE_IMG}
            alt="淡定的貓咪"
            fill
            priority
            sizes="(min-width: 1024px) 480px, 90vw"
            className={`object-cover transition-opacity duration-100 ${
              danger ? "opacity-0" : "opacity-100"
            }`}
          />
          <Image
            src={DANGER_IMG}
            alt="突然張嘴警戒的貓咪"
            fill
            priority
            sizes="(min-width: 1024px) 480px, 90vw"
            className={`object-cover transition-opacity duration-100 ${
              danger ? "opacity-100" : "opacity-0"
            }`}
          />
        </button>

        {status !== "playing" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-ink/55 px-6 text-center backdrop-blur-sm">
            {status === "idle" ? (
              <>
                <p className="font-serif text-2xl font-bold text-cream">
                  準備好了嗎？
                </p>
                <p className="max-w-xs text-sm leading-relaxed text-cream/80">
                  牠通常很淡定，但偶爾會突然張嘴警戒——
                  那一瞬間千萬別點下去！
                </p>
                <button
                  type="button"
                  onClick={start}
                  className="rounded-full bg-clay px-6 py-3 text-sm font-medium text-cream shadow-sm transition-colors hover:bg-clay-dark"
                >
                  開始遊戲
                </button>
              </>
            ) : (
              <>
                <p className="font-serif text-3xl font-bold text-cream">
                  遊戲失敗！
                </p>
                <p className="text-sm text-cream/80">
                  牠突然張嘴的瞬間被你點下去了
                </p>
                <p className="font-serif text-lg text-cream">
                  本次分數：{score}
                </p>
                <button
                  type="button"
                  onClick={start}
                  className="rounded-full bg-clay px-6 py-3 text-sm font-medium text-cream shadow-sm transition-colors hover:bg-clay-dark"
                >
                  再玩一次
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between rounded-3xl border border-sand/60 bg-cream-dim/60 p-6">
        <div>
          <p className="text-sm font-semibold tracking-[0.3em] text-clay">
            目前分數
          </p>
          <div className="relative mt-2 inline-block">
            <span
              key={score}
              className="animate-score-pop inline-block font-serif text-6xl font-bold text-ink"
            >
              {score}
            </span>
            {particles.map((p) => (
              <span
                key={p.id}
                style={{ "--float-x": `${p.x}px` } as CSSProperties}
                className="animate-float-up pointer-events-none absolute left-1/2 top-0 text-lg font-semibold text-clay"
              >
                +1
              </span>
            ))}
          </div>

          {personalBest > 0 && (
            <p className="mt-3 text-sm text-ink-soft">
              {playerName} 的最佳：{personalBest}
            </p>
          )}
        </div>

        <div className="mt-8 border-t border-sand/60 pt-6 text-sm leading-relaxed text-ink-soft">
          {status === "idle" && <p>點擊貓咪照片上的按鈕開始挑戰。</p>}
          {status === "playing" && (
            <p>
              牠很淡定，放心點擊得分——
              <br />
              但突然張嘴的瞬間千萬別手滑！
            </p>
          )}
          {status === "over" && <p>再試一次，看看能撐過幾次張嘴瞬間！</p>}
        </div>

        <div className="mt-8 border-t border-sand/60 pt-6">
          <p className="text-sm font-semibold tracking-[0.3em] text-clay">
            排行榜
          </p>
          {leaderboard.length === 0 ? (
            <p className="mt-3 text-sm text-ink-soft">
              還沒有紀錄，快來挑戰第一名！
            </p>
          ) : (
            <ol className="mt-3 space-y-1.5 text-sm">
              {leaderboard.map((entry, index) => {
                const isCurrentPlayer = entry.name === playerName;
                return (
                  <li
                    key={`${entry.date}-${index}`}
                    className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 ${
                      isCurrentPlayer
                        ? "bg-clay/10 font-medium text-clay"
                        : "text-ink-soft"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-4 text-xs text-ink-soft/70">
                        {index + 1}
                      </span>
                      <span className="truncate">{entry.name}</span>
                    </span>
                    <span className="font-serif font-semibold">
                      {entry.score}
                    </span>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}
