This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

このプロジェクトは、リモートコンテナでの開発を前提としている。
VSCode の Remote Containers 拡張をインストールし、VSCode の左下の「＞＜」アイコン　または、コマンドパレット（Ctrl+Shift+P または Cmd+Shift+P）から「Remote-Containers: Reopen in Container」を選んで、プロジェクトをコンテナ内で再オープンする。

### アプリケーションの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて、結果を確認する。

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

# 全体プログラム概要

## 目標

- **Next.js**を使って会員制書籍検索アプリを構築する
- **Bulletproof React**のベストプラクティス（プロジェクト構造、コンポーネント設計、状態管理、テスト）を学ぶ
- **MSW**を利用してモック API（認証、検索）を構築する
- **VSCode Dev Containers**を利用して、ローカルに npm install を実行せずにコンテナ内で開発環境を整える

## 参考リンク

- [Bulletproof React リポジトリ](https://github.com/alan2207/bulletproof-react)
- [Next.js 公式ドキュメント](https://nextjs.org/docs)
- [MSW (Mock Service Worker) 公式サイト](https://mswjs.io/)
- [VSCode Dev Containers 公式ドキュメント](https://code.visualstudio.com/docs/remote/containers)

## 全体の流れと所要時間（目安）

1. **ステップ 1: プロジェクトのセットアップと Dev Container、MSW の準備**

   - Next.js プロジェクトの初期作成（TypeScript 採用）
   - Bulletproof React の構造に沿ったディレクトリ設計
   - VSCode の Dev Container 設定の追加（Dockerfile、devcontainer.json の作成）
   - MSW のインストールとセットアップ（モックハンドラーの作成）  
     **所要時間:** 約 1 ～ 1.5 時間

2. **ステップ 2: ユーザー認証の UI と基本ロジックの実装**

   - ログインフォームコンポーネントの作成（Container/Presentational パターンを意識）
   - 認証 API への接続を MSW でモック（ログイン成功・失敗のシナリオを実装）
   - 状態管理（Context API、Recoil、Zustand などのいずれか）を導入
   - エラーハンドリングと基本的なユニットテスト（Jest、React Testing Library など）  
     **所要時間:** 約 1.5 ～ 2 時間

3. **ステップ 3: 書籍検索機能の実装**
   - 検索バーコンポーネントの作成（Container/Presentational パターンを意識）
   - 書籍検索 API のモック（MSW でハンドラー追加）
   - 検索結果の表示、エラーハンドリング、状態管理の実装
   - 統合テストで実際の検索シナリオの確認  
     **所要時間:** 約 1.5 ～ 2 時間
