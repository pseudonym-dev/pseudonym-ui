import { Copy, Download, FileText, Repeat, Upload } from "lucide-react";
import { type ReactNode, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { AreaChart, BarChart } from "@/components/ui/chart";
import { Card, CardDescription, CardFooter, CardMedia, CardTitle } from "@/components/ui/card";
import { Drawer, DrawerClose, DrawerPopup, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { DropZone, DropZoneIcon, DropZoneTitle } from "@/components/ui/drop-zone";
import { Field, FieldGrid, FieldHint, FieldLabel, FieldValue } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sidebar, SidebarBody, SidebarDisabled, SidebarSection, SidebarTitle } from "@/components/ui/sidebar";
import { Slider, SliderField, SliderHead } from "@/components/ui/slider";
import { Switch, SwitchHint, SwitchLabel, SwitchRow } from "@/components/ui/switch";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Timeline, Transport, TransportTime, VideoBar } from "@/components/ui/timeline";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TopBar, TopBarBrand, TopBarBrandMark, TopBarSpacer } from "@/components/ui/top-bar";

export type ComponentDoc = {
  slug: string;
  title: string;
  description: string;
  item: string;
  preview: ReactNode;
  code: string;
};

function SliderDemo() {
  const [value, setValue] = useState(158);
  return (
    <SliderField className="w-72">
      <SliderHead>
        <FieldLabel id="density-label">Density</FieldLabel>
        <FieldValue>{value} columns</FieldValue>
      </SliderHead>
      <Slider
        aria-labelledby="density-label"
        min={30}
        max={220}
        value={[value]}
        onValueChange={(next) => setValue(Array.isArray(next) ? next[0] : next)}
      />
    </SliderField>
  );
}

function TimelineDemo() {
  const [current, setCurrent] = useState(3.2);
  return (
    <VideoBar className="w-full max-w-xl">
      <Transport>
        <Button variant="secondary">Pause</Button>
        <Button variant="ghost" size="icon" aria-pressed aria-label="Loop">
          <Repeat />
        </Button>
        <TransportTime>3.2 / 8.0 s</TransportTime>
      </Transport>
      <Timeline duration={8} start={0.5} end={7} current={current} onSeek={setCurrent} />
    </VideoBar>
  );
}

