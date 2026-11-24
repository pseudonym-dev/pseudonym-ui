import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "./button";

describe("Button", () => {
  it("renders a button with the given label", () => {
    render(<Button>Export</Button>);
    expect(screen.getByRole("button", { name: "Export" })).toBeInTheDocument();
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Button disabled onClick={onClick}>
        Export
      </Button>,
    );
    await user.click(screen.getByRole("button", { name: "Export" }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("applies the primary variant", () => {
    render(<Button variant="primary">Save</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("data-slot", "button");
    expect(screen.getByRole("button").className).toMatch(/bg-primary/);
  });
});
