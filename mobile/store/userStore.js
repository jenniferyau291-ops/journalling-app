import { create } from "zustand";
import { API_URL } from "../constants/api";
import { useAuthStore } from "./authStore";


export const useUserStore = create((set, get) => ({
  streakCount: 0, 
  loading: false,
  refreshing: false,
  

  getStreaks: async () => {
    //get token from logged user
  const { token } = useAuthStore.getState();

  try {
    //make get request 
    const res = await fetch(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch user");

    set({streakCount: data.streakCount});



  } catch (error) {
    console.log("Get user error:", error);
    throw error;
  }
},

}));
