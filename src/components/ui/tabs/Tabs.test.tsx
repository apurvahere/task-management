import { render, screen, fireEvent } from "@testing-library/react";
import Tabs from "./Tabs";

describe("Tabs", () => {
  const tabs = [
    { label: "Todo", value: "todo" },
    { label: "In Progress", value: "inprogress" },
    { label: "Done", value: "done" },
  ];

  const onChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders all tabs", () => {
    render(<Tabs tabs={tabs} activeTab="todo" onChange={onChange} />);

    expect(screen.getByText("Todo")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
  });

  test("applies active tab styling", () => {
    render(<Tabs tabs={tabs} activeTab="todo" onChange={onChange} />);

    const activeTab = screen.getByText("Todo");

    expect(activeTab).toHaveClass("border-blue-500");
  });

  test("calls onChange when tab is clicked", () => {
    render(<Tabs tabs={tabs} activeTab="todo" onChange={onChange} />);

    fireEvent.click(screen.getByText("Done"));

    expect(onChange).toHaveBeenCalledWith("done");
  });
});
