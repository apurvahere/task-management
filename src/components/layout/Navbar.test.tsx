import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./Navbar";
import { useAppDispatch } from "../../app/hooks";
import * as storage from "../../utils/storage";

jest.mock("../../app/hooks", () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock("../../features/auth/authSlice", () => ({
  logout: jest.fn(() => ({ type: "auth/logout" })),
}));

describe("Navbar Component", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    jest.spyOn(storage, "loadUser").mockReturnValue({ email: "test@test.com" });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders logo and theme toggle", () => {
    render(<Navbar />);

    expect(screen.getByText(/TaskList/i)).toBeInTheDocument();
    expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
  });

  it("renders user menu when user exists", () => {
    render(<Navbar />);

    const userButton = screen.getByTestId("user-button");
    expect(userButton).toBeInTheDocument();
  });

  it("opens and closes user dropdown on click", () => {
    render(<Navbar />);

    const userButton = screen.getByTestId("user-button");

    expect(screen.queryByText("test@test.com")).not.toBeInTheDocument();

    fireEvent.click(userButton);
    expect(screen.getByText("test@test.com")).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();

    fireEvent.click(userButton);
    expect(screen.queryByText("test@test.com")).not.toBeInTheDocument();
  });

  it("dispatches logout when logout button is clicked", () => {
    render(<Navbar />);
    const userButton = screen.getByTestId("user-button");

    fireEvent.click(userButton);
    const logoutButton = screen.getByText(/Logout/i);

    fireEvent.click(logoutButton);
    expect(mockDispatch).toHaveBeenCalledWith({ type: "auth/logout" });
  });
});
