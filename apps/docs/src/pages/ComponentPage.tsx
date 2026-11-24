import { Navigate, useParams } from "react-router";

import { InstallCommand } from "../components/InstallCommand";
import { Preview } from "../components/Preview";
import { getComponent } from "../examples";
import { installCommand } from "../lib/site";

export function ComponentPage() {
  const { slug } = useParams();
  const doc = slug ? getComponent(slug) : undefined;
  if (!doc) return <Navigate to="/docs/components/button" replace />;

  return (
    <article className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight">{doc.title}</h1>
      <p className="mt-3 text-muted-foreground">{doc.description}</p>
      <div className="mt-6">
        <InstallCommand command={installCommand(doc.item)} />
      </div>
      <div className="mt-8">
        <Preview preview={doc.preview} code={doc.code} />
      </div>
    </article>
  );
}
