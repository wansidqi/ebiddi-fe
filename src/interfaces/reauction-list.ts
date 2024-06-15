export interface ReauctionList {
  auction_event_id: number;
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
  is_flat_deposit: boolean;
  is_manual_deposit: boolean;
  vehicle_type: number;
  deposit: number;
  images: string[];
}
