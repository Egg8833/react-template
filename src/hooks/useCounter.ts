import { useState } from "react";

export function useCounter(initValue = 0) {
  const [count, setCount] = useState(initValue);

  function increment() {
    setCount((count) => count + 1);
  }

  function decrement() {
    setCount((count) => count - 1);
  }

  return {
    count,
    increment,
    decrement
   };
}