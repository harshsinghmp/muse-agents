#!/usr/bin/env bun
/**
 * Dynamic LLM Documentation Generator
 * Generates llms.txt (index) and llms-full.txt (complete bundle) from docs/ and project state.
 */

import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, join, basename } from "node:path";

const rootDir = resolve(process.cwd());
const docsDir = join(rootDir, "docs");
const projectName = basename(rootDir);

console.log("📄 Generating llms.txt & llms-full.txt for " + projectName);

let overview = "";
let architecture = "";
if (existsSync(join(docsDir, "01_OVERVIEW.md"))) {
  overview = readFileSync(join(docsDir, "01_OVERVIEW.md"), "utf8");
}
if (existsSync(join(docsDir, "02_ARCHITECTURE.md"))) {
  architecture = readFileSync(join(docsDir, "02_ARCHITECTURE.md"), "utf8");
}

// 1. Generate llms.txt
const llmsTxt = `# ${projectName}

> Project Documentation & AI Operational Index
> Generated on: ${new Date().toISOString()}

## Overview
${overview.slice(0, 500)}...

## Canonical Documents
- [01_OVERVIEW.md](docs/01_OVERVIEW.md): Scope, goals, and stakeholders
- [02_ARCHITECTURE.md](docs/02_ARCHITECTURE.md): Stack, topology, and layout
- [03_ESCALATION_RULES.md](docs/03_ESCALATION_RULES.md): Anti-overengineering hierarchy
- [04_DESIGN_SYSTEM.md](docs/04_DESIGN_SYSTEM.md): Visual design and tokens
- [05_DECISION_LOG.md](docs/05_DECISION_LOG.md): Architectural Decision Records
- [06_ENVIRONMENTS.md](docs/06_ENVIRONMENTS.md): Environment configs & secrets
- [07_RUNTIME_STATE.md](docs/07_RUNTIME_STATE.md): Verified package & runtime state
- [08_WORKSTREAMS.md](docs/08_WORKSTREAMS.md): Agency council division mapping
- [09_HARNESS_PROBES.md](docs/09_HARNESS_PROBES.md): Test criteria and DOM probes
- [10_UNRESOLVED.md](docs/10_UNRESOLVED.md): Open questions and parking lot

## Reality State
- [STATE.md](STATE.md): 8-Stage Reality Machine status
- [SUMMARY.md](SUMMARY.md): Change history and commit ledger
`;

writeFileSync(join(rootDir, "llms.txt"), llmsTxt.trim() + "\n", "utf8");
console.log("  ✅ Generated llms.txt");

// 2. Generate llms-full.txt
let fullContent = `# ${projectName} - Full Canonical Knowledge Base\n\nGenerated on: ${new Date().toISOString()}\n\n`;

if (existsSync(docsDir)) {
  const docFiles = readdirSync(docsDir).filter(f => f.endsWith(".md")).sort();
  for (const file of docFiles) {
    fullContent += `\n=======================================================\n`;
    fullContent += `FILE: docs/${file}\n`;
    fullContent += `=======================================================\n\n`;
    fullContent += readFileSync(join(docsDir, file), "utf8") + "\n";
  }
}

if (existsSync(join(rootDir, "STATE.md"))) {
  fullContent += `\n=======================================================\nFILE: STATE.md\n=======================================================\n\n`;
  fullContent += readFileSync(join(rootDir, "STATE.md"), "utf8") + "\n";
}

writeFileSync(join(rootDir, "llms-full.txt"), fullContent.trim() + "\n", "utf8");
console.log("  ✅ Generated llms-full.txt");
