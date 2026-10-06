import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app.error.js";
import { FriendshipService } from "../services/friendship.service.js";
import type { UUID } from "../types/user.types.js";
import { getIO } from "../config/socket.config.js";

export class FriendshipController {
  static async getPendingFriendshipsRequest(req: Request, res: Response) {
    const userId = req.user?.user_id as UUID
    const { received: received, sent: sent } = await FriendshipService.getPendingFriendshipsRequest({ userId })
    res.status(200).json({
      success: true,
      received,
      sent
    });
  }

  static async sendFriendRequest(req: Request, res: Response) {
    const fromId = req.user?.user_id as UUID
    const { toId } = req.body as { toId: UUID }

    if (!toId) throw new AppError("toId is required", 400)

    const friendship = await FriendshipService.sendFriendshipRequest({ fromId, toId })

    getIO().to(`user:${toId}`).emit('friend_request:new', {
      id_friendship: friendship.id_friendship,
      status: friendship.status,
      from: {
        user_id: req.user?.user_id,
        user_name: req.user?.user_name,
        user_lastname: req.user?.user_lastname,
        user_identifier_code: req.user?.user_identifier_code,
      },
    })
    res.status(201).json({ success: true, friendship });
  }

  static async acceptFriendshipRequest(req: Request, res: Response) {
    const userId = req.user?.user_id as UUID;
    const { friendshipId } = req.body as { friendshipId: UUID };

    if (!friendshipId) throw new AppError("friendshipId is required", 400);
    const friendship = await FriendshipService.changeStatusFriendship({
      friendshipId,
      status: "accept",
      idUserChanging: userId
    })

    getIO().to(`user:${friendship.id_user}`).emit("friend_request:accepted", {
      id_friendship: friendship.id_friendship,
      status: friendship.status,
      by: {
        user_id: req.user?.user_id,
        user_name: req.user?.user_name,
        user_lastname: req.user?.user_lastname,
        user_identifier_code: req.user?.user_identifier_code,
      }
    })
    res.json({ success: true, friendship });
  }

  static async rejectFriendshipRequest(req: Request, res: Response) {
    const userId = req.user?.user_id as UUID;
    const { friendshipId } = req.body as { friendshipId: UUID };
    if (!friendshipId) throw new AppError("friendshipId is required", 400);
    const friendship = await FriendshipService.changeStatusFriendship({
      friendshipId,
      status: "reject",
      idUserChanging: userId,
    });

    getIO().to(`user:${friendship.id_user}`).emit("friend_request:rejected", {
      id_friendship: friendship.id_friendship,
      status: friendship.status,
    })
    res.json({ success: true, message: "Friend request rejected", friendship });
  }

  static async blockUser(req: Request, res: Response) {
    const userId = req.user?.user_id as UUID;
    const { friendshipId } = req.body as { friendshipId: UUID };

    if (!friendshipId) throw new AppError("friendshipId is required", 400);

    const friendship = await FriendshipService.changeStatusFriendship({
      friendshipId,
      status: "block",
      idUserChanging: userId,
    });
    res.json({ success: true, message: "User blocked successfully", friendship });
  }
}