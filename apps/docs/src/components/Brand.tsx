import { Link } from "react-router";

import { TopBarBrandMark } from "@/components/ui/top-bar";
import { cn } from "@/lib/utils";

import { SITE } from "../lib/site";

export function Brand({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("inline-flex shrink-0 items-center gap-2.5 text-base font-semibold whitespace-nowrap text-foreground", className)}>
      <TopBarBrandMark>P_</TopBarBrandMark>
      {SITE.name}
    </Link>
  );
}
