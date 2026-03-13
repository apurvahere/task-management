import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import authReducer from "../../features/auth/authSlice";
import ProtectedRoute from "./ProtectedRoute";

const renderWithStore = (
  isAuthenticated: boolean,
  children: React.ReactNode,
) => {
  const store = configureStore({
    reducer: { auth: authReducer },
    preloadedState: {
      auth: { isAuthenticated, token: "fake-token", loading: false },
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>{children}</MemoryRouter>
    </Provider>,
  );
};

describe("ProtectedRoute", () => {
  test("redirects to /login when user is not authenticated", () => {
    renderWithStore(
      false,
      <ProtectedRoute>
        <div>Secret Page</div>
      </ProtectedRoute>,
    );

    expect(screen.queryByText("Secret Page")).not.toBeInTheDocument();
  });

  test("renders children when user is authenticated", () => {
    renderWithStore(
      true,
      <ProtectedRoute>
        <div>Secret Page</div>
      </ProtectedRoute>,
    );

    expect(screen.getByText("Secret Page")).toBeInTheDocument();
  });
});
