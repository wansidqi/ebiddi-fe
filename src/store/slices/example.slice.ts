import { StateCreator } from "zustand";
import { resetters } from "..";

export type Example = {};

const initialExample = {
  example: {},
};

export interface ExampleSlice {
  example: Example;
  setExampleState: (example: Partial<Example>) => void;
  resetExample: () => void;
}

export const createExampleSlice: StateCreator<
  ExampleSlice,
  [],
  [],
  ExampleSlice
> = (set) => {
  resetters.push(() => set(initialExample));

  return {
    ...initialExample,

    setExampleState: (example: Partial<Example>) => {
      set((state) => ({ example: { ...state.example, ...example } }));
    },

    resetExample: () => {
      set({ ...initialExample });
    },
  };
};
