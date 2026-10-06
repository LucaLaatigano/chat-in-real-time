import type { UUID } from "../types/user.types.js";
import { AppError } from "../errors/app.error.js";
import { FriendShipModel } from "../models/friendship.model.js";
import type { FriendshipStatus } from "../types/friendship.types.js";
import { UsersModel } from "../models/user.model.js";


export class FriendshipService {
  static async getPendingFriendshipsRequest({ userId }: { userId: UUID }) {
    const user = await UsersModel.findById({ user_id: userId })
    if (!user) throw new AppError("user not found", 404)
    const [received, sent] = await Promise.all([
      FriendShipModel.getReceivedPending({ userId }),
      FriendShipModel.getSentPending({ userId })
    ])

    return {
      received: received,
      sent: sent
    }
  }

  static async sendFriendshipRequest({ fromId, toId }: { fromId: UUID, toId: UUID }) {
    if (fromId === toId) throw new AppError("can't send a request to yourself", 400)

    const existing = await FriendShipModel.findBetween({ user_id: fromId, user_id_friendship: toId })
    if (existing) throw new AppError("a request or friendship already exists", 409)

    const friendship = await FriendShipModel.createFriendship({ user_id: fromId, user_id_friendship: toId })
    return friendship
  }

  static async changeStatusFriendship({ friendshipId, status, idUserChanging }: { friendshipId: UUID, status: FriendshipStatus, idUserChanging: UUID }) {
    const existing = await FriendShipModel.findById({ friendshipId: friendshipId })
    if (existing === null) throw new AppError("the friendship request does not exists", 409)
    const friendshipUpdated = await FriendShipModel.changeStatusFriendship({ friendshipId, status, user_id: idUserChanging })
    if (!friendshipUpdated) {
      throw new AppError("Friendship request not found or you cannot change its status", 404);
    }
    return friendshipUpdated;
  }
}

