"use client";

import { Check } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTab } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type Billing = "monthly" | "yearly";

const plans = [
  {
    name: "Hobby",
    description: "For weekend experiments.",
    price: { monthly: 0, yearly: 0 },
    features: ["Images up to 5 MB", "PNG and text export", "Community support"],
    cta: "Start free",
  },
  {
    name: "Studio",
    description: "For creators who ship every week.",
    price: { monthly: 12, yearly: 9 },
    features: ["Video up to 60 s", "GIF and MP4 export", "Custom character ramps", "Priority rendering"],
    cta: "Upgrade to Studio",
    featured: true,
  },
  {
    name: "Team",
    description: "Shared presets and brand kits.",
    price: { monthly: 39, yearly: 29 },
    features: ["Everything in Studio", "5 seats included", "Shared presets", "SSO and audit log"],
    cta: "Talk to us",
  },
];

export default function Pricing01() {
  const [billing, setBilling] = useState<Billing>("yearly");

  return (
    <section className="bg-background px-6 py-20 text-foreground">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center text-center">
          <Badge tone="plain">Pricing</Badge>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Simple plans, no render queue</h2>
          <p className="mt-3 max-w-xl text-muted-foreground">Everything runs in your browser. Pay for the formats you export.</p>
          <Tabs value={billing} onValueChange={(value) => setBilling(value as Billing)} className="mt-8">
            <TabsList className="w-64">
              <TabsTab value="monthly">Monthly</TabsTab>
              <TabsTab value="yearly">Yearly · −25%</TabsTab>
            </TabsList>
          </Tabs>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn("gap-6 p-6", plan.featured && "ring-2 ring-primary md:-my-3 md:py-9")}
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold">{plan.name}</h3>
                  {plan.featured ? <Badge>Most popular</Badge> : null}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
              </div>
              <p className="flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight tabular-nums">${plan.price[billing]}</span>
                <span className="text-sm text-muted-foreground">/ month</span>
              </p>
              <Button variant={plan.featured ? "primary" : "secondary"} className="w-full">
                {plan.cta}
              </Button>
              <ul className="flex flex-col gap-2.5 border-t border-border pt-6 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-secondary-foreground">
                    <Check className="size-4 shrink-0 text-brand-text" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
