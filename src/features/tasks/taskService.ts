import { api } from "../../api/axios";
import type { Task } from "../../types";

export const getTasksApi = async () => {
  const response = await api.get("/tasks");
  return response.data;
};

export const createTaskApi = async (task: Omit<Task, "id">) => {
  const response = await api.post("/tasks", task);
  return response.data;
};

export const updateTaskApi = async (id: number, task: Partial<Task>) => {
  const response = await api.put(`/tasks/${id}`, task);
  return response.data;
};

export const deleteTaskApi = async (id: number) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};
