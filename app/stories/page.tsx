import type { Metadata } from "next";
import Stories from "../../components/Stories";

export const metadata: Metadata = {
  title: "Advisor Stories",
  description:
    "Advisor and leadership stories from D’Life — what the work looks like, in their own words.",
  alternates: { canonical: "/stories" },
  openGraph: { url: "/stories" },
};

export default function Page() {
  return <Stories />;
}
