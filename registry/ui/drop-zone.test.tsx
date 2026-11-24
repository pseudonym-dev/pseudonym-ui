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

  it("stays in the dragging state while the pointer moves over its children", () => {
    render(
      <DropZone>
        <DropZoneTitle>Click to upload</DropZoneTitle>
      </DropZone>,
    );
    const title = screen.getByText("Click to upload");
    const zone = title.parentElement!;
    fireEvent.dragOver(zone);
    // jsdom has no DragEvent, so send a MouseEvent, which carries relatedTarget.
    const leave = (relatedTarget: Element) => fireEvent(zone, new MouseEvent("dragleave", { bubbles: true, relatedTarget }));
    leave(title);
    expect(zone).toHaveAttribute("data-drag", "true");
    leave(document.body);
    expect(zone).not.toHaveAttribute("data-drag");
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
