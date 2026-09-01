import { describe, it, expect } from "bun:test";
import { execSync } from "node:child_process";
import { existsSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dir, "../..");

describe("Multi-Harness Adapter Rendering", () => {
  it("should render opencode adapter for core and all packs", () => {
    const distOpencode = join(root, "dist/opencode");
    rmSync(distOpencode, { recursive: true, force: true });

    execSync("node adapters/opencode/render.mjs --all", { cwd: root, stdio: "pipe" });
    expect(existsSync(distOpencode)).toBe(true);

    const files = readdirSync(distOpencode).filter((f) => f.endsWith(".md"));
    expect(files).toContain("secretary.md");
    expect(files).toContain("chief-of-staff.md");
    expect(files).toContain("fact-checker.md");
    expect(files).toContain("builder.md");
    expect(files).toContain("judge.md");
  });

  it("should render codex adapter for all agents", () => {
    const distCodex = join(root, "dist/codex");
    rmSync(distCodex, { recursive: true, force: true });

    execSync("node adapters/codex/render.mjs --all", { cwd: root, stdio: "pipe" });
    expect(existsSync(distCodex)).toBe(true);

    const files = readdirSync(distCodex).filter((f) => f.endsWith(".toml"));
    expect(files).toContain("secretary.toml");
    expect(files).toContain("builder.toml");
  });

  it("should render claude-code adapter for all agents", () => {
    const distClaude = join(root, "dist/claude-code");
    rmSync(distClaude, { recursive: true, force: true });

    execSync("node adapters/claude-code/render.mjs --all", { cwd: root, stdio: "pipe" });
    expect(existsSync(distClaude)).toBe(true);

    const files = readdirSync(distClaude).filter((f) => f.endsWith(".md"));
    expect(files).toContain("secretary.md");
    expect(files).toContain("builder.md");
  });
});
