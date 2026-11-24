import { describe, expect, it } from "vitest";

import { asciiField } from "./ascii";

describe("asciiField", () => {
  it("returns rows x cols characters from the ramp and fades to blank at the edges", () => {
    const art = asciiField(40, 12);
    const lines = art.split("\n");
    expect(lines).toHaveLength(12);
    expect(lines.every((line) => line.length === 40)).toBe(true);
    expect(art).toMatch(/^[ .:\-=+*#%@\n]+$/);
    expect(lines[0][0]).toBe(" ");
    expect(art.trim().length).toBeGreaterThan(0);
  });
});
