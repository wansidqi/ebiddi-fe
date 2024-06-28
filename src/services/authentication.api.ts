import datasource from "@/datasource/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { KEY } from ".";
import {
  TOKEN,
  removeToken,
  setToken,
} from "@/datasource/sessionStorage.datasource";
import { LoginCredential, ResponseLogin, Verify } from "@/interfaces/API";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "@/Context";

const usePostLogin = () => {
  const navigate = useNavigate();
  const { setAlert, setIsTACCooldown } = useStoreContext();

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
      setIsTACCooldown(true);
      setAlert({
        messsage: "Login Success",
        showAlert: true,
        isSuccess: true,
      });
    },
    onError: (e) => {
      setAlert({
        messsage: "Incorrect Password, Please try again.",
        showAlert: true,
        isSuccess: false,
      });
      console.log(e);
    },
  });
};

const usePostLogout = () => {
  const { USER, SET_USER } = useStoreContext();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const response = await datasource({
        method: "post",
        url: `/profile/${USER?.id}/logout`,
      });
      return response.data;
    },
    onSuccess: () => {
      SET_USER(null);
      removeToken(TOKEN.user);
      navigate("/login");
    },
  });
};

const usePostVerify = () => {
  const { SET_USER, setAlert } = useStoreContext();
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
      SET_USER(data);
      setToken(TOKEN.user, JSON.stringify(data));
      queryClient.setQueryData([KEY.user], JSON.stringify(data));
      removeToken(TOKEN.auth);
      navigate("/events");
    },
    onError: (_) => {
      setAlert({ messsage: "Invalid TAC", showAlert: true, isSuccess: false });
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
  usePostLogout,
};
