import type { UUID } from "../common/uuid.js";

export interface User {
  user_id: UUID;
  name: string;
  last_name: string;
  email: string;
  password: string;
  identifier_code: string;
  profile_photo: string | null;
  created_at: Date;
  deleted_at: Date | null;
  online: boolean;
}

export type UserDataSchema = Omit<
  User,
  "user_id" | "profile_photo" | "created_at" | "deleted_at" | "identifier_code" | "online"
>;
export type UserDataToInsert = Omit<
  User,
  "user_id" | "profile_photo" | "created_at" | "deleted_at" | "online"
>;
export type UserToReturn = Omit<User, "profile_photo" | "deleted_at" | "password">;
export type UserInSearch = Omit<User, "deleted_at" | "password">;
export type UserData = Omit<User, "deleted_at" | "online" | "password">;
