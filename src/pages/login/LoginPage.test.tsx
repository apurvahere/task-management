import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "./LoginPage";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { BrowserRouter } from "react-router-dom";

jest.mock("../../app/hooks");

const mockedDispatch = jest.fn();

describe("LoginPage", () => {
  beforeEach(() => {
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(mockedDispatch);

    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      loading: false,
    });
  });

  const renderComponent = () =>
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>,
    );

  test("dispatches login action on valid submit", async () => {
    renderComponent();

    const user = userEvent.setup();

    await user.type(
      screen.getByPlaceholderText(/email address/i),
      "test@example.com",
    );

    await user.type(screen.getByPlaceholderText(/password/i), "123456");

    await user.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(mockedDispatch).toHaveBeenCalled();
    });
  });

  test("shows validation errors on empty submit", async () => {
    renderComponent();

    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/password is required/i),
    ).toBeInTheDocument();
  });

  test("dispatches login action on valid submit", async () => {
    renderComponent();

    const user = userEvent.setup();

    await user.type(
      screen.getByPlaceholderText(/email address/i),
      "test@example.com",
    );

    await user.type(screen.getByPlaceholderText(/password/i), "123456");

    await user.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(mockedDispatch).toHaveBeenCalled();
    });
  });
});
