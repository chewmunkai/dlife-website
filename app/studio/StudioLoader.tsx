"use client";

import dynamic from "next/dynamic";

// Puck is loaded only here, client-side, so it never reaches the public site's bundles.
const Studio = dynamic(() => import("./Studio"), { ssr: false, loading: () => <p style={{ padding: 24 }}>Loading editor…</p> });

export default function StudioLoader() {
  return <Studio />;
}
