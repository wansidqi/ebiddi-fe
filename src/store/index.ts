import { create } from "zustand";
import { ExampleSlice, createExampleSlice } from "./slices/example.slice";
import {
  AuctionsSlice as AuctionSlice,
  createItemsSlice as createAuctionSlice,
} from "./slices/auction.slice";

type ResetAllSlices = { resetAllSlices: () => void };

type StateType = ExampleSlice & AuctionSlice & ResetAllSlices;

export const resetters: (() => void)[] = [];

export const useAuctionStore = create<StateType>()((...a) => ({
  ...createExampleSlice(...a),
  ...createAuctionSlice(...a),

  resetAllSlices: () => resetters.forEach((resetter) => resetter()),
}));
