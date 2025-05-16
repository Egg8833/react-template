import { useState } from "react";

export function useCounter(initValue = 0) {
  const [count, setCount] = useState(initValue);

  function increment() {
    setCount((count) => count + 1);
  }

  function decrement() {
    setCount((count) => count - 1);
  }

  function multiply(factor: number) {
    setCount((count) => count * factor);
  }

  function divide(divisor: number) {
    setCount((count) => (divisor !== 0 ? count / divisor : count));
  }

  return {
    count,
    increment,
    decrement,
    multiply,
    divide
  };
}