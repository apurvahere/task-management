import type { IUser, Task } from "../types";

export const saveUser = (state: IUser) => {
  localStorage.setItem("user", JSON.stringify(state));
};

export const loadUser = () => {
  const state = localStorage.getItem("user");

  return state ? JSON.parse(state) : undefined;
};

export const saveTasks = (tasks: Task[]) => {
  localStorage.setItem("tasks", JSON.stringify([...tasks]));
};

export const loadTasks = (): Task[] => {
  const data = localStorage.getItem("tasks");
  return data
    ? JSON.parse(data)
    : [
        {
          id: 1,
          title: "Task 1",
          description: "First task",
          status: "to-do",
        },
      ];
};

export const saveTheme = (theme: "light" | "dark") => {
  localStorage.setItem("theme", theme);
};

export const loadTheme = (): "light" | "dark" | null => {
  const theme = localStorage.getItem("theme");
  return theme === "dark" || theme === "light" ? theme : null;
};
