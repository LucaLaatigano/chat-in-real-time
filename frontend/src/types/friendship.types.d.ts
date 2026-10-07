import type { UUID } from "./authTypes.js";
import type { UserInFrienship } from "./user.types.js";

export type FriendshipStatus = 'pending' | 'accepted' | 'rejected' | 'blocked'

export interface BasePendingRequest {
  id_friendship: UUID
  status: "pending"
  friendship_created: Date
}

export interface PendingReceivedRequest extends BasePendingRequest {
  sender: UserInFrienship
}

export interface PendingSentRequest extends BasePendingRequest {
  receiver: UserInFrienship
}

export interface PendingFriendshipsRequest {
  success: true
  received: PendingReceivedRequest[]
  sent: PendingSentRequest[]
}

export interface FriendshipData {
  id_friendship: UUID
  id_user: UUID
  id_user_friendship: UUID
  status: FriendshipStatus
  friendship_created: Date
}

export interface FriendshipChangingStatus {
  success: true
  message?: string
  friendship: FriendshipData
}
export interface FriendshipRequestReturned {
  success: true
  friendship: FriendshipData
}

