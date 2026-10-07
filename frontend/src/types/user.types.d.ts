import type { UUID } from "./authTypes.js";

export type ParamsInputForSearch =
  | { identifier_code: string; user_name?: never }
  | { user_name: string; identifier_code?: never };

export interface UserReturnedInSearch {
  user_id: UUID,
  name: string,
  last_name: string,
  email: string,
  identifier_code: string,
  profile_photo: string | null
  created_at: Date
  online: boolean
}

export type UserInFrienship = Omit<UserReturnedInSearch, "created_at">

export type UserInFrienshipSocket = Omit<UserReturnedInSearch, "created_at" | "email" | "profiel_photo" | "online">

export interface SearchUserResponse {
  success: true
  users: UserReturnedInSearch[]
}
