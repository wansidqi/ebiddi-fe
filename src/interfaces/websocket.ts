import { Status } from "@/types";
import { AuctionInterface, ReauctionList } from ".";
import { BidStatus } from "@/enum";

export interface EventData {
  event_id: string;
  auction_id: string;
  status: Status;
  bid: {
    start: number;
    next: number;
    current: number;
    up: number;
  };
  countdown: number;
  bidders: {
    all: BidData[];
    highest_amount: number;
    highest_user_id: number;
    highest_user_name: string;
  };
  auction_event_id: string;
  isResume: boolean;
  auction: AuctionInterface | undefined;
  // expiryAt: string;
  holdItems: ReauctionList[];
  bidStatus: BidStatus;
}

export interface StatusData {
  channel: string;
  data: {
    total_connection: number;
    total_bidder: number;
  };
}

export interface BidData {
  user_id: number;
  name: string;
  amount: number;
}

export interface ReauctionData {
  auction_event_id?: string;
  expiryAt?: string;
  status?: Status;
  event_id?: string;
  items?: ReauctionList[];
}

export interface Subscription<T> {
  event_id: string;
  onData: (data: T) => any;
}

export interface Publication<T> {
  event_id: string;
  data: T;
}

export interface PubBid {
  event_id: string;
  auction_id: string;
  data: BidData;
}

export interface SubBid {
  event_id: string;
  auction_id: string;
  onData: (data: BidData) => any;
}
