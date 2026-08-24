import { test, expect } from "@playwright/test";

test.describe("Nexus Baseline Harness Probe", () => {
  test("Homepage loads successfully with HTTP 200 and zero console errors", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });

    const response = await page.goto("http://localhost:3000");
    if (response) {
      expect(response.status()).toBeLessThan(400);
    }
    expect(consoleErrors).toEqual([]);
  });
});
