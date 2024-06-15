export interface Bidder {
    user_id: number;
    bid_price: string;
    total_bids: number;
    min_bid: string;
    max_bid: string;
    bidded_at: string | Date;
  }