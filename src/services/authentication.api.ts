import datasource from "@/datasource/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { KEY } from ".";
import {
  TOKEN,
  removeToken,
  setToken,
} from "@/datasource/localstorage.datasource";
import { LoginCredential, ResponseLogin, Verify } from "@/interfaces/API";
import { useNavigate } from "react-router-dom";

const usePostLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (body: LoginCredential) => {
      const response = await datasource({
        method: "post",
        url: "/auth/login",
        data: body,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const data = response.data as ResponseLogin;
      return data.data;
    },
    onSuccess: (data) => {
      setToken(TOKEN.auth, data.token);
      navigate("/tac");
    },
    onError: (e) => console.log(e),
  });
};

const usePostVerify = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: Verify) => {
      const response = await datasource({
        url: "/auth/verify",
        data: body,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const data = response.data;
      return data.data;
    },
    onSuccess: (data) => {
      console.log(data);
      setToken(TOKEN.user, JSON.stringify(data));
      queryClient.setQueryData([KEY.user], JSON.stringify(data));
      removeToken(TOKEN.auth);
      navigate("/events");
    },
  });
};

const useResendTAC = () => {
  return useMutation({
    mutationFn: async (data: string) => {
      const response = await datasource({
        method: "POST",
        url: "auth/pin/refresh",
        data: { verification_token: data },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      return response.data;
    },
  });
};

export const AuthenticationService = {
  usePostLogin,
  usePostVerify,
  useResendTAC,
};
