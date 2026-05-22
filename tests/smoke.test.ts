import { describe, it, expect } from "vitest";

describe("@final-commerce/final-types — smoke", () => {
  it("the package's index module imports without throwing", async () => {
    const mod = await import("../src/index");
    expect(mod).toBeDefined();
  });
});
