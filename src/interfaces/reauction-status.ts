export interface ReauctionStatus {
  id: number;
  event_id: {
    event_id: number;
    name: string;
  };
  expiry_at: string;
}
