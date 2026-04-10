import { BASE_API_URL } from "@/enviroments";
import { useAuthStore } from "@/store/auth.store";

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const { token, setToken } = useAuthStore.getState()
  // const token = localStorattge.getItem("token");

  const res = await fetch(`${BASE_API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  // 🔐 Handle auth errors globally
  if (res.status === 401) {
    setToken("");
    window.location.href = "/";
  }

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "API Error");
  }

  return await res.json();
}