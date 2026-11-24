import { Route, Routes } from "react-router";

import { TooltipProvider } from "@/components/ui/tooltip";

import { DocsLayout } from "./components/DocsLayout";
import { BlockPage } from "./pages/BlockPage";
import { BlocksIndex } from "./pages/BlocksIndex";
import { BlockView } from "./pages/BlockView";
import { ComponentPage } from "./pages/ComponentPage";
import { Home } from "./pages/Home";
import { Installation } from "./pages/Installation";
import { Introduction } from "./pages/Introduction";
import { Theming } from "./pages/Theming";
import { Tokens } from "./pages/Tokens";

export function App() {
  return (
    <TooltipProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view/:slug" element={<BlockView />} />
        <Route element={<DocsLayout />}>
          <Route path="/docs" element={<Introduction />} />
          <Route path="/docs/installation" element={<Installation />} />
          <Route path="/docs/theming" element={<Theming />} />
          <Route path="/docs/tokens" element={<Tokens />} />
          <Route path="/docs/components/:slug" element={<ComponentPage />} />
          <Route path="/docs/blocks" element={<BlocksIndex />} />
          <Route path="/docs/blocks/:slug" element={<BlockPage />} />
        </Route>
      </Routes>
    </TooltipProvider>
  );
}
