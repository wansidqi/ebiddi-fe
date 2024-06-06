import { CreditInterface } from ".";

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
