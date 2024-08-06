export interface ReceiptInterface {
  amount: number;
  created_at: string;
  credit_id: number;
  id: number;
  user_id: number;
  reference_no: string;
  url: string;
  status: "pending" | "completed" | "failed";
}
