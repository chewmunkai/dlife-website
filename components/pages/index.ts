import type { ComponentType } from "react";
import { FilmReel, FilmsPreview, PageBand, PageBar, PageCardsBand, PageClosing, PageFaq, PageHero, PageIdeas } from "./common";
import { ResourcesArticles, ResourcesEvents } from "./resources";
import { ContactReach } from "./contact";
import { PolicyPoints, PolicySteps } from "./policy";
import { CareersGrowth, CareersQualities } from "./careers";
import {
  PageCreed,
  PageEvents,
  PageGate,
  PageHolds,
  PageIndex,
  PageLinkCards,
  PageMissionVision,
  PageProfile,
  PageRecord,
  PageSignup,
  PageSplitList,
  PageStatement,
  PageTrio,
  PageWhoGrid,
  PageYearMap,
} from "./sections";
import { PageMoments, PageSaid, PageStepsPanel } from "./solution";
import { LegalBody } from "./legal";
import { ArticleMain, ArticleMore } from "./article";

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
  PageCardsBand,
  CareersGrowth,
  CareersQualities,
  PageStatement,
  PageCreed,
  PageIndex,
  PageYearMap,
  PageGate,
  PageHolds,
  PageMissionVision,
  PageProfile,
  PageSplitList,
  PageRecord,
  PageLinkCards,
  PageTrio,
  PageWhoGrid,
  PageEvents,
  PageSignup,
  PageMoments,
  PageStepsPanel,
  PageSaid,
  LegalBody,
  ArticleMain,
  ArticleMore,
} as unknown as Record<string, ComponentType<Record<string, unknown>>>;
