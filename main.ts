import { mkdirSync, writeFileSync } from "node:fs";

// One line of patch notes announcing that human sleep is fixed.
// The program is deterministic: it always writes this exact text.
const ENTRY =
  "Fixed a bug where humans woke up tired; sleep now actually saves progress.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 160 characters,
// a single line, not only white space. The entry is a real changelog line:
// "Fixed a bug where ..." names the bug, the clause after the semicolon
// is the fix itself. Refuse to write anything that fails the gate.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
if (
  ENTRY.length < 1 ||
  ENTRY.length > 160 ||
  ENTRY.includes("\n") ||
  !ENTRY.trim()
) {
  throw new Error(`entry fails the gate: ${ENTRY.length} characters`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, ENTRY, "utf8");
console.log(`wrote entry.txt (${ENTRY.length} chars)`);
