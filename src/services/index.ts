import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { EventService } from "./events.api";
import { ItemService } from "./items.api";
import { AuthenticationService } from "./authentication.api";
import { ProfileServices } from "./profile.api";
import { ContractService } from "./contract.api";
import { AuctionService } from "./auction.api";
import { ReauctionsServices } from "./reauction.api";

export enum KEY {
  events = "events",
  event = "event",
  agreement = "agreement",
  item = "item",
  user = "user",
  depo_info = "depo info",
  tx = "transactions",
  contract = "contract",
  auction = "auction",
  credit = "credit",
  auctioneer = "auctioneer",
  reauction = "reauction",
  receipt = "receipt",
  reauctions_status = "reauctions_status",
  reauctions_holdItem = "reauctions_holdItem",
}

/* 
  const queryKey = [KEY.auction, auctionId];
  const data = useGetQueryData<T>(queryKey);
*/
export function useGetQueryData<T>(key: QueryKey): T {
  return useQueryClient().getQueryData(key) as T;
}

export const useAPIServices = () => ({
  ...EventService,
  ...ItemService,
  ...AuthenticationService,
  ...ProfileServices,
  ...ContractService,
  ...AuctionService,
  ...ReauctionsServices,
});
