import { describe, it, expect } from "bun:test";
import { execSync } from "node:child_process";
import { join } from "node:path";

const root = join(import.meta.dir, "../..");

describe("Build Script & Verification", () => {
  it("should pass build.sh --check without errors", () => {
    const output = execSync("bash scripts/build.sh --check", {
      cwd: root,
      encoding: "utf8",
    });
    expect(output).toContain("OK:");
    expect(output).toContain("21 core");
    expect(output).toContain("28 pack agents");
    expect(output).toContain("13 packs");
  });

  it("should print complete roster in roster mode", () => {
    const output = execSync("bash scripts/build.sh roster", {
      cwd: root,
      encoding: "utf8",
    });
    expect(output).toContain("CORE:");
    expect(output).toContain("PACK gauntlet:");
    expect(output).toContain("PACK secretary:");
  });
});
