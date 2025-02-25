# 会員制書籍検索アプリ 学習プログラム

## 全体プログラム概要

### 目標

- **Next.js**を使って会員制書籍検索アプリを構築する
- **Bulletproof React**のベストプラクティス（プロジェクト構造、コンポーネント設計、状態管理、テスト）を学ぶ
- **MSW**を利用してモック API（認証、検索）を構築する
- **VSCode Dev Containers**を利用して、ローカルに npm install を実行せずにコンテナ内で開発環境を整える

### 参考リンク

- [Bulletproof React リポジトリ](https://github.com/alan2207/bulletproof-react)
- [Next.js 公式ドキュメント](https://nextjs.org/docs)
- [MSW (Mock Service Worker) 公式サイト](https://mswjs.io/)
- [VSCode Dev Containers 公式ドキュメント](https://code.visualstudio.com/docs/remote/containers)

### 全体の流れと所要時間（目安）

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

---

## ステップ 1: プロジェクトのセットアップと Dev Container、MSW の準備

### 1.1 Next.js プロジェクト作成

既に `book-search-app` ディレクトリを作成済みだったので、以下のコマンドを実行してプロジェクトを初期化

```bash
cd book-search-app npx create-next-app@latest . --typescript
```

### 1.2 プロジェクト構造の構築

Bulletproof React のベストプラクティスに沿ったディレクトリ構成を作成するため、以下のシェルコマンドを実行

```bash
mkdir -p src/components src/features src/hooks src/mocks src/services src/styles src/utils
mkdir -p .devcontainer
```

ディレクトリ構成は以下の通り。

```
book-search-app/
├── public/
├── src/
│ ├── components/ # UIコンポーネント
│ ├── features/ # 機能ごとのコンポーネント・ロジック
│ ├── hooks/ # カスタムフック
│ ├── mocks/ # MSW用のモックハンドラー
│ ├── services/ # API呼び出しロジック
│ ├── styles/ # スタイルシート
│ ├── utils/ # 共通のユーティリティ関数
│ └── pages/ # Next.jsのページコンポーネント
├── .devcontainer/ # VSCode Dev Container設定
├── package.json
└── tsconfig.json
```

### 1.3 VSCode Dev Container の設定

以下のファイルを作成して、開発環境を統一。

**.devcontainer/devcontainer.json**

```json
{
  "name": "Next.js Book Search App",
  "context": "..",
  "dockerFile": "Dockerfile",
  "appPort": [3000],
  "extensions": ["dbaeumer.vscode-eslint", "esbenp.prettier-vscode"],
  "settings": {
    "terminal.integrated.shell.linux": "/bin/bash"
  }
}
```

**.devcontainer/Dockerfile**

```dockerfile
FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

```

詳細については [VSCode Dev Containers 公式ドキュメント](https://code.visualstudio.com/docs/remote/containers) をご参照ください。

### 1.4 MSW のセットアップ

MSW をインストールし、モック API を準備。

- **インストール**
  `bash npm install msw --save-dev `
- **モックハンドラーファイル**
  (`src/mocks/handlers.ts`)

  ```typescript
  import { rest } from "msw";
  export const handlers = [
    rest.post("/api/login", (req, res, ctx) => {
      const { username, password } = req.body as {
        username: string;
        password: string;
      };
      if (username === "test" && password === "password") {
        return res(ctx.status(200), ctx.json({ token: "fake-token" }));
      }
      return res(ctx.status(401), ctx.json({ message: "Unauthorized" }));
    }), // 書籍検索などのエンドポイントも追加可能です。
  ];
  ```

- **ブラウザ用セットアップ**
  (`src/mocks/browser.ts`)
  ```typescript
  import { setupWorker } from "msw";
  import { handlers } from "./handlers";
  export const worker = setupWorker(...handlers);
  ```
- **起動設定**
  (`src/mocks/index.ts`)
  ```typescript
  import { worker } from "./browser";
  export function setupMocks() {
    worker.start();
  }
  ```
- **Next.js のエントリーポイントで MSW を起動**
  (`src/pages/_app.tsx`)

  ```typescript
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
  ```

## ステップ 2: ユーザー認証の UI と基本ロジックの実装

### 2.1 ログインフォームコンポーネントの作成

Container/Presentational パターンを意識して、ログインフォームコンポーネントを作成。  
例：`src/features/auth/LoginForm.tsx`

```tsx
import React, { useState } from "react";

type LoginFormProps = {
  onLogin: (username: string, password: string) => void;
};

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">ログイン</button>
    </form>
  );
};
```

### 2.2 認証 API との接続（MSW を使用）

MSW で作成した /api/login エンドポイントに接続するため、API 呼び出し用の関数を実装。
例：src/services/auth.ts

```typescript
export async function login(username: string, password: string) {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    throw new Error("Login failed");
  }
  return response.json();
}
```

### 2.3 状態管理の導入

認証状態の管理には、React の Context API を利用したシンプルな実装例を示。
例：src/features/auth/AuthContext.tsx

```tsx
import React, { createContext, useState, useContext } from "react";

type AuthContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
```

### 2.4 ユニットテストの実装

Jest と React Testing Library を用いて、ログインフォームコンポーネントの基本的なテストを実装。
例：src/features/auth/LoginForm.test.tsx

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { LoginForm } from "./LoginForm";

test("ログインフォームの送信が正しく動作することを確認", () => {
  const handleLogin = jest.fn();
  render(<LoginForm onLogin={handleLogin} />);

  fireEvent.change(screen.getByLabelText(/username/i), {
    target: { value: "test" },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "password" },
  });
  fireEvent.click(screen.getByRole("button", { name: /ログイン/i }));

  expect(handleLogin).toHaveBeenCalledWith("test", "password");
});
```

## ステップ 3: 書籍検索機能の実装

### 3.1 検索バーコンポーネントの作成

Container/Presentational パターンを意識して、検索バーコンポーネントを作成。  
例：`src/features/books/SearchBar.tsx`

```tsx
import React, { useState } from "react";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="書籍を検索..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">検索</button>
    </form>
  );
};
```

### 3.2 書籍検索 API のモック実装（MSW）

src/mocks/handlers.ts に書籍検索用のエンドポイントを追加。

```tsx
// 既存のhandlersに追加
rest.get('/api/books', (req, res, ctx) => {
  const query = req.url.searchParams.get('q');
  if (query) {
    return res(
      ctx.status(200),
      ctx.json({ books: [{ id: 1, title: `「${query}」の本1` }, { id: 2, title: `「${query}」の本2` }] })
    );
  }
  return res(ctx.status(400), ctx.json({ message: 'Bad Request' }));
}),
```

### 3.3 検索結果表示と状態管理の実装

検索結果を表示するコンポーネントを作成。
例：src/features/books/BookSearch.tsx

```tsx
import React, { useState } from "react";
import { SearchBar } from "./SearchBar";

type Book = {
  id: number;
  title: string;
};

export const BookSearch: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setError(null);
      const response = await fetch(`/api/books?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error("検索に失敗しました");
      const data = await response.json();
      setBooks(data.books);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {error && <div style={{ color: "red" }}>{error}</div>}
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
};
```

### 3.4 統合テストで検索シナリオの確認

React Testing Library と MSW を利用して、検索機能の統合テストを実装。
例：src/features/books/BookSearch.test.tsx

```tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BookSearch } from "./BookSearch";
import { setupServer } from "msw/node";
import { handlers } from "../../mocks/handlers";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("書籍検索が正しく動作する", async () => {
  render(<BookSearch />);

  const input = screen.getByPlaceholderText("書籍を検索...");
  fireEvent.change(input, { target: { value: "React" } });
  fireEvent.submit(input);

  await waitFor(() => {
    expect(screen.getByText(/Reactの本1/)).toBeInTheDocument();
    expect(screen.getByText(/Reactの本2/)).toBeInTheDocument();
  });
});
```
