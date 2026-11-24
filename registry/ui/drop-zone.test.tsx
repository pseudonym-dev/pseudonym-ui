import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { DropZone, DropZoneTitle } from "./drop-zone";

describe("DropZone", () => {
  it("marks itself as dragging on drag over", () => {
    render(
      <DropZone>
        <DropZoneTitle>Click to upload</DropZoneTitle>
      </DropZone>,
    );
    const zone = screen.getByText("Click to upload").parentElement!;
    fireEvent.dragOver(zone);
    expect(zone).toHaveAttribute("data-drag", "true");
  });

  it("forwards dropped files", () => {
    const onFiles = vi.fn();
    render(<DropZone onFiles={onFiles}>Drop</DropZone>);
    const zone = screen.getByText("Drop");
    const file = new File(["x"], "clip.mp4", { type: "video/mp4" });
    fireEvent.drop(zone, { dataTransfer: { files: [file] } });
    expect(onFiles).toHaveBeenCalled();
  });
});
