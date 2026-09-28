import type { Metadata } from "next";
import StudioLoader from "./StudioLoader";

// The editor surface Talous CMS frames. Never indexed; useless without a CMS ticket.
export const metadata: Metadata = { title: "Studio", robots: { index: false, follow: false } };

export default function StudioPage() {
  return <StudioLoader />;
}
