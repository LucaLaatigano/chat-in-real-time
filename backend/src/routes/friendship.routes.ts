import { Router } from "express";
import { FriendshipController } from "../controllers/friendship.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
export const friendshipRouter = Router()

friendshipRouter.get("/pending", authMiddleware, FriendshipController.getPendingFriendshipsRequest)
friendshipRouter.post("/request", authMiddleware, FriendshipController.sendFriendRequest)
friendshipRouter.post("/accept", authMiddleware, FriendshipController.acceptFriendshipRequest);
friendshipRouter.post("/reject", authMiddleware, FriendshipController.rejectFriendshipRequest)
friendshipRouter.post("/block", authMiddleware, FriendshipController.blockUser);