import { toast } from "sonner";
import { BASE_API_URL } from "@/enviroments";
import { useAuthStore } from "@/store/auth.store";
import { toastConfig } from "@/components/ui/sonner";

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const { token, setToken } = useAuthStore.getState();

  let toastId: string | number | undefined;
  let timeout: ReturnType<typeof setTimeout>;

  //  Trigger toast only if request is slow
  timeout = setTimeout(() => {
    const message = "Taking longer than expected...\nHold tight (15–50 sec)..."
    toastId = toast.loading(message,toastConfig);
  }, 3000); 

  try {
    const res = await fetch(`${BASE_API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });

    // Clear slow-toast trigger
    clearTimeout(timeout);

    // 🔐 Handle auth errors
    if (res.status === 401) {
      setToken("");
      window.location.href = "/";
    }

    if (res.status === 404) {
      throw new Error("Not found");
    }

    if (!res.ok) {
      let message = "API Error";
      try {
        const error = await res.json();
        message = error.message || message;
      } catch { }

      throw new Error(message);
    }

    const data = await res.json();

    // ✅ If toast was shown, convert it to success
    if (toastId) {
      toast.dismiss(toastId);
    }

    return data;
  } catch (err: any) {
    clearTimeout(timeout);

    // ❌ If toast was shown, update to error
    if (toastId) {
      toast.dismiss(toastId);
    }

    throw err;
  }
}