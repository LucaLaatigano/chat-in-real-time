import { request } from "./request.ts";
import type { MeResponse, LoginInput, LoginResponse, SignUpResponse, SignUpInput } from "../types/authTypes";

export const login = async (credentials: LoginInput) => {
  return await request<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  })
}

export const getMe = async () => {
  return await request<MeResponse>('/auth/me')
}

export const signUp = async (values: SignUpInput) => {
  return await request<SignUpResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}

export const logout = async () => {
  return await request('/auth/logout')
}