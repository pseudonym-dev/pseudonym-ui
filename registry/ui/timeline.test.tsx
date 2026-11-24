import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Timeline } from "./timeline";

describe("Timeline", () => {
  it("exposes a slider and seeks with the keyboard", async () => {
    const onSeek = vi.fn();
    const user = userEvent.setup();
    render(<Timeline duration={10} current={0} onSeek={onSeek} />);
    const slider = screen.getByRole("slider", { name: "Playhead" });
    slider.focus();
    await user.keyboard("{ArrowRight}");
    expect(onSeek).toHaveBeenCalled();
    expect(onSeek.mock.calls[0][0]).toBeGreaterThan(0);
  });

  it("jumps to the start and end with Home and End", async () => {
    const onSeek = vi.fn();
    const user = userEvent.setup();
    render(<Timeline duration={10} current={4} onSeek={onSeek} />);
    screen.getByRole("slider", { name: "Playhead" }).focus();
    await user.keyboard("{End}{Home}");
    expect(onSeek.mock.calls.map((call) => call[0])).toEqual([10, 0]);
  });
});
