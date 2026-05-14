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
  

  fetchUser: async () => {
    //get token from logged user
  const { token } = useAuthStore.getState();
  if (!token) {
  throw new Error("User not authenticated");
}

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

    set({streakCount: data.streakCount,
     aiPreferences: data.aiPreferences,

  })
  } catch (error) {
    console.log("Get user error:", error);
    throw error;
  }
},



//user preference patch request
updatePreferences: async (updates) => {
    const { token } = useAuthStore.getState();
    if (!token) {
  throw new Error("User not authenticated");
}

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

  await get().fetchUser();
    } catch (error) {
      console.log("Update preferences error:", error);
      throw error;
    }
  },


//post request 

 generateAIPrompts: async () => {

  const { token } = useAuthStore.getState();

  if (!token) {
  throw new Error("User not authenticated");
}
  
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

  if (!res.ok) {return {
        success: false,
        data: [],
        error: "Request failed",
      };
    }

  return data.description;
},
}))