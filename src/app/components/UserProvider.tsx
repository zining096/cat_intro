"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

const STORAGE_KEY = "cat-diary:username";

interface UserContextValue {
  name: string | null;
  setName: (name: string) => void;
}

const UserContext = createContext<UserContextValue | null>(null);

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used within UserProvider");
  }
  return ctx;
}

export default function UserProvider({ children }: { children: ReactNode }) {
  const [name, setNameState] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setNameState(stored);
    } catch {
      // localStorage unavailable — fall back to prompting each visit
    }
    setReady(true);
  }, []);

  const setName = useCallback((value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setNameState(trimmed);
    try {
      window.localStorage.setItem(STORAGE_KEY, trimmed);
    } catch {
      // ignore write failures (e.g. private browsing)
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setName(draft);
  };

  return (
    <UserContext.Provider value={{ name, setName }}>
      {children}

      {ready && !name && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 px-4 backdrop-blur-sm">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm rounded-3xl border border-sand bg-cream p-8 text-center shadow-2xl"
          >
            <p className="text-4xl">🐾</p>
            <h2 className="mt-3 font-serif text-xl font-bold text-ink">
              歡迎來到台灣貓咪日記
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              先告訴我們怎麼稱呼你吧！
            </p>
            <input
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              maxLength={12}
              placeholder="輸入你的稱呼"
              className="mt-5 w-full rounded-full border border-sand bg-white px-5 py-3 text-center text-sm text-ink outline-none focus:border-clay"
            />
            <button
              type="submit"
              disabled={!draft.trim()}
              className="mt-4 w-full rounded-full bg-clay px-6 py-3 text-sm font-medium text-cream shadow-sm transition-colors hover:bg-clay-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              進入網站
            </button>
          </form>
        </div>
      )}
    </UserContext.Provider>
  );
}
