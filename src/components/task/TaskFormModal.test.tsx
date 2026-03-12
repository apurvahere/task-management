import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskFormModal from "./TaskFormModal";
import type { Task } from "../../types";

describe("TaskFormModal", () => {
  const mockSubmit = jest.fn();
  const mockCancel = jest.fn();

  const renderComponent = (editingTask?: Task) =>
    render(
      <TaskFormModal
        editingTask={editingTask as Task}
        onSubmit={mockSubmit}
        onCancel={mockCancel}
      />,
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders empty form when creating task", () => {
    renderComponent();

    expect(screen.getByPlaceholderText(/task title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/description/i)).toBeInTheDocument();
    expect(screen.getByText(/save task/i)).toBeInTheDocument();
  });

  test("renders form with existing values when editing", () => {
    const editingTask = {
      id: 1,
      title: "Existing Task",
      description: "Test description",
      status: "to-do",
    };

    renderComponent(editingTask as Task);

    expect(screen.getByDisplayValue("Existing Task")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test description")).toBeInTheDocument();
    expect(screen.getByText(/update task/i)).toBeInTheDocument();
  });

  test("shows validation errors on empty submit", async () => {
    renderComponent();

    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /save task/i }));

    expect(await screen.findByText(/title/i)).toBeInTheDocument();
  });

  test("calls onSubmit with correct values", async () => {
    renderComponent();

    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/task title/i), "New Task");

    await user.type(
      screen.getByPlaceholderText(/description/i),
      "New description",
    );

    await user.selectOptions(screen.getByRole("combobox"), "to-do");

    await user.click(screen.getByRole("button", { name: /save task/i }));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        title: "New Task",
        description: "New description",
        status: "to-do",
      });
    });
  });

  test("calls onCancel when cancel button clicked", async () => {
    renderComponent();

    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /cancel/i }));

    expect(mockCancel).toHaveBeenCalled();
  });
});
