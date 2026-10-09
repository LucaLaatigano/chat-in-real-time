import type { UUID } from "../common/uuid";

export interface Chat {
  id: UUID | string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
}
