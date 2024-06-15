import { Auctioneer } from ".";

export interface AuctionHouse {
    id: number;
    name: string;
    code: string;
    address: string;
    company_registration_number: string;
    auctioneer: Auctioneer;
  }