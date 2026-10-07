import type { SearchUserResponse, ParamsInputForSearch } from "../types/user.types.js";
import { request } from "./request.js";
const IDENTIFIER_CODE_REGEX = /^[a-zA-Z]{2}\d{4}$/;
export const detectSearchParam = (query: string): ParamsInputForSearch => {
  const trimmed = query.trim()
  if (IDENTIFIER_CODE_REGEX.test(trimmed)) {
    return { identifier_code: trimmed }
  }
  return { user_name: trimmed }
}

export const searchUser = (params: ParamsInputForSearch) => {
  const query = new URLSearchParams()
  if ("identifier_code" in params && params.identifier_code) {
    query.set("identifier_code", params.identifier_code)
  } else if ("user_name" in params && params.user_name) {
    query.set("user_name", params.user_name);
  }

  const queryString = query.toString()
  return request<SearchUserResponse>(`/users/search?${queryString}`)
}