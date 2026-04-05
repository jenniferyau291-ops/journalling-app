import { useAuthStore } from "../store/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

describe("AuthStore logout", () => {
  beforeEach(() => {
    // set fake log in 
    useAuthStore.setState({ token: "testToken", user: { username: "testuser" } });
    //clears history to not impact on current test 
    jest.clearAllMocks();
  });

  it("should remove token and user from state and AsyncStorage", async () => {
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
