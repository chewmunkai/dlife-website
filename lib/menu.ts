import { MENU_DOCUMENT, menuFrom, type Menu } from "../content/cms/menu";
import { getPublished, sectionsFromPublished } from "./talous";

/** The menu and footer as published in Talous CMS ("Menu & footer"), over today's. */
export async function getMenu(): Promise<Menu> {
  return menuFrom(sectionsFromPublished(await getPublished("menu"), MENU_DOCUMENT.content));
}
