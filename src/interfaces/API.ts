import { CreditInterface } from ".";
import { Status } from "./websocket";

export interface LoginCredential {
  username: string;
  password: string;
}

export interface ResponseLogin {
  data: {
    token: string;
    created_at: string;
  };
}

export interface Verify {
  verification_token: string;
  verification_pin: string;
}

export interface CreditResponse {
  data: CreditInterface[];
}

export type LogAuditTrail = {
  event_id: number;
  auction_id: number;
  status: Status | string;
  bid_amount: number;
};

