import { ROUTABLE_ARTICLES, type Article } from "../content/articles";
import { articleFrom } from "../content/cms/pages/articles";
import { getPublished } from "./talous";

/** The articles, each with its details and body as published in Talous CMS (articles/<slug>),
 *  over content/articles.ts. The template article isn't in the CMS. */
export async function getArticles(): Promise<Article[]> {
  return Promise.all(
    ROUTABLE_ARTICLES.map(async (a) => {
      if (a.template) return a;
      const p = await getPublished(`articles/${a.slug}`);
      return articleFrom(a, p?.content.content.find((b) => b.type === "ArticleMain")?.props);
    }),
  );
}
