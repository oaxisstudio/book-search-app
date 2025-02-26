// jest.setup.js
require("@testing-library/jest-dom");

// MSWのモックサーバーをテスト環境で設定
try {
  const { server } = require("./src/mocks/server");
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
} catch (error) {
  console.warn("MSW server setup failed:", error);
}
