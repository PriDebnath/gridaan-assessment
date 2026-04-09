import { apiClient } from "@/lib/apiClient";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../../store/auth.store";

type Param = { email: string; password: string }

const signUp = (data:Param ) => {
  const response =    apiClient<{ token: string }>("/api/auth/sign-up", {
    method: "POST",
    body: JSON.stringify(data),
  })
  return response
}

export const useAuthSignUp = () => {
  const {setToken} = useAuthStore();
  const navigate = useNavigate();
  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      setToken(data.token);
      navigate({ to: "/"});
    },
  });
  return {
    signUp: signUpMutation.mutateAsync,
  };
};