import { create } from "zustand";
import { API_URL } from "../constants/api";
import { useAuthStore } from "./authStore";
import { useUserStore } from "./userStore";


export const useJournalStore = create((set, get) => ({
  journals: [],
  loading: false,
  refreshing: false,
  page: 1,
  hasMore: true,
  moods:[],


  //get page num which is default to 1 and defailt to scrolling 
  fetchJournals: async (pageNum = 1, refresh = false) => {
    //read token from logged in user 
    const { token } = useAuthStore.getState();

    try {
      //set as true if refreshing and show refreshing
      if (refresh) set({ refreshing: true });
      // if page num only one then show loading 
      else if (pageNum === 1) set({ loading: true });
      
//calls server to get journal and add the token 
      const res = await fetch(`${API_URL}/journals?page=${pageNum}&limit=2`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch journals");
      //varibale to store list of journals fetched 
      const uniqueJournals =

      //if refreshing or page on to replace new journals
        refresh || pageNum === 1
          ? data.journals
          : Array.from(new Set([...get().journals, ...data.journals].map(j => j._id))) // get old and new journals
              .map(id => [...get().journals, ...data.journals].find(j => j._id === id));// map ids to journal and remove duplicates

              //update store state current page and if more to load 
      set({
        journals: uniqueJournals,
        hasMore: pageNum < data.totalPages,
        page: pageNum,
      });
    } catch (error) {
      console.log("Error fetching journals", error);
    } finally {
      set({ loading: false, refreshing: false }); //stop loading 
    }
  },

  deleteJournal: async (journalId) => {
    //read token from logged user 
    const { token } = useAuthStore.getState();

    try {
      //calls server delete 
      const res = await fetch(`${API_URL}/journals/${journalId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }, //add token 
      });

      if (!res.ok) throw new Error("Failed to delete journal");

      //update state 
      set({ journals: get().journals.filter(j => j._id !== journalId) }); // get all journals and remove the ones deleted
    } catch (error) {
      console.log("Delete error:", error);
    }
  },

 // Update an existing journal
  updateJournal: async (journalId, { title, content, mood }) => {
    //get token from logged user
    const { token } = useAuthStore.getState();
    try {
      set({ loading: true });
      //calls server to update
      const response = await fetch(`${API_URL}/journals/${journalId}`, {
        method: "PATCH", // Use PATCH for updates
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, mood }), //sends updated information 
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to update journal");

      // Update journal in state
      set((state) => ({
        journals: state.journals.map((j) => (j.id === journalId ? data : j)), // get journals go through each one and get the updated journal information 
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
    //get token from logged user 
    const { token } = useAuthStore.getState();

    //calls sever to create journal 
    try {
      const res = await fetch(`${API_URL}/journals`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(journalData), //sends data to server 
      });

      const data = await res.json();
    
      if (!res.ok) throw new Error(data.message || "Failed to create journal");

      // Add the new journal to the top of the list
      set({
        journals: [data.journal, ...get().journals],
      });
       useUserStore.setState({ 
  streakCount: data.streakCount, //update streak count in user store 
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
    //get request to server and sends token 
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
fetchMoods: async () => {
    //read token from logged in user 
    const { token } = useAuthStore.getState();

    try {

//calls server to get mood and add the token 
      const res = await fetch(`${API_URL}/journals/mood`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch mood data");
      
      set({
       moods: data.moods
      });
    } catch (error) {
      console.log("Error fetching mood data", error);
    } 
  };


