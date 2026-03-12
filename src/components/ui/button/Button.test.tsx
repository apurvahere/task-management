import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  test("renders button with children", () => {
    render(<Button>Click Me</Button>);

    expect(screen.getByRole("button")).toHaveTextContent("Click Me");
  });

  test("applies primary variant by default", () => {
    render(<Button>Primary</Button>);

    const button = screen.getByRole("button");

    expect(button).toHaveClass("bg-blue-500");
  });

  test("applies secondary variant", () => {
    render(<Button variant="secondary">Secondary</Button>);

    const button = screen.getByRole("button");

    expect(button).toHaveClass("bg-gray-200");
  });

  test("applies danger variant", () => {
    render(<Button variant="danger">Delete</Button>);

    const button = screen.getByRole("button");

    expect(button).toHaveClass("bg-red-500");
  });

  test("shows loading state", () => {
    render(<Button loading>Submit</Button>);

    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("disables button when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);

    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("renders prefix and postfix icons", () => {
    render(
      <Button
        prefixIcon={<span data-testid="prefix">P</span>}
        postfixIcon={<span data-testid="postfix">S</span>}
      >
        Button
      </Button>,
    );

    expect(screen.getByTestId("prefix")).toBeInTheDocument();
    expect(screen.getByTestId("postfix")).toBeInTheDocument();
  });
});
