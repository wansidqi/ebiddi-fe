import { ROLE } from "../enum";

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
  role: ROLE;
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
  ]; //TODO
  companies: [
    {
      id: number;
      company_name: string;
      company_reg_no: string;
      company_address: string;
      company_post_code: string;
      company_phone_no: string;
      company_fax_no: string;
    },
  ];
}
