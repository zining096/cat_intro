import Image from "next/image";
import Parallax from "./components/Parallax";
import HeroCollage from "./components/HeroCollage";
import WelcomeBanner from "./components/WelcomeBanner";

const catSpots = [
  {
    no: "01",
    title: "猴硐貓村",
    desc: "新北瑞芳的老礦業小鎮，滿街都是慵懶曬太陽的貓咪，曾被國際媒體評選為全球六大賞貓景點之一。",
    img: "/images/houtong-02.jpg",
  },
  {
    no: "02",
    title: "橘貓天團",
    desc: "台灣街頭最常見的橘貓，圓滾滾又貪吃，被戲稱為「十橘九胖」，個性親人又愛撒嬌。",
    img: "/images/orange-cat-02.jpg",
  },
  {
    no: "03",
    title: "校園貓明星",
    desc: "許多大學都有自己的招牌校貓，像台大、清大的貓咪都擁有專屬粉絲團，深受學生喜愛。",
    img: "/images/campus-cat-01.jpg",
  },
  {
    no: "04",
    title: "貓咪咖啡廳",
    desc: "全台各地的貓咪咖啡廳，一邊喝咖啡一邊擼貓，是都市人療癒身心的最佳去處，一起來享受吧。",
    img: "/images/S__95330316.jpg",
  },
  {
    no: "05",
    title: "米克斯貓咪",
    desc: "台灣米克斯（混種貓）花色多變、聰明機靈，是最多台灣家庭選擇領養的貓咪品種。",
    img: null,
  },
  {
    no: "06",
    title: "巷弄街貓",
    desc: "走進台灣的老街小巷，總能遇到悠閒散步的街貓，是城市裡最療癒的日常風景。",
    img: "/images/alley-cat-02.jpg",
  },
];

const funFacts = [
  {
    n: "6x",
    text: "猴硐貓村曾被美國媒體評選為全球六大賞貓景點之一",
  },
  {
    n: "TNR",
    text: "許多動保團體推動誘捕、絕育、放回計畫，照顧街貓生態",
  },
  {
    n: "24/7",
    text: "廟口、夜市、老街，隨時都能遇見悠哉散步的貓咪居民",
  },
  {
    n: "No.1",
    text: "台灣長年被國際旅遊媒體喻為亞洲最友善貓咪的「貓島」",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-cream">
      {/* Hero */}
      <section className="mx-auto grid w-full max-w-5xl gap-12 px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
        <Parallax speed={0.05}>
          <WelcomeBanner />
          <p className="text-sm font-semibold tracking-[0.3em] text-clay">
            台灣・貓島
          </p>
          <h1 className="mt-5 font-serif text-4xl font-bold leading-[1.15] text-ink sm:text-5xl">
            在轉角，
            <br />
            遇見慢下來的貓
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
            從九份山城到猴硐礦坑，從校園一角到巷口騎樓，台灣的貓咪用自己的步調，
            陪這座島嶼過日子。這裡收錄了牠們最常出現的六種身影。
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#spots"
              className="rounded-full bg-clay px-6 py-3 text-sm font-medium text-cream shadow-sm transition-colors hover:bg-clay-dark"
            >
              看看貓咪面貌
            </a>
            <a
              href="#facts"
              className="text-sm font-medium text-ink-soft underline decoration-sand decoration-2 underline-offset-4 transition-colors hover:text-clay"
            >
              貓島小知識
            </a>
          </div>
        </Parallax>

        <HeroCollage />
      </section>

      {/* Cat spots — editorial list */}
      <section id="spots" className="border-t border-sand/60 bg-cream-dim/60">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold tracking-[0.3em] text-clay">
            貓咪面貌
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-ink sm:text-4xl">
            六種你會遇見的台灣貓
          </h2>

          <div className="mt-12 divide-y divide-sand/60">
            {catSpots.map((spot) => (
              <div
                key={spot.no}
                className="flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:gap-6 sm:py-8"
              >
                <span className="font-serif text-3xl font-semibold text-sand sm:w-10 sm:shrink-0 sm:text-4xl">
                  {spot.no}
                </span>
                <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl border border-sand/50 sm:h-24 sm:w-32">
                  {spot.img ? (
                    <Image
                      src={spot.img}
                      alt={spot.title}
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-cream-dim text-2xl text-sand">
                      🐾
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-ink">
                    {spot.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft sm:text-base">
                    {spot.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote band */}
      <section className="overflow-hidden bg-ink">
        <Parallax speed={0.12} className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <p className="font-serif text-2xl italic leading-relaxed text-cream sm:text-3xl">
            「台灣是全世界公認最友善貓咪的島嶼之一，
            <br className="hidden sm:block" />
            走在路上，總有一隻貓和你對看一眼。」
          </p>
          <p className="mt-6 text-sm tracking-[0.2em] text-cream/50">
            — 旅人的台灣觀察筆記
          </p>
        </Parallax>
      </section>

      {/* Fun facts */}
      <section id="facts" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <p className="text-sm font-semibold tracking-[0.3em] text-clay">
          貓島小知識
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold text-ink sm:text-4xl">
          關於台灣貓咪的幾件事
        </h2>

        <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {funFacts.map((fact) => (
            <div key={fact.n} className="flex items-baseline gap-5">
              <span className="font-serif text-2xl font-bold text-clay">
                {fact.n}
              </span>
              <p className="text-sm leading-relaxed text-ink-soft sm:text-base">
                {fact.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
