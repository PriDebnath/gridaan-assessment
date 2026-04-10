import { toast } from "sonner";
import { apiClient } from "@/lib/apiClient";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../../store/auth.store";

export type SignUpParam = { email: string; password: string };

const signUp = (data: SignUpParam) =>
  apiClient<{ token: string }>("/api/auth/sign-up", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const useAuthSignUp = () => {
  const { setToken } = useAuthStore.getState();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data: SignUpParam) => {
      const promise = signUp(data);
      toast.promise(promise, {
        loading: "Signing up...",
        success: "Sign up successful",
        error: (err: any) => err?.message || "Something went wrong",
        position: "top-center"
      });
      const res = await promise;
      return res
    },
    onSuccess: (data) => {
      setToken(data.token);
      navigate({ to: "/" });
    },
    onError: (error) => {
      // toast.error(error?.message ? error?.message : error?.stack, {
      //   position: "top-center"
      // })
    }
  });

  return {
    ...mutation,
    signUp: mutation.mutateAsync,
  };
};