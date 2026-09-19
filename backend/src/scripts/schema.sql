CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  identifier_code VARCHAR(20) UNIQUE NOT NULL,
  profile_photo TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ DEFAULT NULL
);

-- Defining ENUM type for status in friendship
DO $$ BEGIN
  CREATE TYPE friendship_status AS ENUM ('pending', 'accepted', 'rejected', 'blocked');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Friendships Table
CREATE TABLE IF NOT EXISTS friendships (
  id_friendship UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_user UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  id_user_friendship UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  status friendship_status DEFAULT 'pending',
  friendship_created TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT uq_friendship UNIQUE (id_user, id_user_friendship),
  CONSTRAINT chk_not_self_friend CHECK (id_user <> id_user_friendship)
);

-- Messages Table
CREATE TABLE IF NOT EXISTS messages (
  id_msg UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_sender UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  id_reciever UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  content TEXT, 
  is_read BOOLEAN DEFAULT false,
  msg_date TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT chk_not_self_message CHECK (id_sender <> id_reciever)
);

-- Message Attachments Table (Fotos, Videos, Audios, etc.)
CREATE TABLE IF NOT EXISTS message_attachments (
  id_attachment UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_msg UUID NOT NULL REFERENCES messages(id_msg) ON DELETE CASCADE,
  media_type VARCHAR(20) NOT NULL CHECK (media_type IN ('image', 'video', 'audio', 'file')),
  file_url TEXT NOT NULL,
  file_name VARCHAR(255),
  file_size INTEGER,
  mime_type VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_messages_chat
ON messages (id_sender, id_reciever, msg_date);

CREATE INDEX IF NOT EXISTS idx_attachments_msg
ON message_attachments (id_msg);

CREATE INDEX IF NOT EXISTS idx_friendships_user
ON friendships (id_user, status);

CREATE INDEX IF NOT EXISTS idx_friendships_contact
ON friendships (id_user_friendship, status);