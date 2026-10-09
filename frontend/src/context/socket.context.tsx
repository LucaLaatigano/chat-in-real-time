import { useEffect, useContext, createContext } from "react"
import { socket, onConnect, onConnectError, onNewFriendRequest, onFriendRequestAccepted, onFriendRequestRejected } from "../socket/socket.ts"
import type { SocketContextValue } from "../types"
import { useUser } from "../hooks/useUser.ts"
import { queryClient } from "../lib/queryClient.tsx"

const SocketContext = createContext<SocketContextValue | null>(null)

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user } = useUser()

  useEffect(() => {
    if (!user) {
      if (socket.connected) {
        socket.disconnect()
      }
      return
    }

    socket.connect()

    socket.on("connect", onConnect);
    socket.on("connect_error", onConnectError);
    socket.on("friend_request:new", onNewFriendRequest);
    socket.on("friend_request:accepted", onFriendRequestAccepted);
    socket.on("friend_request:rejected", onFriendRequestRejected);

    return () => {
      socket.off("connect", onConnect);
      socket.off("connect_error", onConnectError);
      socket.off("friend_request:new", onNewFriendRequest);
      socket.off("friend_request:accepted", onFriendRequestAccepted);
      socket.off("friend_request:rejected", onFriendRequestRejected);
      socket.disconnect();
    };
  }, [user, queryClient])
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket debe usarse dentro de un SocketProvider");
  }
  return context.socket;
};