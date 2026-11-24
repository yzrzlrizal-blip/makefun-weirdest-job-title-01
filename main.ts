/**
 * Weirdest Job Title: Blind Judge Showdown — make.fun entry.
 *
 * Writes one job title, 60 characters at most, to entry.txt inside the
 * output directory ($MAKEFUN_OUTPUT_DIR, default /output). The title is
 * fixed on purpose: the entry is judged on this exact text, so the program
 * is deterministic by design and every run writes the same bytes.
 *
 * The title: a real job (hired mourners are a genuine profession in many
 * cultures) with one gloriously specific twist — the mourning is for
 * strangers. It reads instantly, pictures a person doing it, and lands
 * its joke on the first read.
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TITLE = "Professional Mourner for Strangers' Funerals";

const MAX_CHARS = 60;

function main(): number {
  const title = TITLE.trim();

  if (title.length < 1 || title.length > MAX_CHARS) {
    console.error(
      `job title is ${title.length} characters; must be 1-${MAX_CHARS}`,
    );
    return 1;
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });

  const path = join(outDir, "entry.txt");
  // No trailing newline: the file holds exactly the title, nothing else.
  writeFileSync(path, title, { encoding: "utf-8" });

  // Verify what landed on disk is exactly the title we meant to write.
  const written = readFileSync(path, { encoding: "utf-8" });
  if (written !== title) {
    console.error("entry.txt on disk does not match the job title");
    return 1;
  }

  console.log(title);
  return 0;
}

process.exitCode = main();
