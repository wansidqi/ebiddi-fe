import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { EventService } from "./events.api";
import { ItemService } from "./items.api";
import { AuthenticationService } from "./authentication.api";

export enum KEY {
  events = "events",
  event = "event",
  item = "item",
  user = "user",
}

export function useGetQueryData<T>(key: QueryKey): T {
  return useQueryClient().getQueryData(key) as T;
}

export const useAPIServices = () => ({
  ...EventService,
  ...ItemService,
  ...AuthenticationService,
});
