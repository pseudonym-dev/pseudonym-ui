import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Tabs, TabsList, TabsPanel, TabsTab } from "./tabs";

describe("Tabs", () => {
  it("shows the selected panel and hides the other", async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="adjust">
        <TabsList>
          <TabsTab value="adjust">Adjust</TabsTab>
          <TabsTab value="export">Export</TabsTab>
        </TabsList>
        <TabsPanel value="adjust">Density</TabsPanel>
        <TabsPanel value="export">Format</TabsPanel>
      </Tabs>,
    );
    expect(screen.getByText("Density")).toBeVisible();
    await user.click(screen.getByRole("tab", { name: "Export" }));
    expect(screen.getByText("Format")).toBeVisible();
  });
});
