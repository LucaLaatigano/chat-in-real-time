import type { UUID } from "./user.types.js"

export interface Friendship {
  id_friendship: UUID
  id_user: UUID
  id_user_friendship: UUID
  status: 'pending' | 'accepted' | 'rejected' | 'blocked'
  friendship_created: Date
}

export interface FriendRequestUser {
  user_id: UUID
  name: string
  last_name: string
  email: string
  identifier_code: string
  profile_photo: string,
  online: boolean
}

export interface RecievedFriendRequest {
  id_friendship: UUID
  status: "pending"
  friendship_created: Date
  sender: FriendRequestUser
}

export interface SentFriendRequest {
  id_friendship: UUID
  status: "pending"
  friendship_created: Date
  receiver: FriendRequestUser
}

export type FriendshipStatus = 'pending' | 'accept' | 'reject' | 'block'