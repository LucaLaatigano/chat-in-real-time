import { useMutation } from "@tanstack/react-query";
import { acceptFriendshipRequest } from "../api/friendship";
import type { UUID, FriendshipChangingStatus } from "../types";
import type { ApiError } from "../error/apiError.js";

export const useAcceptFriendship = () => {
  return useMutation<FriendshipChangingStatus, ApiError, UUID>({
    mutationFn: (friendshipId: UUID) => acceptFriendshipRequest(friendshipId)
  })
}