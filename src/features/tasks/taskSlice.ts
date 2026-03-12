import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTasksApi,
  createTaskApi,
  updateTaskApi,
  deleteTaskApi,
} from "./taskService";
import { loadTasks, saveTasks } from "../../utils/storage";
import toast from "react-hot-toast";
import type { Task } from "../../types";

type TaskState = {
  list: Task[];
  loading: boolean;
  error: string | null;
};

export const initialState: TaskState = {
  list: loadTasks() || [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk<Task[]>("tasks/fetch", async () => {
  return await getTasksApi();
});

export const createTask = createAsyncThunk(
  "tasks/create",
  async (task: Omit<Task, "id">) => {
    return await createTaskApi(task);
  },
);

export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ id, task }: { id: number; task: Partial<Task> }) => {
    return await updateTaskApi(id, task);
  },
);

export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id: number) => {
    await deleteTaskApi(id);
    return id;
  },
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        saveTasks(state.list);
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch tasks";
      })

      .addCase(createTask.fulfilled, (state, action) => {
        state.list.push(action.payload);
        saveTasks(state.list);
        toast.success("Task created successfully");
      })

      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (task) => task.id === action.payload.id,
        );

        if (index !== -1) {
          state.list[index] = {
            ...state.list[index],
            ...action.payload,
          };

          saveTasks(state.list);
        }
        toast.success("Task updated successfully");
      })

      .addCase(deleteTask.fulfilled, (state, action) => {
        state.list = state.list.filter((task) => task.id !== action.payload);
        saveTasks(state.list);
        toast.success("Task deleted successfully");
      });
  },
});

export const tasksReducer = taskSlice.reducer;
export default taskSlice.reducer;
