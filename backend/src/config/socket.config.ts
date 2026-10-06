import { Server } from "socket.io";
import type { Server as HttpServer } from "node:http";
import { socketAuthMiddleware } from "../middlewares/socketAuth.middleware.js";

let io: Server | null = null
export function initSocket(httpServer: HttpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:5173',
      credentials: true
    }
  })

  io.use(socketAuthMiddleware)

  io.on('connection', (socket) => {
    const { user_id, user_name } = socket.data.user
    socket.join(`user:${user_id}`)
    console.log(`🔌 ${user_name} connected`);

    socket.on('disconnect', () => {
      console.log(`${user_name} disconnected`);
    })
  })

  return io
}

export function getIO() {
  if (!io) throw new Error('socket not initialazed')
  return io
}

