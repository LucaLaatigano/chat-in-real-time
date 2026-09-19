import { Box, Group, ActionIcon, Avatar, Text, Center, TextInput } from "@mantine/core"
import { IconArrowLeft, IconDotsVertical, IconSend } from "@tabler/icons-react"
import type { Chat } from "../types/chat.types"
interface Props {
  openMobile: () => void,
  activeChat: Chat
}
export const ChatLayout: React.FC<Props> = ({ openMobile, activeChat }) => {
  return (
    <Box style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Group p="xs" bg="gray.1" style={{ borderBottom: '1px solid var(--mantine-color-gray-3)' }}>
        <ActionIcon
          variant="subtle"
          color="gray"
          onClick={openMobile}
          hiddenFrom="sm"
          title="Volver a los chats"
          size="lg"
        >
          <IconArrowLeft size={22} />
        </ActionIcon>

        <Avatar radius="xl" />
        <Box style={{ flex: 1 }}>
          <Text size="sm" fw={600}>{activeChat.name}</Text>
          <Text size="xs" c="dimmed">en línea</Text>
        </Box>

        <ActionIcon variant="subtle" color="gray" radius="xl">
          <IconDotsVertical size={20} />
        </ActionIcon>
      </Group>

      <Box style={{ flex: 1, padding: 16, backgroundColor: '#efeae2', overflowY: 'auto' }}>
        <Center h="100%">
          <Text c="dimmed" size="sm">
            Aquí van los mensajes en tiempo real de {activeChat.name}
          </Text>
        </Center>
      </Box>

      <Group p="xs" bg="gray.1" style={{ borderTop: '1px solid var(--mantine-color-gray-3)' }}>
        <TextInput
          placeholder="Escribe un mensaje..."
          style={{ flex: 1 }}
          radius="xl"
        />
        <ActionIcon size="lg" radius="xl" color="teal" variant="filled">
          <IconSend size={18} />
        </ActionIcon>
      </Group>
    </Box>
  )
}