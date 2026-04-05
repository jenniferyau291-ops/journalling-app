import { useAuthStore } from "../store/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

describe("AuthStore logout", () => {
  beforeEach(() => {
    // Reset store state and mocks
    useAuthStore.setState({ token: "testToken", user: { username: "testuser" } });
    jest.clearAllMocks();
  });

  it("should clear token and user from state and AsyncStorage", async () => {
    // Call logout
    await useAuthStore.getState().logout();

    // Check AsyncStorage calls
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith("token");
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith("user");

    // Check store state
    const state = useAuthStore.getState();
    expect(state.token).toBeNull();
    expect(state.user).toBeNull();
  });
});
