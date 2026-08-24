#!/usr/bin/env node
// Renders canonical muse-agents definitions into Codex TOML agents.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const outDir = join(root, 'dist', 'codex');

function listAgents(dir) {
  try {
    return readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => join(dir, f));
  } catch {
    return [];
  }
}

let scope = process.argv[2] ?? '--core';
const packs = scope === '--packs' ? (process.argv[3] ?? '').split(',').filter(Boolean) : [];

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

function tomlString(s) {
  return JSON.stringify(s); // JSON string escaping is valid TOML basic-string escaping
}

for (const f of files) {
  const raw = readFileSync(f, 'utf8');
  const end = raw.indexOf('\n---\n', 4);
  if (!raw.startsWith('---\n') || end === -1) {
    console.error(`skip ${f}: no frontmatter`);
    continue;
  }
  const fm = raw.slice(4, end);
  const body = raw.slice(end + 5).trim();
  const name = fm.match(/^name: *(.+)$/m)?.[1];
  const mission = fm.match(/^mission: *(.+)$/m)?.[1] ?? '';
  if (!name) {
    console.error(`skip ${f}: no name`);
    continue;
  }
  // Codex agent identity = mission + trigger words/body instructions
  const instructions = `${mission}\n\n${body}`;
  const toml = [
    `name = ${tomlString(name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()))}`,
    `description = ${tomlString(mission)}`,
    `developer_instructions = ${tomlString(instructions)}`,
    '',
  ].join('\n');
  writeFileSync(join(outDir, `${name}.toml`), toml);
}
console.log(`rendered ${files.size} agents -> ${outDir}`);
