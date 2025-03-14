import React from "react";
import { render, screen } from "@testing-library/react";
import Greeting from "../../src/pages/Greeting";
import { describe, test, expect } from "vitest";
import "@testing-library/jest-dom";

describe("Greeting", () => {
  test('顯示 "Hello, World" 當 `userName` 為空', () => {
    render(<Greeting />);
    expect(screen.getByText("Hello , World")).toBeInTheDocument();
  });

  test('顯示 "Hello, Alice" 當 `userName="Alice"`', () => {
    render(<Greeting userName="Alice" />);
    expect(screen.getByText("Hello , Alice")).toBeInTheDocument();
  });
});
