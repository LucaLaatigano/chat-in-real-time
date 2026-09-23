
type UUID = `${string}-${string}-${string}-${string}-${string}`
type User = {
  user_id: UUID
  name: string,
  last_name: string
  email: string
  identifier_code: string
  created_at: Date
}
export interface LoginInput {
  email: string,
  password: string
}
export interface LoginResponse {
  success: true,
  user: User
}
