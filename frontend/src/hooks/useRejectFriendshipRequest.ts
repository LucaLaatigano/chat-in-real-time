import { useMutation } from "@tanstack/react-query";
import { rejectFriendshipRequest } from "../api/friendship.js";
import type { UUID, FriendshipChangingStatus } from "../types";
import type { ApiError } from "../error/apiError.js";

export const useRejectFriendship = () => {
  return useMutation<FriendshipChangingStatus, ApiError, UUID>({
    mutationFn: (friendshipId: UUID) => rejectFriendshipRequest(friendshipId)
  })
}