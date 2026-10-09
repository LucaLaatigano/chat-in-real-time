import { useQuery } from "@tanstack/react-query";
import { getPendingRequest } from "../api/friendship";
import type { PendingFriendshipsRequest } from "../types";
import type { ApiError } from "../error/apiError.js";

export const useAcceptFriendship = () => {
  return useQuery<PendingFriendshipsRequest, ApiError>({
    queryKey: ["pending-friendship-requests"],
    queryFn: () => getPendingRequest()
  })
}