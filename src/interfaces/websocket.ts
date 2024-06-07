// START(1), RUN(2), END(3), PAUSE(4), WITHDRAW(5), CLOSE(6), HOLD(7)
type Status =
  | "AUCTION"
  | "START"
  | "RUN"
  | "END"
  | "PAUSE"
  | "WITHDRAW"
  | "CLOSE"
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
    all: [];
    highest_amount: number;
    highest_user_id: number;
    highest_user_name: string;
  };
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
