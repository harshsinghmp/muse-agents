import { describe, it, expect } from "bun:test";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dir, "../..");
const agentsDir = join(root, "agents");

const REQUIRED_SECTIONS = [
  "## Role",
  "## Pre-flight",
  "## Workflow",
  "## Output Contract",
  "## Handoffs",
];

function parseAgentFile(filePath: string) {
  const content = readFileSync(filePath, "utf8");
  if (!content.startsWith("---\n")) {
    throw new Error(`File ${filePath} does not start with YAML frontmatter`);
  }
  const end = content.indexOf("\n---\n", 4);
  if (end === -1) {
    throw new Error(`File ${filePath} missing closing frontmatter delimiter`);
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
    ? skillsMatch[1]
        .trim()
        .split("\n")
        .map((s) => s.trim().replace(/^-\s*/, ""))
    : [];

  const neverMatch = fmText.match(/^boundaries:\n\s+never:\n((?:\s+-\s+.*\n)+)/m);
  const never = neverMatch
    ? neverMatch[1]
        .trim()
        .split("\n")
        .map((s) => s.trim().replace(/^-\s*/, ""))
    : [];

  const handoffsMatch = fmText.match(/^handoffs:\n((?:\s+-\s+.*\n)+)/m);
  const handoffs = handoffsMatch
    ? handoffsMatch[1]
        .trim()
        .split("\n")
        .map((s) => s.trim().replace(/^-\s*/, ""))
    : [];

  return {
    name: nameMatch ? nameMatch[1].trim() : null,
    division: divisionMatch ? divisionMatch[1].trim() : null,
    mission: missionMatch ? missionMatch[1].trim() : null,
    escalates_to: escalatesMatch ? escalatesMatch[1].trim() : null,
    optional: optionalMatch ? optionalMatch[1].trim() : null,
    skills,
    never,
    handoffs,
    body,
    bodyLineCount: body.trim().split("\n").length,
  };
}

describe("Core Agents Specification Compliance", () => {
  const newCoreAgents = [
    { file: "agents/ops/secretary.md", name: "secretary", division: "ops" },
    { file: "agents/ops/chief-of-staff.md", name: "chief-of-staff", division: "ops" },
    { file: "agents/research/fact-checker.md", name: "fact-checker", division: "research" },
    { file: "agents/dev/code-reviewer.md", name: "code-reviewer", division: "dev" },
  ];

  for (const agent of newCoreAgents) {
    it(`should have valid agent definition for ${agent.name}`, () => {
      const fullPath = join(root, agent.file);
      expect(existsSync(fullPath)).toBe(true);

      const parsed = parseAgentFile(fullPath);
      expect(parsed.name).toBe(agent.name);
      expect(parsed.division).toBe(agent.division);
      expect(parsed.optional).toBe("false");
      expect(parsed.escalates_to).toBe("muse");
      expect(parsed.mission).toBeTruthy();
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

  describe("Specific Invariant Verifications", () => {
    it("secretary.md must enforce Dissent section and SHA-256 token authorization halt", () => {
      const parsed = parseAgentFile(join(root, "agents/ops/secretary.md"));
      expect(parsed.body.toLowerCase()).toContain("dissent");
      expect(parsed.body.toLowerCase()).toContain("sha-256");
    });

    it("chief-of-staff.md must govern executive synthesis and council orchestration", () => {
      const parsed = parseAgentFile(join(root, "agents/ops/chief-of-staff.md"));
      expect(parsed.body.toLowerCase()).toContain("decision memo");
      expect(parsed.body.toLowerCase()).toContain("council");
    });

    it("fact-checker.md must output structured claim matrix with [RAW], [FETCH], [SEARCH], [INFER] tags", () => {
      const parsed = parseAgentFile(join(root, "agents/research/fact-checker.md"));
      expect(parsed.body).toContain("[RAW]");
      expect(parsed.body).toContain("[FETCH]");
      expect(parsed.body).toContain("[SEARCH]");
      expect(parsed.body).toContain("[INFER]");
    });
  });
});
