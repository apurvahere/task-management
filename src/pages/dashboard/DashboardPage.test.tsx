import { render, screen, fireEvent } from "@testing-library/react";
import DashboardPage from "./DashboardPage";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteTask, fetchTasks } from "../../features/tasks/taskSlice";

jest.mock("../../app/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock("../../features/tasks/taskSlice", () => ({
  fetchTasks: jest.fn(() => ({ type: "tasks/fetchTasks" })),
  createTask: jest.fn((payload) => ({ type: "tasks/createTask", payload })),
  deleteTask: jest.fn((id) => ({ type: "tasks/deleteTask", payload: id })),
  updateTask: jest.fn((payload) => ({ type: "tasks/updateTask", payload })),
}));

const mockedDispatch = jest.fn();

const mockTasks = [
  {
    id: 1,
    title: "Test Task",
    description: "Test description",
    status: "todo",
  },
  {
    id: 2,
    title: "Another Task",
    description: "Another description",
    status: "in-progress",
  },
];

const renderComponent = () => {
  render(<DashboardPage />);
};

describe("DashboardPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useAppDispatch as jest.Mock).mockReturnValue(mockedDispatch);

    (useAppSelector as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        tasks: {
          list: mockTasks,
          loading: false,
        },
      }),
    );
  });

  test("renders dashboard title", () => {
    renderComponent();

    expect(screen.getByText(/task dashboard/i)).toBeInTheDocument();
  });

  test("dispatches fetchTasks on mount", () => {
    renderComponent();

    expect(mockedDispatch).toHaveBeenCalledWith(fetchTasks());
  });

  test("renders tasks", () => {
    renderComponent();

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("Another Task")).toBeInTheDocument();
  });

  test("shows task description", () => {
    renderComponent();

    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  test("filters tasks when switching tabs", () => {
    renderComponent();

    const tabs = screen.getAllByText(/in progress/i);
    fireEvent.click(tabs[0]);

    expect(screen.getByText("Another Task")).toBeInTheDocument();
    expect(screen.queryByText("Test Task")).not.toBeInTheDocument();
  });

  test("opens create task modal when Add Task clicked", () => {
    renderComponent();

    fireEvent.click(screen.getByText(/add task/i));

    expect(screen.getByText(/create task/i)).toBeInTheDocument();
  });

  test("opens edit modal when edit clicked", () => {
    renderComponent();

    const editButtons = screen.getAllByText(/edit/i);

    fireEvent.click(editButtons[0]);

    expect(screen.getByText(/edit task/i)).toBeInTheDocument();
  });

  test("dispatches deleteTask when delete button clicked", () => {
    renderComponent();

    const deleteButtons = screen.getAllByText(/delete/i);

    fireEvent.click(deleteButtons[0]);

    expect(mockedDispatch).toHaveBeenCalledWith(deleteTask(1));
  });

  test("shows empty state when no tasks", () => {
    (useAppSelector as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        tasks: {
          list: [],
          loading: false,
        },
      }),
    );

    renderComponent();

    expect(screen.getByText(/no tasks available/i)).toBeInTheDocument();
  });

  test("shows loader when loading", () => {
    (useAppSelector as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        tasks: {
          list: [],
          loading: true,
        },
      }),
    );

    renderComponent();

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
