import type { ReactNode } from "react";
import ShellView from "./ShellView";
import { getMenu } from "../../lib/menu";

/** The page shell for the new design: its menu and footer from Talous CMS ("Menu & footer"),
 *  around the page. The browser part (the menu's open state, the stylesheets) is ShellView. */
export default async function Shell({ children }: { children: ReactNode }) {
  return <ShellView menu={await getMenu()}>{children}</ShellView>;
}
