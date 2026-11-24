import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import { ThemeProvider, ThemeToggle } from "./theme-toggle";

afterEach(() => {
  localStorage.clear();
  document.documentElement.className = "";
  delete document.documentElement.dataset.theme;
});

describe("ThemeProvider", () => {
  it("applies the saved theme on mount", () => {
    localStorage.setItem("theme", "dark");
    render(<ThemeProvider>{null}</ThemeProvider>);
    expect(document.documentElement).toHaveClass("dark");
    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  it("toggles and remembers the theme", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeToggle />
      </ThemeProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Switch to dark theme" }));
    expect(document.documentElement).toHaveClass("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
  });
});
