import { render, screen } from "@testing-library/react";
import InputField from "./InputField";

describe("InputField", () => {
  test("renders input element", () => {
    render(<InputField placeholder="Enter text" />);

    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  test("renders prefix icon when provided", () => {
    render(
      <InputField
        placeholder="test"
        prefixIcon={<span data-testid="prefix-icon">P</span>}
      />,
    );

    expect(screen.getByTestId("prefix-icon")).toBeInTheDocument();
  });

  test("renders postfix icon when provided", () => {
    render(
      <InputField
        placeholder="test"
        postfixIcon={<span data-testid="postfix-icon">S</span>}
      />,
    );

    expect(screen.getByTestId("postfix-icon")).toBeInTheDocument();
  });

  test("applies padding class when prefix icon exists", () => {
    render(<InputField placeholder="test" prefixIcon={<span>P</span>} />);

    const input = screen.getByPlaceholderText("test");

    expect(input.className).toMatch(/pl-10/);
  });

  test("applies padding class when postfix icon exists", () => {
    render(<InputField placeholder="test" postfixIcon={<span>S</span>} />);

    const input = screen.getByPlaceholderText("test");

    expect(input.className).toMatch(/pr-10/);
  });
});
