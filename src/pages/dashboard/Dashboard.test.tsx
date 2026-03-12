import { screen, fireEvent } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchTasks, deleteTask } from "../../features/tasks/taskSlice";
import { renderWithProviders } from "../../test/renderWithProviders";

jest.mock("../../app/hooks");
jest.mock("../../features/tasks/taskSlice", () => ({
  fetchTasks: jest.fn(),
  deleteTask: jest.fn(),
  createTask: jest.fn(),
  updateTask: jest.fn(),
}));

const mockedDispatch = jest.fn();

describe("Dashboard", () => {
  beforeEach(() => {
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(mockedDispatch);

    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      list: [
        {
          id: 1,
          title: "Test Task",
          description: "Test Description",
          status: "todo",
        },
      ],
      loading: false,
    });
  });

  const renderComponent = () => renderWithProviders(<Dashboard />);

  test("dispatches fetchTasks on mount", () => {
    renderComponent();

    expect(mockedDispatch).toHaveBeenCalledWith(fetchTasks());
  });

  test("renders tasks", () => {
    renderComponent();

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  test("shows empty state when no tasks", () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      list: [],
      loading: false,
    });

    renderComponent();

    expect(screen.getByText(/no tasks available/i)).toBeInTheDocument();
  });

  test("dispatches deleteTask when delete clicked", () => {
    renderComponent();

    const deleteButton = screen.getByText(/delete/i);
    fireEvent.click(deleteButton);

    expect(mockedDispatch).toHaveBeenCalledWith(deleteTask(1));
  });

  test("opens modal when add task clicked", () => {
    renderComponent();

    fireEvent.click(screen.getByText(/add task/i));

    expect(screen.getByText(/create task/i)).toBeInTheDocument();
  });

  test("opens edit modal when edit clicked", () => {
    renderComponent();

    fireEvent.click(screen.getByText(/edit/i));

    expect(screen.getByText(/edit task/i)).toBeInTheDocument();
  });
});
