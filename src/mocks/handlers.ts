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
  http.get("/api/books", async ({ request }) => {
    const query = new URL(request.url).searchParams.get("q");
    if (query) {
      return HttpResponse.json(
        {
          books: [
            { id: 1, title: `「${query}」の本1` },
            { id: 2, title: `「${query}」の本2` },
          ],
        },
        { status: 200 }
      );
    }
    return HttpResponse.json(
      { message: "Bad Request" },
      { statusText: "Bad Request", status: 400 }
    );
  }),
];
