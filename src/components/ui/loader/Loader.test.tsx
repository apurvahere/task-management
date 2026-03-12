import { render, screen } from "@testing-library/react";
import Loader from "./Loader";

jest.mock("react-loader-spinner", () => ({
  Oval: () => <div data-testid="loader-spinner" />,
}));

describe("Loader", () => {
  test("renders loader", () => {
    render(<Loader />);

    expect(screen.getByTestId("loader-spinner")).toBeInTheDocument();
  });

  test("renders with custom className", () => {
    const { container } = render(<Loader className="custom-loader" />);

    expect(container.firstChild).toHaveClass("custom-loader");
  });

  test("renders full screen loader when fullScreen is true", () => {
    const { container } = render(<Loader fullScreen />);

    expect(container.firstChild).toHaveClass("min-h-screen");
    expect(screen.getByTestId("loader-spinner")).toBeInTheDocument();
  });

  test("passes custom size and color props", () => {
    render(<Loader size={60} color="red" />);

    expect(screen.getByTestId("loader-spinner")).toBeInTheDocument();
  });
});
