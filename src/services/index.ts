import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { EventService } from "./events.api";
import { ItemService } from "./items.api";
import { AuthenticationService } from "./authentication.api";
import { ProfileServices } from "./profile.api";
import { ContractService } from "./contract.api";
import { LiveService } from "./live.api";

export enum KEY {
  events = "events",
  event = "event",
  agreement = "agreement",
  item = "item",
  user = "user",
  depo_info = "depo info",
  tx = "transactions",
  contract = "contract",
  auction_item = "auction_item",
  credit = "credit",
  auctioneer = "auctioneer",
}

export function useGetQueryData<T>(key: QueryKey): T {
  return useQueryClient().getQueryData(key) as T;
}

export const useAPIServices = () => ({
  ...EventService,
  ...ItemService,
  ...AuthenticationService,
  ...ProfileServices,
  ...ContractService,
  ...LiveService,
});
