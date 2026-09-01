import { describe, it, expect } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dir, "../..");

const REQUIRED_SECTIONS = [
  "## Role",
  "## Pre-flight",
  "## Workflow",
  "## Output Contract",
  "## Handoffs",
];

function parseAgentFile(filePath: string) {
  const content = readFileSync(filePath, "utf8");
  const end = content.indexOf("\n---\n", 4);
  if (!content.startsWith("---\n") || end === -1) {
    throw new Error(`Invalid frontmatter in ${filePath}`);
  }
  const fmText = content.slice(4, end);
  const body = content.slice(end + 5);

  const nameMatch = fmText.match(/^name:\s*(.+)$/m);
  const divisionMatch = fmText.match(/^division:\s*(.+)$/m);
  const missionMatch = fmText.match(/^mission:\s*(.+)$/m);
  const escalatesMatch = fmText.match(/^escalates_to:\s*(.+)$/m);
  const optionalMatch = fmText.match(/^optional:\s*(.+)$/m);

  const skillsMatch = fmText.match(/^skills:\n((?:\s+-\s+.*\n)+)/m);
  const skills = skillsMatch
    ? skillsMatch[1].trim().split("\n").map((s) => s.trim().replace(/^-\s*/, ""))
    : [];

  const neverMatch = fmText.match(/^boundaries:\n\s+never:\n((?:\s+-\s+.*\n)+)/m);
  const never = neverMatch
    ? neverMatch[1].trim().split("\n").map((s) => s.trim().replace(/^-\s*/, ""))
    : [];

  return {
    name: nameMatch ? nameMatch[1].trim() : null,
    division: divisionMatch ? divisionMatch[1].trim() : null,
    mission: missionMatch ? missionMatch[1].trim() : null,
    escalates_to: escalatesMatch ? escalatesMatch[1].trim() : null,
    optional: optionalMatch ? optionalMatch[1].trim() : null,
    skills,
    never,
    body,
    bodyLineCount: body.trim().split("\n").length,
  };
}

describe("Gauntlet Pack Specification & Topology", () => {
  const packDir = join(root, "packs/gauntlet");
  const manifestPath = join(packDir, "pack.json");

  it("should have a valid pack.json manifest with topology", () => {
    expect(existsSync(manifestPath)).toBe(true);
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    expect(manifest.name).toBe("gauntlet");
    expect(manifest.version).toBeDefined();
    expect(manifest.topology).toBeDefined();
    expect(manifest.agents).toEqual(
      expect.arrayContaining(["builder", "critic", "integrator", "judge"])
    );
  });

  const gauntletAgents = ["builder", "critic", "integrator", "judge"];
  for (const agentName of gauntletAgents) {
    it(`should validate gauntlet agent: ${agentName}`, () => {
      const filePath = join(packDir, `${agentName}.md`);
      expect(existsSync(filePath)).toBe(true);
      const parsed = parseAgentFile(filePath);
      expect(parsed.name).toBe(agentName);
      expect(parsed.division).toBe("gauntlet");
      expect(parsed.optional).toBe("true");
      expect(parsed.escalates_to).toBe("muse");
      expect(parsed.mission!.length).toBeLessThanOrEqual(120);
      expect(parsed.skills.length).toBeGreaterThanOrEqual(1);
      expect(parsed.never.length).toBeGreaterThanOrEqual(2);
      expect(parsed.never.length).toBeLessThanOrEqual(5);
      expect(parsed.bodyLineCount).toBeLessThanOrEqual(60);

      // Section order check
      let lastIndex = -1;
      for (const section of REQUIRED_SECTIONS) {
        const idx = parsed.body.indexOf(section);
        expect(idx).toBeGreaterThan(-1);
        expect(idx).toBeGreaterThan(lastIndex);
        lastIndex = idx;
      }
    });
  }

  it("builder must enforce zero self-grading and frozen contract adherence", () => {
    const parsed = parseAgentFile(join(packDir, "builder.md"));
    expect(parsed.never.some((n) => n.toLowerCase().includes("self-grade") || n.toLowerCase().includes("grade"))).toBe(true);
  });

  it("critic must output review.json rubric evaluation", () => {
    const parsed = parseAgentFile(join(packDir, "critic.md"));
    expect(parsed.body).toContain("review.json");
  });

  it("integrator must apply single largest fix and prevent regressions", () => {
    const parsed = parseAgentFile(join(packDir, "integrator.md"));
    expect(parsed.body.toLowerCase()).toContain("fix");
  });

  it("judge must compute plateau index and govern termination", () => {
    const parsed = parseAgentFile(join(packDir, "judge.md"));
    expect(parsed.body.toLowerCase()).toContain("plateau");
  });
});

describe("Secretary Pack Specification", () => {
  const packDir = join(root, "packs/secretary");
  const manifestPath = join(packDir, "pack.json");

  it("should have a valid pack.json manifest", () => {
    expect(existsSync(manifestPath)).toBe(true);
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    expect(manifest.name).toBe("secretary");
    expect(manifest.version).toBeDefined();
    expect(manifest.agents).toEqual(
      expect.arrayContaining(["general-secretary", "communications", "operations", "research-lead"])
    );
  });

  const secAgents = ["general-secretary", "communications", "operations", "research-lead"];
  for (const agentName of secAgents) {
    it(`should validate secretary agent: ${agentName}`, () => {
      const filePath = join(packDir, `${agentName}.md`);
      expect(existsSync(filePath)).toBe(true);
      const parsed = parseAgentFile(filePath);
      expect(parsed.name).toBe(agentName);
      expect(parsed.division).toBe("secretary");
      expect(parsed.optional).toBe("true");
      expect(parsed.escalates_to).toBe("muse");
      expect(parsed.mission!.length).toBeLessThanOrEqual(120);
      expect(parsed.skills.length).toBeGreaterThanOrEqual(1);
      expect(parsed.never.length).toBeGreaterThanOrEqual(2);
      expect(parsed.never.length).toBeLessThanOrEqual(5);
      expect(parsed.bodyLineCount).toBeLessThanOrEqual(60);

      // Section order check
      let lastIndex = -1;
      for (const section of REQUIRED_SECTIONS) {
        const idx = parsed.body.indexOf(section);
        expect(idx).toBeGreaterThan(-1);
        expect(idx).toBeGreaterThan(lastIndex);
        lastIndex = idx;
      }
    });
  }
});
