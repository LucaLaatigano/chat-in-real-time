import type { Chat } from "../types/chat.types"
import { UnstyledButton, Group, Avatar, Box, Text, Badge } from "@mantine/core"
interface Props {
  chat: Chat
  isSelected: boolean
  handleSelectChat: (chat: string) => void
}
export const ChatBox: React.FC<Props> = ({ chat, isSelected, handleSelectChat }) => {
  return (
    <>
      <UnstyledButton
        key={chat.id}
        onClick={() => handleSelectChat(chat.id)}
        p="sm"
        style={{
          width: '100%',
          borderRadius: 8,
          backgroundColor: isSelected ? 'var(--mantine-color-gray-2)' : 'transparent',
          marginBottom: 4,
        }}
      >
        <Group wrap="nowrap" align="center" gap="sm">
          <Avatar radius="xl" size="lg" />
          <Box style={{ flex: 1, minWidth: 0 }}>
            <Group justify="space-between" mb={2}>
              <Text size="sm" fw={600} truncate>
                {chat.name}
              </Text>
              <Text size="xs" c="dimmed">
                {chat.time}
              </Text>
            </Group>
            <Group justify="space-between" align="center">
              <Text size="xs" c="dimmed" truncate style={{ flex: 1 }}>
                {chat.lastMessage}
              </Text>
              {chat.unreadCount ? (
                <Badge size="xs" circle color="teal">
                  {chat.unreadCount}
                </Badge>
              ) : null}
            </Group>
          </Box>
        </Group>
      </UnstyledButton>
    </>
  )
}