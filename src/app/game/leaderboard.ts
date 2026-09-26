export interface ScoreEntry {
  name: string;
  score: number;
  date: string;
}

const MAX_ENTRIES = 10;

export function addScore(
  entries: ScoreEntry[],
  name: string,
  score: number,
): ScoreEntry[] {
  const next = [...entries, { name, score, date: new Date().toISOString() }];
  next.sort((a, b) => b.score - a.score);
  return next.slice(0, MAX_ENTRIES);
}
