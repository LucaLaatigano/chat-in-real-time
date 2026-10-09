import { useQuery } from "@tanstack/react-query";
import { searchUser } from "../api/user.js";
import type { ApiError } from "../error/apiError.js";
import type { ParamsInputForSearch, SearchUserResponse } from "../types";

export const useAcceptFriendship = (params: ParamsInputForSearch) => {
  return useQuery<SearchUserResponse, ApiError>({
    queryKey: ["user", "search", params],
    queryFn: () => searchUser(params)
  })
}