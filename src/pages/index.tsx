// src/pages/index.tsx
import { useState } from "react";
import { LoginForm } from "@/features/auth/LoginForm";

export default function Home() {
  // ログイン状態を管理するためのステート
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ログインAPIに接続する関数（ここでは MSW でモックされた /api/login を呼び出す）
  const handleLogin = async (username: string, password: string) => {
    try {
      setError(null);
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Login failed");
      }
      const data = await res.json();
      setToken(data.token);
    } catch (err: any) {
      setError(err.message);
      setToken(null);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>ログインページ</h1>
      {!token ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <div>
          <p>ログイン成功！トークン: {token}</p>
        </div>
      )}
      {error && (
        <div style={{ color: "red", marginTop: "1rem" }}>エラー: {error}</div>
      )}
    </div>
  );
}
