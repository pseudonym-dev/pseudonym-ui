"use client";

import { type ReactNode, useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, FieldHint, FieldLabel, FieldValue } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider, SliderField, SliderHead } from "@/components/ui/slider";
import { Switch, SwitchHint, SwitchLabel, SwitchRow } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const sections = ["Profile", "Rendering", "Notifications", "Billing", "Danger zone"];

const formats = [
  { label: "PNG", value: "png" },
  { label: "GIF", value: "gif" },
  { label: "MP4", value: "mp4" },
];

function Section({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <Card className="gap-0 p-0">
      <div className="border-b border-border px-6 py-4">
        <h2 className="text-base font-semibold">{title}</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-col gap-5 px-6 py-5">{children}</div>
    </Card>
  );
}

export default function Settings01() {
  const id = useId();
  const [density, setDensity] = useState(158);

  return (
    <div className="bg-background px-6 py-10 text-foreground">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your profile and the defaults new projects start with.</p>

        <div className="mt-8 grid gap-8 md:grid-cols-[180px_1fr]">
          <nav aria-label="Settings" className="flex gap-1 overflow-x-auto md:flex-col">
            {sections.map((section, i) => (
              <a
                key={section}
                href="#"
                aria-current={i === 1 ? "page" : undefined}
                className={cn(
                  "shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-foreground active:bg-accent/70",
                  i === 1 && "bg-accent text-foreground",
                  section === "Danger zone" && "text-destructive hover:text-destructive md:mt-4",
                )}
              >
                {section}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-6">
            <Section title="Profile" description="How you appear on shared presets.">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor={`${id}-name`}>Display name</FieldLabel>
                  <Input id={`${id}-name`} defaultValue="Ana Lima" />
                </Field>
                <Field>
                  <FieldLabel htmlFor={`${id}-handle`}>Handle</FieldLabel>
                  <Input id={`${id}-handle`} defaultValue="@ana" />
                </Field>
              </div>
            </Section>

            <Section title="Rendering" description="Defaults applied when you drop a new file.">
              <Field>
                <FieldLabel id={`${id}-format-label`}>Default export format</FieldLabel>
                <Select defaultValue="gif" items={formats}>
                  <SelectTrigger aria-labelledby={`${id}-format-label`} className="sm:w-56">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectPopup>
                    {formats.map((format) => (
                      <SelectItem key={format.value} value={format.value}>
                        {format.label}
                      </SelectItem>
                    ))}
                  </SelectPopup>
                </Select>
              </Field>
              <SliderField>
                <SliderHead>
                  <FieldLabel id={`${id}-density-label`}>Density</FieldLabel>
                  <FieldValue>{density} columns</FieldValue>
                </SliderHead>
                <Slider
                  aria-labelledby={`${id}-density-label`}
                  min={30}
                  max={220}
                  value={[density]}
                  onValueChange={(next) => setDensity(Array.isArray(next) ? next[0] : next)}
                />
                <FieldHint>More columns keep detail, fewer read better on small screens.</FieldHint>
              </SliderField>
              <SwitchRow>
                <Switch defaultChecked aria-labelledby={`${id}-glow`} />
                <div>
                  <SwitchLabel id={`${id}-glow`}>Glow</SwitchLabel>
                  <SwitchHint>Soft light bloom around bright characters.</SwitchHint>
                </div>
              </SwitchRow>
              <SwitchRow>
                <Switch aria-labelledby={`${id}-loop`} />
                <div>
                  <SwitchLabel id={`${id}-loop`}>Loop video previews</SwitchLabel>
                  <SwitchHint>Restart clips when they reach the trim end.</SwitchHint>
                </div>
              </SwitchRow>
            </Section>

            <Card className="flex-row flex-wrap items-center justify-between gap-4 p-6 ring-1 ring-destructive/30">
              <div>
                <h2 className="text-base font-semibold">Delete account</h2>
                <p className="mt-0.5 text-sm text-muted-foreground">Removes your presets and shared links. This cannot be undone.</p>
              </div>
              <Button variant="secondary" className="text-destructive">
                Delete account
              </Button>
            </Card>

            <div className="flex justify-end gap-3">
              <Button>Cancel</Button>
              <Button variant="primary">Save changes</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
