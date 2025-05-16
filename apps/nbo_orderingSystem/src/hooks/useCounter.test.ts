import { renderHook, act } from "@testing-library/react";
import {useCounter} from "./useCounter";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";

// import userEvent from "@testing-library/user-event";

describe("Counter", () => {
  it("init value is 5", () => {
    const { result } = renderHook(() => useCounter(5));
    expect(result.current.count).toBe(5);
  })

  it("increment", () => {
    const { result } = renderHook(() => useCounter(0));
    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    })

    expect(result.current.count).toBe(1);

    act(() => {
      result.current.increment();
    })

    expect(result.current.count).toBe(2);
  })
  it("decrement", () => {
    const { result } = renderHook(() => useCounter(0));
    expect(result.current.count).toBe(0);

    act(() => {
      result.current.decrement();
    })

    expect(result.current.count).toBe(-1);

    act(() => {
      result.current.decrement();
    })

    expect(result.current.count).toBe(-2);
  })

  it("multiply", () => {
    const { result } = renderHook(() => useCounter(2));
    expect(result.current.count).toBe(2);

    act(() => {
      result.current.multiply(3);
    });

    expect(result.current.count).toBe(6);

    act(() => {
      result.current.multiply(0);
    });

    expect(result.current.count).toBe(0);
  });

  it("divide", () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);

    act(() => {
      result.current.divide(2);
    });

    expect(result.current.count).toBe(5);

    act(() => {
      result.current.divide(0);
    });

    expect(result.current.count).toBe(5); // Division by zero should not change the count
  });
});
