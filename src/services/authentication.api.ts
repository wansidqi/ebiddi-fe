import datasource from "@/datasource/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { KEY } from ".";
import { TOKEN, setToken } from "@/datasource/localstorage.datasource";
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
      });
      const data = response.data;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([KEY.user]);
      navigate("/");
    },
  });
};

export const AuthenticationService = { usePostLogin, usePostVerify };
