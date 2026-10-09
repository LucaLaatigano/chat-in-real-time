import type { UserReturnedInSearch } from "../models/user";

export type ParamsInputForSearch =
  | { identifier_code: string; user_name?: never }
  | { user_name: string; identifier_code?: never };

export interface SearchUserResponse {
  success: true;
  users: UserReturnedInSearch[];
}
