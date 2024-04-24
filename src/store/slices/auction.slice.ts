import { StateCreator } from "zustand";
import { resetters } from "..";
import { EventsInterface } from "@/interfaces";

export type Auctions = {
  view: "Grid" | "List";
  selectEvent: EventsInterface | null;
};

const initialAuctions = {
  auctions: {
    view: "Grid" as "Grid" | "List",
    selectEvent: null,
  },
};

export interface AuctionsSlice {
  auctions: Auctions;
  setAuctionState: (auctions: Partial<Auctions>) => void;
  resetAuction: () => void;
}

export const createItemsSlice: StateCreator<
  AuctionsSlice,
  [],
  [],
  AuctionsSlice
> = (set) => {
  resetters.push(() => set(initialAuctions));

  return {
    ...initialAuctions,

    setAuctionState: (items: Partial<Auctions>) => {
      set((state) => ({ auctions: { ...state.auctions, ...items } }));
    },

    resetAuction: () => {
      set({ ...initialAuctions });
    },
  };
};
