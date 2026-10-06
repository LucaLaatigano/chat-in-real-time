import { io } from "socket.io-client"

const socket = io("http://localhost:3000", {
  extraHeaders: {
    Cookie: "access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWQ0YTBhYTItMGJiMC00ZTFiLTkwMjEtNzEzM2Y1ZjI4MTkwIiwidXNlcl9uYW1lIjoibWFydGEiLCJ1c2VyX2xhc3RuYW1lIjoiZ29uemFsZXoiLCJ1c2VyX2lkZW50aWZpZXJfY29kZSI6Ik1HMTQwMiIsImlhdCI6MTc5MTI0NzQ2NywiZXhwIjoxNzkxMjUxMDY3fQ.ILGZH71MHtuNlCiU8oh-21AlbsUV_DbyalLGg7BXG-k",
  },
})

socket.on("connect", () => console.log("conectado como B:", socket.id))


socket.on("connect_error", (e) => console.log("error:", e.message))

socket.on("friend_request:new", (data) =>
  console.log("LLEGÓ SOLICITUD:", data)
)