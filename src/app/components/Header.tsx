import Link from "next/link";

const navLinks = [
  { href: "/#spots", label: "貓咪面貌" },
  { href: "/#facts", label: "小知識" },
  { href: "/game", label: "小遊戲" },
];

function CatMark() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="h-6 w-6 shrink-0 text-clay sm:h-7 sm:w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 12 4 4l6 4.5" />
      <path d="M24 12 28 4l-6 4.5" />
      <path d="M8 12c0-3 3.6-5 8-5s8 2 8 5v7c0 4.5-3.8 8-8 8s-8-3.5-8-8v-7Z" />
      <path d="M13 18h.01M19 18h.01" strokeWidth="2.2" />
      <path d="M14.5 22c.6.6 2.4.6 3 0" />
    </svg>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-sand/60 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5">
          <CatMark />
          <span className="font-serif text-base font-bold tracking-tight text-ink sm:text-lg">
            台灣貓咪日記
          </span>
        </Link>
        <nav className="flex items-center gap-0.5 sm:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-2.5 py-1.5 text-sm text-ink-soft transition-colors hover:bg-cream-dim hover:text-ink sm:px-3.5 sm:py-2"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#spots"
            className="ml-2 hidden rounded-full bg-clay px-4 py-2 text-sm font-medium text-cream shadow-sm transition-colors hover:bg-clay-dark sm:inline-block"
          >
            開始探索
          </Link>
        </nav>
      </div>
    </header>
  );
}
