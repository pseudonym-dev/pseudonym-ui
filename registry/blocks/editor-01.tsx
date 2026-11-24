"use client";

import { Copy, Download, FileText, Pause, Play, Repeat, Star } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { FieldLabel, FieldValue } from "@/components/ui/field";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sidebar, SidebarBody, SidebarSection, SidebarTitle } from "@/components/ui/sidebar";
import { Slider, SliderField, SliderHead } from "@/components/ui/slider";
import { Switch, SwitchHint, SwitchLabel, SwitchRow } from "@/components/ui/switch";
import { Timeline, Transport, TransportTime, VideoBar } from "@/components/ui/timeline";
import { TopBar, TopBarBrand, TopBarBrandMark, TopBarSpacer } from "@/components/ui/top-bar";
import { asciiField } from "@/lib/ascii";

const backgrounds = [
  { label: "Black", value: "black" },
  { label: "Light", value: "light" },
  { label: "Transparent", value: "transparent" },
];

export default function Editor01() {
  const [density, setDensity] = useState(158);
  const [glow, setGlow] = useState(true);
  const [background, setBackground] = useState("black");
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(3.2);
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => setCurrent((time) => (time + 0.1 > 7 ? 0.5 : time + 0.1)), 100);
    return () => window.clearInterval(id);
  }, [playing]);

  const art = asciiField(Math.round(density / 1.6), Math.round(density / 5.5), current);
  const light = background === "light";

  return (
    <div className="flex h-svh min-h-[640px] flex-col bg-background text-foreground">
      <TopBar className="static">
        <TopBarBrand>
          <TopBarBrandMark>P_</TopBarBrandMark>
          <span className="hidden sm:inline">ASCII Studio</span>
        </TopBarBrand>
        <span className="truncate font-mono text-sm text-muted-foreground">toucan-profile.mp4</span>
        <TopBarSpacer />
        <Button variant="secondary" className="hidden sm:inline-flex">
          <Star />
          Star
        </Button>
        <Button variant="primary">
          <Download />
          Export
        </Button>
      </TopBar>

      <div className="flex min-h-0 flex-1">
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="grid min-h-0 flex-1 place-items-center bg-muted bg-[radial-gradient(var(--dots)_1px,transparent_1px)] bg-size-[20px_20px] p-6">
            <pre
              aria-label="Rendered frame"
              className={
                "max-h-full max-w-full overflow-hidden rounded-lg p-4 font-mono text-[8px] leading-[9px] shadow-(--canvas-shadow) " +
                (light ? "bg-white text-neutral-900" : background === "black" ? "bg-black text-primary" : "bg-transparent text-foreground") +
                (glow && !light ? " [text-shadow:0_0_6px_var(--primary)]" : "")
              }
            >
              {art}
            </pre>
          </div>
          <VideoBar>
            <Transport>
              <Button variant="secondary" onClick={() => setPlaying(!playing)}>
                {playing ? <Pause /> : <Play />}
                {playing ? "Pause" : "Play"}
              </Button>
              <Button variant="ghost" size="icon" aria-pressed aria-label="Loop">
                <Repeat />
              </Button>
              <TransportTime>{current.toFixed(1)} / 8.0 s</TransportTime>
            </Transport>
            <Timeline duration={8} start={0.5} end={7} current={current} onSeek={setCurrent} />
          </VideoBar>
        </div>

        <Sidebar className="hidden lg:flex">
          <SidebarBody>
            <SidebarSection>
              <SidebarTitle>Characters</SidebarTitle>
              <SliderField>
                <SliderHead>
                  <FieldLabel id="editor-density">Density</FieldLabel>
                  <FieldValue>{density} columns</FieldValue>
                </SliderHead>
                <Slider
                  aria-labelledby="editor-density"
                  min={60}
                  max={220}
                  value={[density]}
                  onValueChange={(next) => setDensity(Array.isArray(next) ? next[0] : next)}
                />
              </SliderField>
            </SidebarSection>
            <SidebarSection>
              <SidebarTitle>Style</SidebarTitle>
              <div className="flex flex-col gap-4">
                <SwitchRow>
                  <Switch checked={glow} onCheckedChange={setGlow} aria-labelledby="editor-glow" />
                  <div>
                    <SwitchLabel id="editor-glow">Glow</SwitchLabel>
                    <SwitchHint>Soft light bloom around bright characters.</SwitchHint>
                  </div>
                </SwitchRow>
                <div className="flex flex-col gap-1.5">
                  <FieldLabel id="editor-background">Background</FieldLabel>
                  <Select value={background} onValueChange={(value) => setBackground(value as string)} items={backgrounds}>
                    <SelectTrigger aria-labelledby="editor-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectPopup>
                      {backgrounds.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectPopup>
                  </Select>
                </div>
              </div>
            </SidebarSection>
            <SidebarSection>
              <SidebarTitle>Export</SidebarTitle>
              <ButtonGroup>
                <Button>
                  <Download />
                  PNG
                </Button>
                <Button>
                  <Copy />
                  Copy
                </Button>
                <Button>
                  <FileText />
                  .txt
                </Button>
              </ButtonGroup>
            </SidebarSection>
          </SidebarBody>
        </Sidebar>
      </div>
    </div>
  );
}
