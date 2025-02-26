// src/mocks/server.ts
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// MSWのサーバーをセットアップ
export const server = setupServer(...handlers);
