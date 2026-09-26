import type { Metadata } from "next";
import GameBoard from "./GameBoard";

export const metadata: Metadata = {
  title: "貓咪反應力小遊戲｜台灣貓咪日記",
  description: "牠通常很淡定，但偶爾會突然張嘴警戒——那一瞬間千萬別點下去！",
};

export default function GamePage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <p className="text-center text-sm font-semibold tracking-[0.3em] text-clay">
        小遊戲
      </p>
      <h1 className="mt-3 text-center font-serif text-3xl font-bold text-ink sm:text-4xl">
        貓咪反應力測試
      </h1>
      <p className="mx-auto mt-4 max-w-md text-center text-sm leading-relaxed text-ink-soft sm:text-base">
        牠大部分時間都很淡定，但每隔幾秒會突然張嘴警戒。
        趁牠淡定時盡量點擊得分，張嘴的瞬間點下去就遊戲失敗！
      </p>

      <div className="mt-12">
        <GameBoard />
      </div>
    </div>
  );
}
