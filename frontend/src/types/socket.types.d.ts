import { socket } from "../socket/socket.js";
import { UUID } from "./authTypes.js";


export interface SocketContextValue {
  socket: typeof socket
}

export interface UserReturnedInSocket {
  user_id: UUID,
  user_name: string,
  last_name: string,
  identifier_code: string,
}

export interface BaseSocketFriendship {
  id_friendship: UUID
}

export interface NewFriendshipPayload extends BaseSocketFriendship {
  id_friendship: UUID
  status: FriendshipStatus
  from: UserReturnedInSocket
}

export interface FriendRequestAcceptedPayload extends BaseSocketFriendship {
  status: FriendshipStatus
  by: UserReturnedInSocket
}

export interface FriendRequestRejectedPayload extends BaseSocketFriendship {
  status: 'rejected'
}
