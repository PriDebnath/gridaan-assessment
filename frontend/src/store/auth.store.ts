
import { create } from "zustand"
import { persist } from "zustand/middleware"

type Store = {
    token: string;
    setToken: (token: string) => void;
}

const store = create<Store>()

export const useAuthStore = store(
    persist(
        (set) => ({
            token: "",
            setToken: (token: string) => set({ token: token })
        }),
        {
            name: "token"
        })
)
