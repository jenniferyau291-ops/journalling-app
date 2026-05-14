import { useAuthStore } from "../store/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";


describe("log in ", () => {
  beforeEach(() => {
    useAuthStore.setState({ token: "testToken", user: { username: "testuser" } });
    jest.clearAllMocks();
  });

  //check log out remove token 

it("should remove token and user from state and AsyncStorage", async () => {
    await useAuthStore.getState().logout();

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith("token");
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith("user");

    const state = useAuthStore.getState();
    expect(state.token).toBeNull();
    expect(state.user).toBeNull();
 });

 //check login creates token 

      it("login produces the token and user", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        user: { email: "t@gmail.com" },
        token: "TestToken",
      }),
    });

    await useAuthStore.getState().login("test@test.com", "123455");

  const state = useAuthStore.getState();

    expect(state.token).toBe("TestToken");
    expect(state.user.email).toBe("t@gmail.com");
  });
});

//checkAUTH working
it("checkAuth check user and token", async () => {
  AsyncStorage.getItem.mockImplementation((key) => {
  if (key === "token") return "abc";
    if (key === "user") return JSON.stringify({ name: "test" });
  });

  await useAuthStore.getState().checkAuth();

  expect(useAuthStore.getState().token).toBe("abc");
  expect(useAuthStore.getState().user.name).toBe("test");
});