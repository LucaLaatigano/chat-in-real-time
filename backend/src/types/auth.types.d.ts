export interface UserAuth {
  user_id: string
  user_name: string
  user_lastname: string
}

export interface UserReturnedPayload extends UserAuth {
  user_identifier_code: string
}