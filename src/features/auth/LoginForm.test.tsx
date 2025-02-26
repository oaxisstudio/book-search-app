import { render, screen, fireEvent } from "@testing-library/react";
import { LoginForm } from "./LoginForm";

describe("LoginForm", () => {
  it("ログインフォームの送信が正しく動作することを確認", () => {
    const handleLogin = jest.fn();
    render(<LoginForm onLogin={handleLogin} />);

    // 入力フィールドに値を入力する
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "test" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password" },
    });

    // フォームを送信する
    fireEvent.click(screen.getByRole("button", { name: /ログイン/i }));

    // handleLogin が正しく呼ばれているかを確認
    expect(handleLogin).toHaveBeenCalledWith("test", "password");
  });
});
