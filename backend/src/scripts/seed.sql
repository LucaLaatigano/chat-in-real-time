-- Limpieza previa para evitar duplicados en pruebas
TRUNCATE TABLE messages, friendships, users CASCADE;

-- 1. Insertar Usuarios
INSERT INTO users (user_id, name, last_name, email, password, identifier_code, profile_photo) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Juan', 'Perez', 'juan@example.com', '$2b$10$w8T06Q2V2jHj8K.exampleHash1', 'JUAN#001', 'https://api.dicebear.com/7.x/bottts/svg?seed=Juan'),
  ('22222222-2222-2222-2222-222222222222', 'Maria', 'Gomez', 'maria@example.com', '$2b$10$w8T06Q2V2jHj8K.exampleHash2', 'MARI#002', 'https://api.dicebear.com/7.x/bottts/svg?seed=Maria'),
  ('33333333-3333-3333-3333-333333333333', 'Pedro', 'Lopez', 'pedro@example.com', '$2b$10$w8T06Q2V2jHj8K.exampleHash3', 'PEDR#003', 'https://api.dicebear.com/7.x/bottts/svg?seed=Pedro');

-- 2. Insertar Amistades
-- Juan y María ya son amigos confirmados
INSERT INTO friendships (id_user, id_user_friendship, status) VALUES
  ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'accepted');

-- Pedro le mandó solicitud a Juan (pendiente de respuesta)
INSERT INTO friendships (id_user, id_user_friendship, status) VALUES
  ('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'pending');

-- 3. Insertar Mensajes de prueba (Conversación entre Juan y María)
INSERT INTO messages (id_sender, id_reciever, content, is_read, msg_date) VALUES
  ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '¡Hola María! ¿Cómo estás?', true, NOW() - INTERVAL '10 minutes'),
  ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', '¡Hola Juan! Todo bien por suerte, ¿y vos?', true, NOW() - INTERVAL '8 minutes'),
  ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '¡Genial! Probando nuestro nuevo chat en tiempo real 🚀', true, NOW() - INTERVAL '5 minutes'),
  ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', '¡Qué bueno! Se siente súper fluido.', false, NOW() - INTERVAL '1 minute');
