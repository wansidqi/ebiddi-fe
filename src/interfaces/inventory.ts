import { Bidder } from ".";

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
  reserve_price: number;
  deposit: number;
  buyer_premium: number;
  security_deposit: number;
  is_flat_deposit: boolean;
  is_manual_deposit: boolean;
  bid_increment: number;
  vehicle_type: number;
  images: string[];
  bidder: Bidder;
}
