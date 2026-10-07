import { io, Socket } from "socket.io-client";
import { queryClient } from "../lib/queryClient.js";
import { notifications } from "@mantine/notifications"
import type { FriendRequestAcceptedPayload, FriendRequestRejectedPayload, NewFriendshipPayload } from "../types/socket.types"


const SOCKET_URL = import.meta.env.VITE_SOCKET_URL ?? ""
export const socket: Socket = io(SOCKET_URL, {
  withCredentials: true,
  autoConnect: false,
  transports: ["websocket", "polling"]
})

export const onConnect = () => {
  console.log("socket connected with id:", socket.id)
}

export const onConnectError = (error: Error) => {
  console.error("error with the socket connection:", error.message);
};

export const onNewFriendRequest = (data: NewFriendshipPayload) => {
  notifications.show({
    title: "New friendship request",
    message: `${data.from?.user_name ?? "A user"} has sent a friendhsip request.`,
    color: "blue",
  });
  queryClient.invalidateQueries({ queryKey: ["friendships-pending"] });
}

export const onFriendRequestAccepted = (data: FriendRequestAcceptedPayload) => {
  notifications.show({
    title: "Friendhsip request accepted",
    message: `${data.by?.user_name ?? "A user"} has accepted your friendhsip request.`,
    color: "teal",
  });

  queryClient.invalidateQueries({ queryKey: ["friendships-pending"] });
  queryClient.invalidateQueries({ queryKey: ["chats"] });
}

export const onFriendRequestRejected = (data: FriendRequestRejectedPayload) => {
  console.log("❌ Rechazo recibido:", data);
  notifications.show({
    title: "Friendship request rejected",
    message: "Your friednship request has been rejected.",
    color: "red",
  });
  queryClient.invalidateQueries({
    queryKey: ["friendships-pending"]
  })
}