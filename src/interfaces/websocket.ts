export interface SubscribeParams<T> {
  id: string;
  channel: "event" | "bid" | "status";
  onData: (data: T) => any;
}

export interface PublishBid {
  id: string;
  auction_id: string;
  data: {
    user_id: string;
    name: string;
    amount: number;
  };
}
