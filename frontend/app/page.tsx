"use client";

import dynamic from "next/dynamic";

// Dynamic import with SSR disabled to prevent hydration errors for Web Audio API / particles canvas
const App = dynamic(() => import("../components/App"), { ssr: false });

export default function Home() {
  return <App />;
}
