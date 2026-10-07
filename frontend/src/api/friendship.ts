import type { UUID } from "../types/authTypes";
import type { PendingFriendshipsRequest, FriendshipRequestReturned, FriendshipChangingStatus } from "../types/friendship.types.js";
import { request } from "./request.js";

export const sendFriendshipRequest = (toId: UUID) => {
  return request<FriendshipRequestReturned>(`/friendship/request`, { method: "POST", body: JSON.stringify({ toId }) })
}

export const getPendingRequest = () => {
  return request<PendingFriendshipsRequest>("/friendship/pending")
}

export const acceptFriendshipRequest = (friendshipId: UUID) => {
  return request<FriendshipChangingStatus>("/friendship/accept", { method: "POST", body: JSON.stringify({ friendshipId }) })
}
export const rejectFriendshipRequest = (friendshipId: UUID) => {
  return request<FriendshipChangingStatus>("/friendship/reject", { method: "POST", body: JSON.stringify({ friendshipId }) })
}
export const blockFriendship = (friendshipId: UUID) => {
  return request<FriendshipChangingStatus>("/friendship/block", { method: "POST", body: JSON.stringify({ friendshipId }) })
}