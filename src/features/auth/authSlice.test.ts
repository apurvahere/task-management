import reducer, { login, logout } from "./authSlice";
import toast from "react-hot-toast";
import { saveUser } from "../../utils/storage";

jest.mock("./authService");
jest.mock("react-hot-toast");
jest.mock("../../utils/storage");

describe("authSlice", () => {
  const initialState = {
    token: null,
    isAuthenticated: false,
    loading: false,
  };

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test("should return initial state", () => {
    const state = reducer(undefined, { type: "unknown" });

    expect(state.loading).toBe(false);
    expect(state.isAuthenticated).toBe(false);
  });

  test("should handle login.pending", () => {
    const action = { type: login.pending.type };

    const state = reducer(initialState, action);

    expect(state.loading).toBe(true);
  });

  test("should handle login.fulfilled", () => {
    const payload = {
      token: "test-token",
      user: { email: "test@test.com" },
    };

    const action = {
      type: login.fulfilled.type,
      payload,
    };

    const state = reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.token).toBe("test-token");
    expect(state.isAuthenticated).toBe(true);

    expect(saveUser).toHaveBeenCalledWith({
      email: "test@test.com",
    });

    expect(toast.success).toHaveBeenCalledWith("Login successful");

    expect(localStorage.getItem("token")).toBe("test-token");
  });

  test("should handle login.rejected", () => {
    const action = {
      type: login.rejected.type,
      payload: "Invalid Credentials",
    };

    const state = reducer(initialState, action);

    expect(state.loading).toBe(false);

    expect(toast.error).toHaveBeenCalledWith("Invalid Credentials");
  });

  test("should handle logout", () => {
    const startState = {
      token: "abc123",
      isAuthenticated: true,
      loading: false,
    };

    const state = reducer(startState, logout());

    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });
});
