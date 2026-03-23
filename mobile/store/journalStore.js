import { create } from "zustand";
import { API_URL } from "../constants/api";
import { useAuthStore } from "./authStore";

export const useJournalStore = create((set, get) => ({
  journals: [],
  loading: false,
  refreshing: false,
  page: 1,
  hasMore: true,

  fetchJournals: async (pageNum = 1, refresh = false) => {
    const { token } = useAuthStore.getState();

    try {
      if (refresh) set({ refreshing: true });
      else if (pageNum === 1) set({ loading: true });

      const res = await fetch(`${API_URL}/journals?page=${pageNum}&limit=2`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch journals");

      const uniqueJournals =
        refresh || pageNum === 1
          ? data.journals
          : Array.from(new Set([...get().journals, ...data.journals].map(j => j._id)))
              .map(id => [...get().journals, ...data.journals].find(j => j._id === id));

      set({
        journals: uniqueJournals,
        hasMore: pageNum < data.totalPages,
        page: pageNum,
      });
    } catch (error) {
      console.log("Error fetching journals", error);
    } finally {
      set({ loading: false, refreshing: false });
    }
  },

  deleteJournal: async (journalId) => {
    const { token } = useAuthStore.getState();

    try {
      const res = await fetch(`${API_URL}/journals/${journalId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete journal");

      set({ journals: get().journals.filter(j => j._id !== journalId) });
    } catch (error) {
      console.log("Delete error:", error);
    }
  },

 // Update an existing journal
  updateJournal: async (journalId, { title, content, mood }) => {
    const { token } = useAuthStore.getState();
    try {
      set({ loading: true });
      const response = await fetch(`${API_URL}/journals/${journalId}`, {
        method: "PATCH", // Use PATCH for updates
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, mood }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to update journal");

      // Update journal in state
      set((state) => ({
        journals: state.journals.map((j) => (j.id === journalId ? data : j)),
      }));

      return data;
    } catch (error) {
      console.error("Error updating journal:", error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  createJournal: async (journalData) => {
    const { token } = useAuthStore.getState();

    try {
      const res = await fetch(`${API_URL}/journals`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(journalData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create journal");

      // Add the new journal to the top of the list
      set({
        journals: [data.journal, ...get().journals],
      });

      return { success: true, journal: data.journal };
    } catch (error) {
      console.log("Create journal error:", error);
      return { success: false, message: error.message };
    }
  },
  
  getJournalById: async (journalId) => {
  const { token } = useAuthStore.getState();

  try {
    const res = await fetch(`${API_URL}/journals/${journalId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch journal");

    return data.journal;
  } catch (error) {
    console.log("Get journal error:", error);
    throw error;
  }
},

}));
