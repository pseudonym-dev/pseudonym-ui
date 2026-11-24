"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

function Transport({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="transport" className={cn("flex items-center gap-2", className)} {...props} />
  );
}

function TransportTime({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="transport-time"
      className={cn("ml-2 whitespace-nowrap text-sm tabular-nums text-secondary-foreground", className)}
      {...props}
    />
  );
}

type TimelineProps = React.ComponentProps<"div"> & {
  duration?: number;
  start?: number;
  end?: number;
  current?: number;
  onSeek?: (time: number) => void;
};

function Timeline({
  className,
  duration = 1,
  start = 0,
  end,
  current = 0,
  onSeek,
  ...props
}: TimelineProps) {
  const spanEnd = end ?? duration;
  const left = duration > 0 ? (start / duration) * 100 : 0;
  const width = duration > 0 ? ((spanEnd - start) / duration) * 100 : 100;
  const playhead = duration > 0 ? (current / duration) * 100 : 0;
  const trackRef = React.useRef<HTMLDivElement>(null);

  function timeAt(clientX: number) {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect || duration <= 0) return 0;
    return Math.min(duration, Math.max(0, ((clientX - rect.left) / rect.width) * duration));
  }

  return (
    <div
      ref={trackRef}
      data-slot="timeline"
      role="slider"
      aria-valuemin={0}
      aria-valuemax={duration}
      aria-valuenow={current}
      aria-label="Playhead"
      tabIndex={0}
      className={cn("relative mt-3 h-14 cursor-pointer touch-none select-none", className)}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        onSeek?.(timeAt(event.clientX));
      }}
      onPointerMove={(event) => {
        if (event.buttons) onSeek?.(timeAt(event.clientX));
      }}
      onKeyDown={(event) => {
        const step = duration / 50;
        if (event.key === "ArrowRight") {
          event.preventDefault();
          onSeek?.(Math.min(duration, current + step));
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          onSeek?.(Math.max(0, current - step));
        }
      }}
      {...props}
    >
      <div className="absolute inset-x-0 top-0 h-2 bg-[repeating-linear-gradient(90deg,var(--input)_0_1px,transparent_1px_10%)]" />
      <div className="absolute inset-x-0 top-4 h-10 rounded-lg bg-muted shadow-[inset_0_0_0_1px_var(--border)] bg-[repeating-linear-gradient(90deg,var(--stripes)_0_1px,transparent_1px_48px)]" />
      <div
        data-slot="timeline-span"
        className="absolute top-4 h-10 rounded-lg bg-[rgba(212,255,58,0.12)] shadow-[inset_0_0_0_2px_var(--primary)]"
        style={{ left: `${left}%`, width: `${width}%` }}
      >
        <span className="absolute top-0 left-0 h-10 w-3 rounded-l-lg bg-primary before:absolute before:top-1/2 before:left-1/2 before:h-3.5 before:w-0.5 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-sm before:bg-primary-foreground/50 before:content-['']" />
        <span className="absolute top-0 right-0 h-10 w-3 rounded-r-lg bg-primary before:absolute before:top-1/2 before:left-1/2 before:h-3.5 before:w-0.5 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-sm before:bg-primary-foreground/50 before:content-['']" />
      </div>
      <div
        data-slot="timeline-playhead"
        className="pointer-events-none absolute top-1.5 z-[2] h-[50px] w-0.5 -translate-x-1/2 bg-foreground before:absolute before:top-[-4px] before:left-1/2 before:size-3 before:-translate-x-1/2 before:rounded-full before:bg-foreground before:shadow-md before:content-['']"
        style={{ left: `${playhead}%` }}
      />
    </div>
  );
}

function VideoBar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="video-bar"
      className={cn("relative shrink-0 border-t border-border bg-background px-5 pt-3 pb-4", className)}
      {...props}
    />
  );
}

export { Timeline, Transport, TransportTime, VideoBar };
