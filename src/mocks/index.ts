import { worker } from "./browser";

export function setupMocks() {
  worker.start();
}

export async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { worker } = await import("./browser");
  return worker.start({
    onUnhandledRequest: "bypass",
  });
}

// サーバーサイドのモックは直接エクスポートしない
// テストファイルで直接serverをインポートする
