import "@/styles/globals.css";
import type { AppProps } from "next/app";

if (process.env.NODE_ENV === "development") {
  import("../mocks").then(({ setupMocks }) => {
    setupMocks();
  });
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
