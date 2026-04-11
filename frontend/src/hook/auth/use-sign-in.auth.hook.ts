import { toast } from "sonner";
import { apiClient } from "@/lib/apiClient";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../../store/auth.store";
import { toastConfig } from "@/components/ui/sonner";

export type SignInParam = { email: string; password: string }

const signIn = (data: SignInParam) =>
  apiClient<{ token: string }>("/api/auth/sign-in", {
    method: "POST",
    body: JSON.stringify(data),
  })

export const useAuthSignIn = () => {
  const { setToken } = useAuthStore.getState();
  const navigate = useNavigate();
  const signInMutation = useMutation({
    mutationFn: async (data: SignInParam) => {
      const promise = signIn(data);
      toast.promise(promise, {
                ...toastConfig,
        loading: "Signing in...",
        success: "Sign In successful",
        error: (err: any) => err?.message || "Something went wrong",
      });
      const res = await promise;
      return res
    },
    onSuccess: (data) => {
      setToken(data.token);
      navigate({ to: "/" });
      // toast.success("Sign up successful",   toastConfig)
    },
    onError: (error) => {
      // toast.error(error?.message ? error?.message : error?.stack, {
        // position: toastConfig.position
      // })
    }
  });
  return {
    ...signInMutation,
    signIn: signInMutation.mutateAsync,
  };
};