"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type DropZoneProps = React.ComponentProps<"div"> & {
  onFiles?: (files: FileList) => void;
};

function DropZone({ className, onFiles, onDragOver, onDragLeave, onDrop, children, ...props }: DropZoneProps) {
  const [drag, setDrag] = React.useState(false);

  return (
    <div
      data-slot="drop-zone"
      data-drag={drag ? "true" : undefined}
      className={cn(
        "flex flex-col items-center gap-3 rounded-xl bg-background p-6 text-center inset-ring inset-ring-border transition-[box-shadow,background-color] duration-100",
        "data-[drag=true]:bg-muted data-[drag=true]:inset-ring-2 data-[drag=true]:inset-ring-primary",
        className,
      )}
      onDragOver={(event) => {
        event.preventDefault();
        setDrag(true);
        onDragOver?.(event);
      }}
      onDragLeave={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDrag(false);
        onDragLeave?.(event);
      }}
      onDrop={(event) => {
        event.preventDefault();
        setDrag(false);
        if (event.dataTransfer.files?.length) onFiles?.(event.dataTransfer.files);
        onDrop?.(event);
      }}
      {...props}
    >
      {children}
    </div>
  );
}

function DropZoneIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drop-zone-icon"
      className={cn(
        "grid size-10 place-items-center rounded-lg text-secondary-foreground shadow-skeuo shadow-xs inset-ring inset-ring-input",
        className,
      )}
      {...props}
    />
  );
}

function DropZoneTitle({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="drop-zone-title"
      className={cn("text-sm text-muted-foreground [&_b]:font-semibold [&_b]:text-brand-text", className)}
      {...props}
    />
  );
}

export { DropZone, DropZoneIcon, DropZoneTitle };
