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

export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  nric: string;
  mobile_no: string;
  office_phone_no: string;
  address: string;
  state: string | null;
  postal_code: string;
  temp_password: boolean;
  user_agreement: boolean;
  created_at: string;
  role: string;
  credits: [
    {
      id: number;
      credit_id: number;
      amount: number;
      auction_house: {
        id: number;
        code: string;
        name: string;
      };
    },
    {
      id: number;
      credit_id: number;
      amount: number;
      auction_house: {
        id: number;
        code: string;
        name: string;
      };
    },
  ];
  companies: [
    {
      name: string;
      registration_no: string;
      address: string;
    },
  ];
}
