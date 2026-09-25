import type { UUID } from "./authTypes.d.ts"

export interface Chat {
  id: UUID | string
  name: string
  avatar: string
  lastMessage: string
  time: string,
  unreadCount?: number
}