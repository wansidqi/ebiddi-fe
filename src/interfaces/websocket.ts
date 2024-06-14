import { AuctionInterface } from ".";

// START(1), RUN(2), END(3), PAUSE(4), WITHDRAW(5), CLOSE(6), HOLD(7)
export type Status =
  | ""
  | "SOLD"
  | "REAUCTIONLIST"
  | "REAUCTION"
  | "REAUCTIONITEM"
  | "REAUCTIONLISTUPDATE"
  | "REAUCTIONLISTUPDATETIMER"
  | "AUCTION"
  | "START"
  | "RUN"
  | "END"
  | "PAUSE"
  | "WITHDRAW"
  | "CLOSE"
  | "DISPLAY"
  | "HOLD";

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
  expiryAt: string;
  holdItems: AuctionInterface[];
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
  items?: AuctionInterface[];
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
