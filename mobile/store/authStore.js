import { create } from "zustand";
import { API_URL } from "../constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

console.log("API_URL:", API_URL);

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,
  isCheckingAuth: true,


  //register sends information to create account 

  register: async (username, email, password) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
         const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Something went wrong");

      //saves user and the token

      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);

      //update state memory 
      set({ token: data.token, user: data.user, isLoading: false });

      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: error.message };
    }
  },

  //login sends information to server 
  login: async (email, password) => {
    set({ isLoading: true });

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Something went wrong");

      //saves token and user

      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);

      set({ token: data.token, user: data.user, isLoading: false });

      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: error.message };
    }
  },


  //check if user logged in before 
   checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userJson = await AsyncStorage.getItem("user");
      const user = userJson ? JSON.parse(userJson) : null;
      // set state the token and user 
      set({ token, user });
    } catch (error) {
      console.log("Auth check failed", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  //logg out 
   logout: async () => {
    //delete token and user
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    //clears state 
    set({ token: null, user: null });
  },
}));
