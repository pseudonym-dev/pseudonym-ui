import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Slider } from "./slider";

describe("Slider", () => {
  it("positions the thumb inside the track so it lines up with the fill", () => {
    const { container } = render(<Slider aria-label="Density" defaultValue={[50]} />);
    const track = container.querySelector('[data-slot="slider-track"]');
    const thumb = container.querySelector('[data-slot="slider-thumb"]');
    expect(track).not.toBeNull();
    expect(track?.contains(thumb)).toBe(true);
  });
});
