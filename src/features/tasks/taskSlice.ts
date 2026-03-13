import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
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

export const createTask = createAsyncThunk<Task, Omit<Task, "id">>(
  "tasks/create",
  async (task) => {
    return await createTaskApi(task);
  },
);

export const updateTask = createAsyncThunk<
  Task,
  { id: number; task: Partial<Task> }
>("tasks/update", async ({ id, task }) => {
  return await updateTaskApi(id, task);
});

export const deleteTask = createAsyncThunk<number, number>(
  "tasks/delete",
  async (id) => {
    await deleteTaskApi(id);
    return id;
  },
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.list = action.payload;
        saveTasks(state.list);
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch tasks";
      })

      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.list.push(action.payload);
        saveTasks(state.list);
        toast.success("Task created successfully");
      })

      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
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

      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<number>) => {
        state.list = state.list.filter((task) => task.id !== action.payload);
        saveTasks(state.list);
        toast.success("Task deleted successfully");
      });
  },
});

export const tasksReducer = taskSlice.reducer;
export default taskSlice.reducer;
