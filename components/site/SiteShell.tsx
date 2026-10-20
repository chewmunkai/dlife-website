import type { ReactNode } from "react";
import SiteShellView from "./SiteShellView";
import { getMenu } from "../../lib/menu";

/** The homepage shell: its menu and footer from Talous CMS ("Menu & footer"), the same ones the
 *  inner pages show. The browser part (the motion engine, the stylesheets) is SiteShellView. */
export default async function SiteShell({ path, children, loader }: { path: string; children: ReactNode; loader?: boolean }) {
  return (
    <SiteShellView path={path} loader={loader} menu={await getMenu()}>
      {children}
    </SiteShellView>
  );
}
