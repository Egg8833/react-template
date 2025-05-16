// import { useCounter } from "@/hooks/useCounter";
import { useCounterStore } from "@/store/counterStore";


export default function Counter() {

  const count = useCounterStore(state => state.count);
  const increment = useCounterStore(state => state.increment);
  const decrement = useCounterStore(state => state.decrement);
  return (
    <div>
      <h1 data-test-id="counter-value">{count}</h1> {/* 用於測試識別計數值 */}
      <button onClick={decrement}>Decrement</button>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
