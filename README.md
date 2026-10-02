# Real-Time Chat Application

A **real-time chat** web application inspired by Discord. It is built on **WebSockets** using **Socket.IO**, allowing users to add each other as friends and exchange messages instantly, along with photos, videos, and documents.

---

## About the Project

This project was created to explore and apply real-time communication with WebSockets. Unlike traditional HTTP requests, where the client has to ask the server for new data, WebSockets keep an open connection between the client and the server. This means messages are delivered instantly, without needing to refresh the page.

Users can send friend requests to other users, and once a request is accepted, they can start chatting with each other in real time.

---

## Main Features

- **Real-time messaging** powered by WebSockets and Socket.IO.
- **Friend requests** that users can send, accept, or decline before starting a conversation.
- **File sharing** that supports photos, videos, and documents.

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| **TypeScript** | Main programming language with static typing |
| **React** | User interface |
| **Socket.IO Client** | Real-time connection with the server |

### Backend

| Technology | Purpose |
|---|---|
| **TypeScript** | Main programming language with static typing |
| **Node.js** | Server runtime |
| **Express** | REST API framework |
| **Socket.IO** | Real-time, bidirectional communication through WebSockets |
| **JWT** | Token-based authentication |
| **bcrypt** | Password hashing |
| **Cookies** | Secure session token storage |

---

## Author

- **Luca Latigano** - [GitHub](https://github.com/LucaLaatigano)

---

## License

This project is licensed under the MIT License.
