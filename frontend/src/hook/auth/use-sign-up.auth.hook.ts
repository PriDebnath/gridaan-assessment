import { toast } from "sonner";
import { apiClient } from "@/lib/apiClient";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../../store/auth.store";

export type SignUpParam = { email: string; password: string }

const signUp = (data: SignUpParam) => {
  const response = apiClient<{ token: string }>("/api/auth/sign-up", {
    method: "POST",
    body: JSON.stringify(data),
  })
  return response
}

export const useAuthSignUp = () => {
  const { setToken } = useAuthStore.getState();
  const navigate = useNavigate();
  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      setToken(data.token);
      navigate({ to: "/" });
    },
    onError: (error) => {
      toast.error(error?.message ? error?.message : error?.stack, {
        position: "top-center"
      })
    }
  });
  return {
    ...signUpMutation,
    signUp: signUpMutation.mutateAsync,
  };
};