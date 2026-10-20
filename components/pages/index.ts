import type { ComponentType } from "react";
import { FilmReel, FilmsPreview, PageBand, PageBar, PageClosing, PageFaq, PageHero, PageIdeas } from "./common";
import { ResourcesArticles, ResourcesEvents } from "./resources";
import { ContactReach } from "./contact";
import { PolicyPoints, PolicySteps } from "./policy";

/** Every inner-page section Talous CMS can place, by block type (content/cms/pages/index.ts). */
export const PAGE_SECTIONS = {
  PageHero,
  PageBand,
  PageClosing,
  FilmReel,
  FilmsPreview,
  ResourcesArticles,
  ResourcesEvents,
  ContactReach,
  PageBar,
  PageIdeas,
  PageFaq,
  PolicyPoints,
  PolicySteps,
} as unknown as Record<string, ComponentType<Record<string, unknown>>>;
