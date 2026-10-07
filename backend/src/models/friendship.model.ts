import { pool } from "../config/db.config.js";
import type { FriendshipStatus, Friendship, RecievedFriendRequest } from "../types/friendship.types.js";
import type { UUID } from "../types/user.types.js";

export class FriendShipModel {
  static async createFriendship({ user_id, user_id_friendship }: { user_id: UUID, user_id_friendship: UUID }) {
    const friendship = await pool.query<Friendship>(`
        INSERT INTO friendships(id_user, id_user_friendship) VALUES ($1,$2)
        RETURNING *
        `, [user_id, user_id_friendship])

    return friendship.rows[0]
  }

  static async getReceivedPending({ userId }: { userId: UUID }) {
    const result = await pool.query<RecievedFriendRequest>(`
      SELECT 
        f.id_friendship,
        f.status,
        f.friendship_created,
        json_build_object(
            'user_id', u.user_id,
            'name', u.name,
            'last_name', u.last_name,
            'email', u.email,
            'identifier_code', u.identifier_code,
            'profile_photo', u.profile_photo,
            'online', u.online
        ) AS sender
        FROM friendships f
        INNER JOIN users u ON f.id_user = u.user_id
        WHERE f.id_user_friendship = $1 AND f.status = 'pending'
        ORDER BY f.friendship_created DESC;
      
      `, [userId])

    return result.rows
  }

  static async getSentPending({ userId }: { userId: UUID }) {
    const result = await pool.query<RecievedFriendRequest>(`
      SELECT 
        f.id_friendship,
        f.status,
        f.friendship_created,
        json_build_object(
            'user_id', u.user_id,
            'name', u.name,
            'last_name', u.last_name,
            'email', u.email,
            'identifier_code', u.identifier_code,
            'profile_photo', u.profile_photo,
            'online', u.online
        ) AS receiver
        FROM friendships f
        INNER JOIN users u ON f.id_user_friendship = u.user_id
        WHERE f.id_user = $1 AND f.status = 'pending'
        ORDER BY f.friendship_created DESC;
      
      `, [userId])

    return result.rows
  }

  static async findBetween({ user_id, user_id_friendship }: { user_id: UUID, user_id_friendship: UUID }) {
    const result = await pool.query<Friendship>(`
      SELECT * FROM friendships
      WHERE (id_user = $1 AND id_user_friendship = $2)
        OR (id_user = $2 AND id_user_friendship = $1)
      LIMIT 1
    `, [user_id, user_id_friendship])

    return result.rows[0] ?? null
  }

  static async findById({ friendshipId }: { friendshipId: UUID }) {
    const friendShip = await pool.query(`
      SELECT 
        id_friendship,
        id_user,
        id_user_friendship
        FROM friendships
        WHERE id_friendship = $1
      `, [friendshipId])
    return friendShip.rows[0] ?? null
  }

  static async changeStatusFriendship({ friendshipId, status, user_id }: { friendshipId: UUID, status: FriendshipStatus, user_id: UUID }) {
    let result
    if (status === "accept") {
      result = await pool.query<Friendship>(`
      UPDATE friendships SET status = 'accepted'
      WHERE id_friendship = $1 AND id_user_friendship = $2
      RETURNING *
      `, [friendshipId, user_id])
    } else if (status === "reject") {
      result = await pool.query<Friendship>(`
      UPDATE friendships SET status = 'rejected'
      WHERE id_friendship = $1 AND id_user_friendship = $2
      RETURNING *
      `, [friendshipId, user_id])
    }
    else if (status === "block") {
      result = await pool.query<Friendship>(`
      UPDATE friendships SET status = 'blocked'
      WHERE id_friendship = $1 AND (id_user = $2 OR id_user_friendship = $2)
      RETURNING *
      `, [friendshipId, user_id])
    }

    return result?.rows[0] ?? null;
  }

}