import type { User } from "../models/user";

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: true;
  user: User;
}

export interface MeResponse {
  success: true;
  user: User;
}

export interface SignUpInput {
  name: string;
  last_name: string;
  email: string;
  profile_photo: string | null;
  password: string;
}

export interface SignUpResponse {
  success: true;
  message: string;
  user: User;
}
