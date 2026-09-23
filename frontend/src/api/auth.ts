import { request } from "./request";
import type { LoginInput, LoginResponse } from "../types/authTypes";

export const login = async (credentials: LoginInput) => {
  return await request<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  })
}