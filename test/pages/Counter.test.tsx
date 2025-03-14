import React from "react";
import { render, screen } from "@testing-library/react";
import Counter from "../../src/pages/Counter";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";

import userEvent from "@testing-library/user-event";  // 🔹 模擬用戶操作（如點擊）

describe("Counter", () => {  // ✅ 描述 `Counter` 這個組件的測試案例
  it("increments counter on button click", async () => {  // ✅ 測試點擊按鈕後數值遞增

    render(<Counter />);  // 🔹 渲染 `Counter` 組件

    // 🔹 找到按鈕（按鈕的 `aria-role` 是 "button"，名稱包含 "increment"）
    const button = screen.getByRole("button", { name: /increment/i });

    // const button = screen.getByTestId("counter-button")

    // 🔹 找到顯示計數值的元素（使用 `data-testid="counter-value"`）
    const counterValue = screen.getByTestId("counter-value");

    // 🔹 初始值應該是 "0"
    expect(counterValue.textContent).toEqual("0");

    // 🔹 第一次點擊按鈕
    await userEvent.click(button);
    expect(counterValue.textContent).toEqual("1");  // 🔹 計數應變成 "1"

    // 🔹 第二次點擊按鈕
    await userEvent.click(button);
    expect(counterValue.textContent).toEqual("2");  // 🔹 計數應變成 "2"
  });
});
