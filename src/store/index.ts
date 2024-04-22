import { create } from "zustand";
import { ExampleSlice, createExampleSlice } from "./slices/example.slice";

type ResetAllSlices = { resetAllSlices: () => void };

type StateType = ExampleSlice & ResetAllSlices;

export const resetters: (() => void)[] = [];

export const useBoundStore = create<StateType>()((...a) => ({
  ...createExampleSlice(...a),

  resetAllSlices: () => resetters.forEach((resetter) => resetter()),
}));
