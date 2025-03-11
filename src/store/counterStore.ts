import { create } from "zustand";

// 定義 Zustand 狀態
type CounterState = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

// 建立 Zustand store
export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));
