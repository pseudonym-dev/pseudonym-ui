import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Switch } from "./switch";

describe("Switch", () => {
  it("toggles when clicked", async () => {
    const onCheckedChange = vi.fn();
    const user = userEvent.setup();
    render(<Switch aria-label="Glow" onCheckedChange={onCheckedChange} />);
    const control = screen.getByRole("switch", { name: "Glow" });
    expect(control).toHaveAttribute("aria-checked", "false");
    await user.click(control);
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
  });

  it("stays off when disabled", async () => {
    const onCheckedChange = vi.fn();
    const user = userEvent.setup();
    render(<Switch aria-label="Glow" disabled onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole("switch", { name: "Glow" }));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });
});
