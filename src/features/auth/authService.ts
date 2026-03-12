import { api } from "../../api/axios";

type LoginPayload = {
  email: string;
  password: string;
};

export const loginApi = async (data: LoginPayload) => {
  const response = await api.post("/login", data);

  return response.data;
};
