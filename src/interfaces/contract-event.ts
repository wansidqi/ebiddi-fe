export interface ContractEvent {
  id: null;
  url: string;
  legal_owner: {
    id: number;
    code: string;
    name: string;
  };
  contract_owner: {
    id: number;
    name: string;
  };
  purchase_price: number;
  deposit: number;
  bidder_company: any;
  created_at: string;
  event: {
    id: number;
    event_name: string;
    status: string;
    event_timestamp: string;
    updated_at: string;
    auction_house: {
      id: number;
      auctionhouse_code: string;
      auctionhouse_name: string;
      auctionhouse_address: string;
    };
  };
  item: {
    id: number;
    model: string;
    lot_no: null;
    registration_number: string;
    year: string;
    investigation_report: {
      id: number;
      general_condition: string;
      chassis_number: null;
      engine_number: null;
      mileage: string;
      transmission: string;
      expaintwork: null;
    };
  };
}
