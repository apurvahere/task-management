import reducer, {
  createTask,
  deleteTask,
  fetchTasks,
  initialState,
  updateTask,
} from "./taskSlice";

describe("taskSlice", () => {
  test("should return initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });

  test("should handle fetchTasks.pending", () => {
    const action = { type: fetchTasks.pending.type };

    const state = reducer(initialState, action);

    expect(state.loading).toBe(true);
  });

  test("should handle fetchTasks.fulfilled", () => {
    const tasks = [
      { id: 2, title: "Task 2", description: "desc", status: "to-do" },
    ];

    const action = {
      type: fetchTasks.fulfilled.type,
      payload: tasks,
    };

    const state = reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.list).toEqual(tasks);
  });

  test("should handle fetchTasks.rejected", () => {
    const action = {
      type: fetchTasks.rejected.type,
      error: { message: "Error fetching tasks" },
    };

    const state = reducer(initialState, action);

    expect(state.loading).toBe(false);
  });

  test("should handle createTask fulfilled", () => {
    const action = {
      type: createTask.fulfilled.type,
      payload: { id: "1", title: "Test", status: "todo" },
    };

    const state = reducer(initialState, action);

    expect(state.list.length).toBe(2);
  });

  test("should handle deleteTask fulfilled", () => {
    const startState = {
      list: [
        { id: 1, title: "Test", status: "to-do", description: "description 1" },
      ],
      loading: false,
      error: null,
    };

    const action = {
      type: deleteTask.fulfilled.type,
      payload: 1,
    };

    const state = reducer(startState, action);

    expect(state.list.length).toBe(0);
  });

  test("should handle updateTask fulfilled", () => {
    const startState = {
      list: [
        { id: 1, title: "Old Task", description: "desc", status: "to-do" },
      ],
      loading: false,
      error: null,
    };

    const action = {
      type: updateTask.fulfilled.type,
      payload: {
        id: 1,
        title: "Updated Task",
        description: "desc",
        status: "done",
      },
    };

    const state = reducer(startState, action);

    expect(state.list[0].title).toBe("Updated Task");
    expect(state.list[0].status).toBe("done");
  });
});
