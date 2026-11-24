import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Badge } from "./badge";

describe("Badge", () => {
  it("renders its children", () => {
    render(<Badge>Runs in your browser</Badge>);
    expect(screen.getByText("Runs in your browser")).toBeInTheDocument();
  });
});
