export interface SubscribeParams<T> {
  id: string;
  channel: "event" | "bid" | "status";
  onData: (data: T) => any;
}

export interface PublishParams<T> {
  id: string;
  auction_id: string;
  channel: "bid" | "event";
  data: T;
}

export interface ChannelData {
  countdown: number;
}
