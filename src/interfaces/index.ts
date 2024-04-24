export interface EventsInterface {
  id: any;
  name: string;
  date: string;
  time: string;
  location: string;
  hoster: string;
  auctioner: string;
  live: Date;
  auctionItems: ItemsInterface[];
}

export interface ItemsInterface {
  lot: string;
  legalOwner: string;
  registrationNo: string;
  model: string;
  yearManufacture: number;
  reservedPrice: string;
  report: any;
  engineNumber: string;
  registrationCard: boolean;
  hasKey: boolean;
  transmissionType: string;
  chasisNumber: string;
  remarks: string;
  img: string[];
}

export interface TimeLeft {
  d?: number;
  h?: number;
  m?: number;
  s?: number;
}
