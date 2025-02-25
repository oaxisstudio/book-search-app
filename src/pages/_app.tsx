import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [isMockReady, setIsMockReady] = useState(false);

  useEffect(() => {
    async function init() {
      if (process.env.NODE_ENV === "development") {
        const { enableMocking } = await import("../mocks");
        await enableMocking();
      }
      setIsMockReady(true);
    }
    init();
  }, []);

  if (!isMockReady) {
    return <div>Loading...</div>;
  }

  return <Component {...pageProps} />;
}

export default MyApp;
