export interface EventsInterface {
  id: number;
  status: string;
  name: string;
  event_date: string;
  reauction: any;
  auction_house: AuctionHouse;
  downloadable: Downloadable;
  inventories: InventoryInterface[];
}

export interface InventoryInterface {
  auction_id: number;
  status: string;
  lot_no: string;
  vehicle_id: number;
  legal_owner: string;
  model: string;
  year: string;
  registration_number: string;
  chasis_number: string;
  engine_number: string;
  transmission: string;
  has_registration_card: boolean;
  has_key: boolean;
  remarks: string;
  buyer_premium: number;
  reserve_price: number;
  security_deposit: number;
  vehicle_type: number;
  deposit: number;
  images: string[];
  bidder: any;
}

interface AuctionHouse {
  id: number;
  name: string;
  code: string;
  address: string;
  company_registration_number: string;
  auctioneer: Auctioneer;
}

interface Auctioneer {
  id: number;
  name: string;
  nric: string;
  license_no: string;
  license_expired: string;
}

interface Downloadable {
  url: string;
}

export interface TimeLeft {
  d?: number;
  h?: number;
  m?: number;
  s?: number;
}
