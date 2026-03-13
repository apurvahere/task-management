import type { Handler, HandlerEvent } from "@netlify/functions";

type StatusType = "to-do" | "in-progress" | "completed" | "";
type Task = {
  id: number;
  title: string;
  description: string;
  status: StatusType | string;
};

let tasks: Task[] = [];

const API_TOKEN = process.env.VITE_API_TOKEN;

const isAuthorized = (event: HandlerEvent): boolean => {
  const authHeader = event.headers["authorization"];
  if (!authHeader) return false;
  const token = authHeader.replace("Bearer ", "");
  return token === API_TOKEN;
};

export const handler: Handler = async (event) => {
  if (!isAuthorized(event)) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "Unauthorized" }),
    };
  }

  const idParam = event.queryStringParameters?.id;
  const taskId = idParam ? Number(idParam) : undefined;

  switch (event.httpMethod) {
    case "GET": {
      return { statusCode: 200, body: JSON.stringify(tasks) };
    }

    case "POST": {
      const newTask: Omit<Task, "id"> = JSON.parse(event.body || "{}");
      const createdTask: Task = { id: Date.now(), ...newTask };
      tasks.push(createdTask);
      return { statusCode: 200, body: JSON.stringify(createdTask) };
    }

    case "PUT": {
      if (!taskId) {
        return { statusCode: 400, body: "Missing task id" };
      }

      const updatedTaskData: Partial<Task> = JSON.parse(event.body || "{}");
      let updatedTask: Task | undefined;

      tasks = tasks.map((t) => {
        if (t.id === taskId) {
          updatedTask = { ...t, ...updatedTaskData };
          return updatedTask;
        }
        return t;
      });

      return { statusCode: 200, body: JSON.stringify(updatedTask) };
    }

    case "DELETE": {
      if (!taskId) {
        return { statusCode: 400, body: "Missing task id" };
      }

      tasks = tasks.filter((t) => t.id !== taskId);
      return { statusCode: 200, body: JSON.stringify({ success: true }) };
    }

    default: {
      return { statusCode: 405, body: "Method Not Allowed" };
    }
  }
};
