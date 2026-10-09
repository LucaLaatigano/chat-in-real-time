import type { UUID } from "../common/uuid";
import type { UserInFriendship } from "./user";

export type FriendshipStatus = "pending" | "accepted" | "rejected" | "blocked";

export interface BasePendingRequest {
  id_friendship: UUID;
  status: "pending";
  friendship_created: Date;
}

export interface PendingReceivedRequest extends BasePendingRequest {
  sender: UserInFriendship;
}

export interface PendingSentRequest extends BasePendingRequest {
  receiver: UserInFriendship;
}

export interface FriendshipData {
  id_friendship: UUID;
  id_user: UUID;
  id_user_friendship: UUID;
  status: FriendshipStatus;
  friendship_created: Date;
}
