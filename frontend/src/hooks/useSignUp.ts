import { useMutation } from "@tanstack/react-query";
import { signUp } from "../api/auth.ts";
import type { SignUpInput, SignUpResponse } from "../types/authTypes";
import { ApiError } from "../error/apiError.ts";


export const useSignup = () => {
  return useMutation<SignUpResponse, ApiError, SignUpInput>({
    mutationFn: (values: SignUpInput) => signUp(values)
  })
}