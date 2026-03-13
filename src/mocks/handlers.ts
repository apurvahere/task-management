import { http, HttpResponse } from "msw";
import { loadTasks } from "../utils/storage";
import type { Task } from "../types";

type LoginRequest = {
  email: string;
  password: string;
};

const API_TOKEN = import.meta.env.VITE_API_TOKEN;
const allowedEmails =
  import.meta.env.VITE_ALLOWED_EMAILS?.split(",").map((e: string) =>
    e.trim(),
  ) || [];
const allowedPasswords =
  import.meta.env.VITE_ALLOWED_PASSWORDS?.split(",").map((p: string) =>
    p.trim(),
  ) || [];

let tasks = loadTasks();

const isAuthorized = (request: Request) => {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader) return false;

  const token = authHeader.replace("Bearer ", "");

  return token === API_TOKEN;
};

const requireAuth = (request: Request) => {
  if (!isAuthorized(request)) {
    return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
};

export const handlers = [
  http.post("/api/login", async ({ request }) => {
    const { email, password } = (await request.json()) as LoginRequest;

    const validEmail = allowedEmails.includes(email);
    const validPassword = allowedPasswords.includes(password);

    if (validEmail && validPassword) {
      return HttpResponse.json({
        token: "fake-jwt-token",
        user: {
          id: 1,
          name: "John Cena",
          email: email,
        },
      });
    }

    return HttpResponse.json(
      { message: "Invalid credentials" },
      { status: 401 },
    );
  }),

  http.get("/api/tasks", ({ request }) => {
    const error = requireAuth(request);
    if (error) return error;
    return HttpResponse.json(tasks);
  }),

  http.post("/api/tasks", async ({ request }) => {
    const error = requireAuth(request);
    if (error) return error;

    const body = (await request.json()) as Omit<Task, "id">;

    const newTask = { id: Date.now(), ...body };

    tasks.push(newTask);

    return HttpResponse.json(newTask);
  }),

  http.put("/api/tasks/:id", async ({ params, request }) => {
    const error = requireAuth(request);
    if (error) return error;

    const body = (await request.json()) as Omit<Task, "id">;

    let updatedTask;

    tasks = tasks.map((t) => {
      if (t.id === Number(params.id)) {
        updatedTask = { ...t, ...body };
        return updatedTask;
      }
      return t;
    });

    return HttpResponse.json(updatedTask);
  }),

  http.delete("/api/tasks/:id", ({ params, request }) => {
    const error = requireAuth(request);
    if (error) return error;

    tasks = tasks.filter((t) => t.id !== Number(params.id));

    return HttpResponse.json({ success: true });
  }),
];
