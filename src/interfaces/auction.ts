import { EventsInterface, InventoryInterface } from ".";

export interface AuctionInterface extends InventoryInterface {
    meta: {
      next: number;
      prev: number;
    };
    event: EventsInterface;
  }