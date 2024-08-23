export interface ReceiptInterface {
  amount: number;
  created_at: string;
  credit_id: number;
  id: number;
  user_id: number;
  reference_no: string;
  url: string;
  status: Status;
  // status: "pending" | "completed" | "failed";
}

enum Status {
  pending = 0,
  completed = 1,
  failed = 2,
}
