export interface IUser {
  email: string;
}

export type StatusType = "to-do" | "in-progress" | "completed" | "";

export type Task = {
  id: number;
  title: string;
  description: string;
  status: StatusType | string;
};
