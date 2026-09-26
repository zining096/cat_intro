import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-sand/60 bg-ink text-cream/80">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-12 sm:grid-cols-3 sm:gap-10 sm:px-6 sm:py-14 lg:px-8">
        <div>
          <p className="font-serif text-lg font-bold text-cream">台灣貓咪日記</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/60">
            記錄台灣街頭巷尾、山城貓村裡，那些悠然自得的貓咪身影。
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-cream/40">
            瀏覽
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/#spots" className="transition-colors hover:text-cream">
                貓咪面貌
              </Link>
            </li>
            <li>
              <Link href="/#facts" className="transition-colors hover:text-cream">
                小知識
              </Link>
            </li>
            <li>
              <Link href="/game" className="transition-colors hover:text-cream">
                小遊戲
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-cream/40">
            關於
          </p>
          <p className="mt-3 text-sm leading-relaxed text-cream/60">
            台灣一直是全球愛貓人心中的「貓島」，
            友善對待街貓的文化廣受國際媒體報導。
          </p>
        </div>
      </div>
      <div className="border-t border-cream/10 px-4 py-5 text-center text-xs text-cream/40 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} 台灣貓咪日記．獻給每一隻街角的貓
      </div>
    </footer>
  );
}
