"use client";

import { useUser } from "./UserProvider";

export default function WelcomeBanner() {
  const { name } = useUser();

  if (!name) return null;

  return (
    <p className="mb-3 inline-block rounded-full bg-clay/10 px-4 py-1.5 text-sm font-medium text-clay">
      歡迎回來，{name}！🐾
    </p>
  );
}
