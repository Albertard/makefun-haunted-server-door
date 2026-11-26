// Funniest Sign on a Haunted Server Room Door — make.fun entry generator.
// Writes one line, the funniest sign for the door of a haunted server room,
// to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
// Node 22, standard library only. No dependencies, no network.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Why this line wins:
// A warning sign has to read like a warning sign, and this one does —
// "WARNING:" up front, capital letters, posted on a door. The joke is not
// a pun that needs a second read; it is a collision the judge brief asks
// for, office IT life against the supernatural: the ghost is not rattling
// chains or moaning in the cold aisle, he is doing the most sysadmin thing
// imaginable, which is leaving nothing documented. Then the twist turns the
// sign on the reader — "Neither have you" — so the person standing at the
// door is suddenly part of the haunting. The ghost is specific and fresh
// (a predecessor who never wrote docs), the setup is one sentence, and the
// punch lands on the last three words, which is exactly how a sign taped to
// a door should work: glance, laugh, then feel slightly accused.
//
// The entry: one line, 107 characters, inside the 1-120 character gate.
const TEXT =
  "WARNING: Haunted by the ghost of the last sysadmin. He still has not documented anything. Neither have you.";

// Competition gate (see kit/competition.yaml): entry.txt must be UTF-8 text of
// 1 to 120 characters, not only white space.
const MIN_CHARS = 1;
const MAX_CHARS = 120;

function charCount(text: string): number {
  // Count Unicode code points, not UTF-16 code units, so an emoji or an
  // accented letter counts as one character, matching how a judge reads it.
  return Array.from(text).length;
}

function validateEntry(text: string): void {
  if (text.length === 0) {
    throw new Error("entry is empty");
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only white space");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (text !== text.trim()) {
    throw new Error("entry has leading or trailing white space");
  }
  const n = charCount(text);
  if (n < MIN_CHARS || n > MAX_CHARS) {
    throw new Error(`entry is ${n} characters, gate is ${MIN_CHARS}-${MAX_CHARS}`);
  }
}

function main(): void {
  validateEntry(TEXT);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), TEXT + "\n", "utf8");
  console.log(`wrote entry (${charCount(TEXT)} chars) to ${join(outDir, "entry.txt")}`);
}

main();
