const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // next.config.jsとpackage.jsonがあるディレクトリ
  dir: "./",
});

// Jestのカスタム設定
/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-fixed-jsdom",
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  moduleNameMapper: {
    // エイリアス設定
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  // 必要に応じてtransformIgnorePatternsを変更
  transformIgnorePatterns: ["/node_modules/(?!(@testing-library|msw)/)"],
};

// createJestConfigでNext.js用の設定を反映
module.exports = createJestConfig(customJestConfig);
