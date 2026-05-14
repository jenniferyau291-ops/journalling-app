import { create } from "zustand";
import { API_URL } from "../constants/api";
import { useAuthStore } from "./authStore";


export const useUserStore = create((set, get) => ({
  streakCount: 0, 
  loading: false,
  refreshing: false,
  aiPreferences: {
    aiSummary: false,
    aiPrompts: false,
  },
  

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
    //debug
    console.log("backend:", data.streakCount);
    if (!res.ok) throw new Error(data.message || "Failed to fetch user");

    set({streakCount: data.streakCount});



  } catch (error) {
    console.log("Get user error:", error);
    throw error;
  }
},



//user preference 
updatePreferences: async (updates) => {
    const { token } = useAuthStore.getState();

    try {
      const res = await fetch(`${API_URL}/users/preferences`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      // update
      set({
  aiPreferences: {
    aiSummary: data.aiPreferences.aiSummary,
    aiPrompts: data.aiPreferences.aiPrompts,
  },
});

    } catch (error) {
      console.log("Update preferences error:", error);
      throw error;
    }
  },




 generateAIPrompts: async () => {
  const { token } = useAuthStore.getState();

  const res = await fetch(`${API_URL}/ai/aiGenerate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const text = await res.text()
  //debug
  console.log("response:", text);

  let data;

  try {
    data = JSON.parse(text); 
  } catch (error) {
    console.log(":", text);
    throw new Error("Backend did not return anything");
  }

  if (!res.ok) throw new Error(data.error);

  return data.description;
},
}))