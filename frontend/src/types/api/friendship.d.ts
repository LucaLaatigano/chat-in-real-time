import type {
  PendingReceivedRequest,
  PendingSentRequest,
  FriendshipData,
} from "../models/friendship";

export interface PendingFriendshipsRequest {
  success: true;
  received: PendingReceivedRequest[];
  sent: PendingSentRequest[];
}

export interface FriendshipChangingStatus {
  success: true;
  message?: string;
  friendship: FriendshipData;
}

export interface FriendshipRequestReturned {
  success: true;
  friendship: FriendshipData;
}
