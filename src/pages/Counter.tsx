import { useCounter } from "@/hooks/useCounter";

export default function Counter() {
  const { count, increment, decrement } = useCounter(0);

  return (
    <div>
      <h1 data-test-id="counter-value">{count}</h1> {/* 用於測試識別計數值 */}
      <button onClick={decrement}>Decrement</button>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
