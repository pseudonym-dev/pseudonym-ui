import * as React from "react";

import { cn } from "@/lib/utils";

function Sidebar({ className, ...props }: React.ComponentProps<"aside">) {
  return (
    <aside
      data-slot="sidebar"
      className={cn(
        "flex h-full w-(--sidebar-width,320px) shrink-0 flex-col overflow-auto border-l border-sidebar-border bg-sidebar text-sidebar-foreground",
        className,
      )}
      {...props}
    />
  );
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-header" className={cn("flex items-center justify-end px-2 pt-2", className)} {...props} />;
}

function SidebarBody({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-body" className={cn("flex flex-col px-5 py-5", className)} {...props} />;
}

function SidebarSection({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="sidebar-section"
      className={cn("border-t border-sidebar-border py-4 first:border-t-0 first:pt-1", className)}
      {...props}
    />
  );
}

function SidebarTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="sidebar-title"
      className={cn("mb-4 text-sm font-semibold text-sidebar-foreground", className)}
      {...props}
    />
  );
}

function SidebarDisabled({
  className,
  disabled = false,
  children,
  ...props
}: React.ComponentProps<"div"> & { disabled?: boolean }) {
  return (
    <div
      data-slot="sidebar-disabled"
      aria-disabled={disabled || undefined}
      className={cn(disabled && "pointer-events-none opacity-50", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { Sidebar, SidebarBody, SidebarDisabled, SidebarHeader, SidebarSection, SidebarTitle };
