import type { Metadata } from "next";
import DLife from "../components/DLife";

// Title and description inherit the defaults from the root layout; the
// homepage only needs its own canonical so "/" is unambiguous.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function Page() {
  return <DLife />;
}
