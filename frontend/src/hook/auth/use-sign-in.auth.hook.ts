import { apiClient } from "@/lib/apiClient";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../../store/auth.store";

export type SignInParam = { email: string; password: string }

const signIn = (data: SignInParam) =>
  apiClient<{ token: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  })

export const useAuthSignIn = () => {
  const { setToken } = useAuthStore();
  const navigate = useNavigate();
  const signInMutation = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      setToken(data.token);
      navigate({ to: "/" });
    },
  });
  return {
    ...signInMutation,
    signIn: signInMutation.mutateAsync,
  };
};