import { worker } from "./browser";

export function setupMocks() {
  worker.start();
}

export async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  return worker.start({
    onUnhandledRequest: "bypass",
  });
}

// テスト・サーバー環境用
export { server } from "./server";
