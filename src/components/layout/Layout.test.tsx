import { render, screen } from "@testing-library/react";
import Layout from "./Layout";

jest.mock("./Navbar", () => () => <div data-testid="navbar">Navbar</div>);

describe("Layout Component", () => {
  it("renders children correctly", () => {
    render(
      <Layout>
        <div data-testid="child">Hello World</div>
      </Layout>,
    );

    expect(screen.getByTestId("navbar")).toBeInTheDocument();

    expect(screen.getByTestId("child")).toHaveTextContent("Hello World");
  });

  it("has the correct default classes", () => {
    const { container } = render(
      <Layout>
        <div>Test</div>
      </Layout>,
    );

    const wrapperDiv = container.firstChild as HTMLElement;

    expect(wrapperDiv).toHaveClass(
      "flex",
      "flex-col",
      "min-h-screen",
      "bg-gray-50",
      "dark:bg-gray-900",
    );
  });
});