export const componentDocs: ComponentDoc[] = [
  {
    slug: "button",
    title: "Button",
    description: "Primary, secondary, ghost and icon buttons with the ASCII Studio chrome.",
    item: "button",
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button variant="primary">
          <Download />
          Export
        </Button>
        <Button variant="secondary">
          <Upload />
          Choose file
        </Button>
        <Button>Cancel</Button>
        <Button variant="secondary" size="icon" aria-label="Copy">
          <Copy />
        </Button>
        <Button variant="primary" disabled>
          Export
        </Button>
      </div>
    ),
    code: `import { Button } from "@/components/ui/button"

<Button variant="primary">Export</Button>
<Button variant="secondary">Choose file</Button>
<Button>Cancel</Button>`,
  },
  {
    slug: "button-group",
    title: "Button Group",
    description: "A joined row of actions, used for export formats.",
    item: "button-group",
    preview: (
      <ButtonGroup className="w-80">
        <Button>
          <Download />
          PNG
        </Button>
        <Button>
          <Copy />
          Copy text
        </Button>
        <Button>
          <FileText />
          .txt
        </Button>
      </ButtonGroup>
    ),
    code: `import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

<ButtonGroup>
  <Button>PNG</Button>
  <Button>Copy text</Button>
  <Button>.txt</Button>
</ButtonGroup>`,
  },
  {
    slug: "badge",
    title: "Badge",
    description: "A pill badge with an optional lime status dot.",
    item: "badge",
    preview: (
      <div className="flex gap-2">
        <Badge>Runs in your browser</Badge>
        <Badge tone="plain">v0.1</Badge>
      </div>
    ),
    code: `import { Badge } from "@/components/ui/badge"

<Badge>Runs in your browser</Badge>`,
  },
  {
    slug: "field",
    title: "Field",
    description: "Label, hint and grid layout for form controls.",
    item: "field",
    preview: (
      <FieldGrid className="w-80">
        <Field>
          <FieldLabel>Format</FieldLabel>
          <FieldHint>MP4, WebM or GIF</FieldHint>
        </Field>
        <Field>
          <FieldLabel>Size</FieldLabel>
          <FieldValue>1080p</FieldValue>
        </Field>
      </FieldGrid>
    ),
    code: `import { Field, FieldGrid, FieldLabel } from "@/components/ui/field"

<Field>
  <FieldLabel>Format</FieldLabel>
</Field>`,
  },
  {
    slug: "switch",
    title: "Switch",
    description: "A 36×20 toggle with a lime track when on.",
    item: "switch",
    preview: (
      <div className="w-80 space-y-4">
        <SwitchRow>
          <div className="flex-1">
            <SwitchLabel>Glow</SwitchLabel>
            <SwitchHint>Soft light bloom around bright characters.</SwitchHint>
          </div>
          <Switch defaultChecked aria-label="Glow" />
        </SwitchRow>
        <SwitchRow>
          <div className="flex-1">
            <SwitchLabel>Monochrome</SwitchLabel>
            <SwitchHint>Grey characters instead of colour.</SwitchHint>
          </div>
          <Switch aria-label="Monochrome" />
        </SwitchRow>
      </div>
    ),
    code: `import { Switch, SwitchHint, SwitchLabel, SwitchRow } from "@/components/ui/switch"

<SwitchRow>
  <div>
    <SwitchLabel>Glow</SwitchLabel>
    <SwitchHint>Soft light bloom around bright characters.</SwitchHint>
  </div>
  <Switch defaultChecked aria-label="Glow" />
</SwitchRow>`,
  },
  {
    slug: "slider",
    title: "Slider",
    description: "A range slider with a lime fill and ringed thumb.",
    item: "slider",
    preview: <SliderDemo />,
    code: `import { Slider, SliderField, SliderHead } from "@/components/ui/slider"

<SliderField>
  <SliderHead>
    <FieldLabel id="density-label">Density</FieldLabel>
    <FieldValue>158 columns</FieldValue>
  </SliderHead>
  <Slider aria-labelledby="density-label" min={30} max={220} defaultValue={[158]} />
</SliderField>`,
  },
  {
    slug: "progress",
    title: "Progress",
    description: "A thin lime progress bar.",
    item: "progress",
    preview: <Progress value={42} className="w-72" />,
    code: `import { Progress } from "@/components/ui/progress"

<Progress value={42} />`,
  },
  {
    slug: "tabs",
    title: "Tabs",
    description: "A segmented control in the style of Adjust / Export.",
    item: "tabs",
    preview: (
      <Tabs defaultValue="adjust" className="w-80">
        <TabsList>
          <TabsTab value="adjust">Adjust</TabsTab>
          <TabsTab value="export">Export</TabsTab>
        </TabsList>
        <TabsPanel value="adjust" className="pt-4 text-sm text-muted-foreground">
          Density, edges and style.
        </TabsPanel>
        <TabsPanel value="export" className="pt-4 text-sm text-muted-foreground">
          Format, frame rate and size.
        </TabsPanel>
      </Tabs>
    ),
    code: `import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs"

<Tabs defaultValue="adjust">
  <TabsList>
    <TabsTab value="adjust">Adjust</TabsTab>
    <TabsTab value="export">Export</TabsTab>
  </TabsList>
  <TabsPanel value="adjust">Density, edges and style.</TabsPanel>
</Tabs>`,
  },
  {
    slug: "tooltip",
    title: "Tooltip",
    description: "An accessible hover and focus tooltip.",
    item: "tooltip",
    preview: (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger render={<Button variant="secondary" size="icon" aria-label="Loop" />}>
            <Repeat />
          </TooltipTrigger>
          <TooltipContent>Loop</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
    code: `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger render={<Button size="icon" aria-label="Loop" />}>
      <Repeat />
    </TooltipTrigger>
    <TooltipContent>Loop</TooltipContent>
  </Tooltip>
</TooltipProvider>`,
  },
  {
    slug: "select",
    title: "Select",
    description: "A 40px select trigger with a chevron, built on Base UI.",
    item: "select",
    preview: (
      <Field className="w-56">
        <FieldLabel id="format-label">Format</FieldLabel>
        <Select defaultValue="mp4" items={[
          { label: "MP4", value: "mp4" },
          { label: "WebM", value: "webm" },
          { label: "GIF", value: "gif" },
        ]}>
          <SelectTrigger aria-labelledby="format-label">
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            <SelectItem value="mp4">MP4</SelectItem>
            <SelectItem value="webm">WebM</SelectItem>
            <SelectItem value="gif">GIF</SelectItem>
          </SelectPopup>
        </Select>
      </Field>
    ),
    code: `import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@/components/ui/select"

const formats = [
  { label: "MP4", value: "mp4" },
  { label: "WebM", value: "webm" },
]

<Select defaultValue="mp4" items={formats}>
  <SelectTrigger aria-label="Format">
    <SelectValue />
  </SelectTrigger>
  <SelectPopup>
    <SelectItem value="mp4">MP4</SelectItem>
    <SelectItem value="webm">WebM</SelectItem>
  </SelectPopup>
</Select>`,
  },
  {
    slug: "card",
    title: "Card",
    description: "Media card with a 16:9 frame, title and credit line.",
    item: "card",
    preview: (
      <Card className="w-80">
        <CardMedia className="docs-grid" />
        <CardFooter>
          <CardTitle>Toucan</CardTitle>
          <CardDescription>A still frame in the editor.</CardDescription>
        </CardFooter>
      </Card>
    ),
    code: `import { Card, CardDescription, CardFooter, CardMedia, CardTitle } from "@/components/ui/card"

<Card>
  <CardMedia />
  <CardFooter>
    <CardTitle>Toucan</CardTitle>
    <CardDescription>A still frame in the editor.</CardDescription>
  </CardFooter>
</Card>`,
  },
  {
    slug: "drop-zone",
    title: "Drop Zone",
    description: "A drag-and-drop target with a lime ring while dragging.",
    item: "drop-zone",
    preview: (
      <DropZone className="w-full max-w-lg">
        <DropZoneIcon>
          <Upload className="size-5" />
        </DropZoneIcon>
        <DropZoneTitle>
          <b>Click to upload</b> or drag and drop
        </DropZoneTitle>
        <p className="text-xs text-muted-foreground">Video up to 15 s or an image, max 100 MB</p>
        <Button variant="primary">Choose file</Button>
      </DropZone>
    ),
    code: `import { DropZone, DropZoneIcon, DropZoneTitle } from "@/components/ui/drop-zone"

<DropZone>
  <DropZoneIcon><Upload /></DropZoneIcon>
  <DropZoneTitle><b>Click to upload</b> or drag and drop</DropZoneTitle>
</DropZone>`,
  },
  {
    slug: "drawer",
    title: "Drawer",
    description: "A right-side drawer with a scrim, for mobile controls.",
    item: "drawer",
    preview: (
      <Drawer>
        <DrawerTrigger render={<Button variant="secondary" />}>Open controls</DrawerTrigger>
        <DrawerPopup>
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <DrawerTitle>Controls</DrawerTitle>
            <DrawerClose render={<Button variant="ghost" />}>Close</DrawerClose>
          </div>
          <p className="p-5 text-sm text-muted-foreground">Density, edges and export live here.</p>
        </DrawerPopup>
      </Drawer>
    ),
    code: `import { Drawer, DrawerClose, DrawerPopup, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"

<Drawer>
  <DrawerTrigger render={<Button />}>Open controls</DrawerTrigger>
  <DrawerPopup>
    <DrawerTitle>Controls</DrawerTitle>
    <DrawerClose render={<Button />}>Close</DrawerClose>
  </DrawerPopup>
</Drawer>`,
  },
  {
    slug: "top-bar",
    title: "Top Bar",
    description: "A 60px application top bar with a brand mark.",
    item: "top-bar",
    preview: (
      <TopBar className="relative w-full max-w-2xl rounded-lg inset-ring inset-ring-border">
        <TopBarBrand>
          <TopBarBrandMark>P_</TopBarBrandMark>
          Pseudonym UI
        </TopBarBrand>
        <TopBarSpacer />
        <Button variant="secondary">Star</Button>
        <Button variant="primary">Export</Button>
      </TopBar>
    ),
    code: `import { TopBar, TopBarBrand, TopBarBrandMark, TopBarSpacer } from "@/components/ui/top-bar"

<TopBar>
  <TopBarBrand>
    <TopBarBrandMark>P_</TopBarBrandMark>
    Pseudonym UI
  </TopBarBrand>
  <TopBarSpacer />
</TopBar>`,
  },
  {
    slug: "sidebar",
    title: "Sidebar",
    description: "A 320px inspector sidebar, including a disabled empty state.",
    item: "sidebar",
    preview: (
      <Sidebar className="h-80 rounded-lg border border-sidebar-border">
        <SidebarBody>
          <SidebarDisabled disabled>
            <p className="mb-4 text-sm text-muted-foreground">Drop an image or a video to start editing.</p>
            <SidebarSection>
              <SidebarTitle>Characters</SidebarTitle>
              <p className="text-sm text-muted-foreground">Density, edges, zoom</p>
            </SidebarSection>
          </SidebarDisabled>
        </SidebarBody>
      </Sidebar>
    ),
    code: `import { Sidebar, SidebarBody, SidebarDisabled, SidebarSection, SidebarTitle } from "@/components/ui/sidebar"

<Sidebar>
  <SidebarBody>
    <SidebarDisabled disabled>
      <SidebarSection>
        <SidebarTitle>Characters</SidebarTitle>
      </SidebarSection>
    </SidebarDisabled>
  </SidebarBody>
</Sidebar>`,
  },
  {
    slug: "timeline",
    title: "Timeline",
    description: "Video transport and a trim / playhead timeline.",
    item: "timeline",
    preview: <TimelineDemo />,
    code: `import { Timeline, Transport, TransportTime, VideoBar } from "@/components/ui/timeline"

<VideoBar>
  <Transport>
    <Button variant="secondary">Pause</Button>
    <TransportTime>3.2 / 8.0 s</TransportTime>
  </Transport>
  <Timeline duration={8} start={0.5} end={7} current={3.2} />
</VideoBar>`,
  },
  {
    slug: "theme-toggle",
    title: "Theme Toggle",
    description: "Light and dark theme provider plus a toggle button. Try the one in the header, or this copy.",
    item: "theme-toggle",
    preview: <ThemeToggle />,
    code: `import { ThemeProvider, ThemeToggle } from "@/components/ui/theme-toggle"

<ThemeProvider>
  <ThemeToggle />
</ThemeProvider>`,
  },
  {
    slug: "input",
    title: "Input",
    description: "A 40px text input that matches the select trigger.",
    item: "input",
    preview: (
      <Field className="w-72">
        <FieldLabel htmlFor="input-demo">Project name</FieldLabel>
        <Input id="input-demo" placeholder="toucan-profile" />
        <FieldHint>Used for the export file name.</FieldHint>
      </Field>
    ),
    code: `import { Input } from "@/components/ui/input"

<Input id="name" placeholder="toucan-profile" />`,
  },
  {
    slug: "chart",
    title: "Chart",
    description: "Lightweight SVG area and bar charts drawn with the chart tokens. No chart library.",
    item: "chart",
    preview: (
      <div className="grid w-full max-w-xl gap-6 sm:grid-cols-2">
        <AreaChart data={[12, 18, 15, 24, 22, 31, 29, 38]} aria-label="Exports" className="h-32" />
        <BarChart data={[5, 8, 6, 9, 12, 7, 14]} aria-label="Renders" className="h-32" />
      </div>
    ),
    code: `import { AreaChart, BarChart, ChartLegend } from "@/components/ui/chart"

<AreaChart data={[12, 18, 15, 24, 22, 31]} aria-label="Exports" />
<BarChart data={[5, 8, 6, 9, 12, 7]} aria-label="Renders" />
<ChartLegend>
  <span>Mon</span>
  <span>Sun</span>
</ChartLegend>`,
  },
];

export function getComponent(slug: string) {
  return componentDocs.find((item) => item.slug === slug);
}
