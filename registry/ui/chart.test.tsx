import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { AreaChart, BarChart } from "./chart";

describe("Chart", () => {
  it("labels the y axis with round ticks from zero", () => {
    render(<BarChart aria-label="Renders" data={[3, 16, 9]} labels={["Mon", "Tue", "Wed"]} />);
    const figure = screen.getByRole("figure", { name: "Renders" });
    for (const tick of ["0", "5", "10", "15", "20"]) expect(figure).toHaveTextContent(tick);
  });

  it("reads each value with the arrow keys", async () => {
    const user = userEvent.setup();
    render(
      <AreaChart
        aria-label="Exports"
        data={[12, 18, 15]}
        compare={[10, 11, 14]}
        labels={["Mon", "Tue", "Wed"]}
        name="Exports"
        compareName="Previous"
      />,
    );
    await user.tab();
    await user.keyboard("{End}{ArrowLeft}");
    expect(screen.getByText("Tue: Exports 18, Previous 11")).toBeInTheDocument();
  });

  it("draws a sparkline without axes or focus stop when there are no labels", () => {
    render(<AreaChart aria-label="Trend" data={[1, 2, 3]} />);
    expect(screen.getByRole("img", { name: "Trend" })).toBeInTheDocument();
    expect(screen.queryByRole("figure")).not.toBeInTheDocument();
  });
});
