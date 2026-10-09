import type { UUID } from "../common/uuid";

export interface User {
  user_id: UUID;
  name: string;
  last_name: string;
  email?: string;
  identifier_code?: string;
  created_at?: Date;
}

export interface UserReturnedInSearch {
  user_id: UUID;
  name: string;
  last_name: string;
  email: string;
  identifier_code: string;
  profile_photo: string | null;
  created_at: Date;
  online: boolean;
}

export type UserInFriendship = Omit<UserReturnedInSearch, "created_at">;
export type UserInFrienship = UserInFriendship; // Alias para compatibilidad con código existente

export type UserInFriendshipSocket = Omit<
  UserReturnedInSearch,
  "created_at" | "email" | "profile_photo" | "online"
>;
export type UserInFrienshipSocket = UserInFriendshipSocket;
