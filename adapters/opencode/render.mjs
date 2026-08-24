#!/usr/bin/env node
// Renders canonical muse-agents definitions into OpenCode subagent files.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';

const root = join(dirname(new URL(import.meta.url).pathname), '..', '..');
const outDir = join(root, 'dist', 'opencode');

function listAgents(dir) {
  try {
    return readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => join(dir, f));
  } catch {
    return [];
  }
}

let scope = process.argv[2] ?? '--core';
let packs = [];
if (scope === '--packs') {
  packs = (process.argv[3] ?? '').split(',').filter(Boolean);
}

const files = new Set();
for (const d of readdirSync(join(root, 'agents')))
  for (const f of listAgents(join(root, 'agents', d))) files.add(f);
if (scope === '--all') {
  for (const p of readdirSync(join(root, 'packs')))
    for (const f of listAgents(join(root, 'packs', p))) files.add(f);
} else if (scope === '--packs') {
  for (const p of packs)
    for (const f of listAgents(join(root, 'packs', p))) files.add(f);
}

if (files.size === 0) {
  console.error('nothing to render — check scope flags');
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
for (const f of files) {
  const raw = readFileSync(f, 'utf8');
  const end = raw.indexOf('\n---\n', 4);
  if (!raw.startsWith('---\n') || end === -1) {
    console.error(`skip ${f}: no frontmatter`);
    continue;
  }
  const fm = raw.slice(4, end);
  const body = raw.slice(end + 5);
  const name = fm.match(/^name: *(.+)$/m)?.[1];
  const mission = fm.match(/^mission: *(.+)$/m)?.[1] ?? '';
  if (!name) {
    console.error(`skip ${f}: no name`);
    continue;
  }
  const out = `---\nname: ${name}\ndescription: ${mission}\nmode: subagent\n---\n\n${body}`;
  writeFileSync(join(outDir, `${basename(f)}`), out);
}
console.log(`rendered ${files.size} agents -> ${outDir}`);
