export interface CreditInterface {
    id: number;
    auctionhouse_id: number;
    amount: number;
    auction_house: {
      id: number;
      code: string;
      name: string;
    };
  }