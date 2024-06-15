import { AuctionHouse, InventoryInterface } from ".";

export interface EventsInterface {
  id: number;
  status: string;
  name: string;
  event_date: string;
  reauction: any;
  auction_house: AuctionHouse;
  downloadable: {
    url: string;
  };
  inventories: InventoryInterface[];
}
