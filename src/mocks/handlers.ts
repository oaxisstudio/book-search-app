import { http, HttpResponse } from "msw";
export const handlers = [
  http.post("/api/login", async ({ request }) => {
    const body = await request.json();
    const { username, password } = body as {
      username: string;
      password: string;
    };

    if (username === "test" && password === "password") {
      return HttpResponse.json({ token: "fake-token" }, { status: 200 });
    }
    return HttpResponse.json(
      { message: "Unauthorized" },
      { statusText: "Unauthorized", status: 401 }
    );
  }),
  // 書籍検索などのエンドポイントもここに追加可能
];
