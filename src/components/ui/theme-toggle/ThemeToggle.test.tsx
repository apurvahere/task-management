import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../../../hooks/useTheme";

jest.mock("../../../hooks/useTheme");

describe("ThemeToggle", () => {
  const toggleTheme = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders light theme (sun icon)", () => {
    (useTheme as jest.Mock).mockReturnValue({
      isDark: false,
      toggleTheme,
    });

    const { container } = render(<ThemeToggle />);

    const button = screen.getByRole("button");

    expect(button).toHaveClass("bg-blue-400");
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  test("renders dark theme (moon icon)", () => {
    (useTheme as jest.Mock).mockReturnValue({
      isDark: true,
      toggleTheme,
    });

    const { container } = render(<ThemeToggle />);

    const button = screen.getByRole("button");

    expect(button).toHaveClass("bg-gray-900");
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  test("calls toggleTheme on click", () => {
    (useTheme as jest.Mock).mockReturnValue({
      isDark: false,
      toggleTheme,
    });

    render(<ThemeToggle />);

    fireEvent.click(screen.getByRole("button"));

    expect(toggleTheme).toHaveBeenCalled();
  });
});
