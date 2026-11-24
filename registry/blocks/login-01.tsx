"use client";

import { ArrowRight, Mail } from "lucide-react";
import { useId } from "react";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { TopBarBrandMark } from "@/components/ui/top-bar";
import { asciiField } from "@/lib/ascii";

const art = asciiField(64, 34, 2.1);

export default function Login01() {
  const id = useId();
  return (
    <div className="grid min-h-svh bg-background text-foreground lg:grid-cols-2">
      <div className="flex flex-col px-6 py-8 sm:px-12">
        <div className="flex items-center gap-2.5 font-semibold">
          <TopBarBrandMark>P_</TopBarBrandMark>
          Pseudonym
        </div>

        <form className="m-auto flex w-full max-w-sm flex-col gap-5 py-12" onSubmit={(event) => event.preventDefault()}>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">Sign in to sync your presets across devices.</p>
          </div>

          <Field>
            <FieldLabel htmlFor={`${id}-email`}>Email</FieldLabel>
            <Input id={`${id}-email`} type="email" autoComplete="email" placeholder="you@studio.dev" required />
          </Field>
          <Field>
            <div className="flex items-baseline justify-between">
              <FieldLabel htmlFor={`${id}-password`}>Password</FieldLabel>
              <a href="#" className="text-sm font-medium text-brand-text hover:underline">
                Forgot?
              </a>
            </div>
            <Input id={`${id}-password`} type="password" autoComplete="current-password" required />
          </Field>
          <label className="flex items-center gap-2.5 text-sm text-secondary-foreground">
            <Switch defaultChecked />
            Keep me signed in
          </label>

          <Button type="submit" variant="primary" className="h-10">
            Sign in
            <ArrowRight />
          </Button>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            or
            <span className="h-px flex-1 bg-border" />
          </div>
          <Button type="button" variant="secondary" className="h-10">
            <Mail />
            Email me a magic link
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            New here?{" "}
            <a href="#" className="font-medium text-foreground hover:underline">
              Create an account
            </a>
          </p>
        </form>
      </div>

      <div className="relative hidden overflow-hidden bg-neutral-950 lg:block">
        <pre
          aria-hidden
          className="absolute inset-0 grid place-items-center font-mono text-[11px] leading-[13px] text-primary/80"
        >
          {art}
        </pre>
        <blockquote className="absolute inset-x-10 bottom-10 rounded-xl bg-neutral-950/80 p-5 text-sm text-neutral-300 ring-1 ring-white/10 backdrop-blur">
          “It turned our launch trailer into a poster in one afternoon.”
          <footer className="mt-2 text-neutral-500">Ana Lima, motion designer</footer>
        </blockquote>
      </div>
    </div>
  );
}
