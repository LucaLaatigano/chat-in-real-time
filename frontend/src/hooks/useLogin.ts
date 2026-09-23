import { useMutation } from "@tanstack/react-query";
import type { LoginInput, LoginResponse } from "../types/authTypes.ts";
import { ApiError } from "../error/apiError.ts";
import { login } from "../api/auth.ts";

export const useLogin = () => {
  return useMutation<LoginResponse, ApiError, LoginInput>({
    mutationFn: (credentials: LoginInput) => login(credentials)
  })
}
