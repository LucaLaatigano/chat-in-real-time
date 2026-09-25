import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import {
  AppShell,
  ScrollArea,
  Group,
  Avatar,
  ActionIcon,
  TextInput,
  Text,
  Box,
  Divider,
  Center,
} from '@mantine/core';
import {
  IconSearch,
  IconDotsVertical,
  IconMessagePlus,
  IconArrowRight,
  IconUserQuestion,
  IconUserPlus
} from '@tabler/icons-react';
import type { Chat } from './types/chat.types.d.ts';
import { ChatBox } from './components/ChatBox';
import { ChatLayout } from './components/ChatLayout.tsx';

const MOCK_CHATS: Chat[] = [

];

export const MainLayout = () => {
  const [mobileOpened, { close: closeMobile, open: openMobile }] = useDisclosure(true);

  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const activeChat = MOCK_CHATS.find((c) => c.id === selectedChatId);

  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
    closeMobile();
  };
  const filteredChats = MOCK_CHATS.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <AppShell
      padding={0}
      navbar={{
        width: { base: '100%', sm: 300, md: 350 },
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened },
      }}
    >
      <AppShell.Navbar style={{ height: '100vh', borderRight: '1px solid var(--mantine-color-gray-3)' }}>
        <AppShell.Section p="xs" bg="gray.1">
          <Group justify="space-between">
            <Avatar radius="xl" />
            <Text fw={700} size="md">Chats</Text>
            <Group gap={6}>
              <ActionIcon variant="subtle" color="gray" radius="xl" title="Nuevo chat">
                <IconUserPlus size={20} />
              </ActionIcon>
              <ActionIcon variant="subtle" color="gray" radius="xl" title="Opciones">
                <IconDotsVertical size={20} />
              </ActionIcon>
              <ActionIcon variant="subtle" color="gray" radius="xl" title="Cerrar barra" onClick={closeMobile} hiddenFrom="sm">
                <IconArrowRight size={20} />
              </ActionIcon>
            </Group>
          </Group>
        </AppShell.Section>
        <AppShell.Section p="xs">
          <TextInput
            placeholder="Search for chat or look someone to chat"
            leftSection={<IconSearch size={16} />}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            radius="md"
            size="xs"
          />
        </AppShell.Section>

        <Divider />
        <AppShell.Section
          grow component={ScrollArea}>
          <Box p="xs">
            {MOCK_CHATS.length === 0 ? (
              <Center>
                <Text c="dimmed" size="sm">You don't have any chats availables</Text>
              </Center>
            )
              : (
                filteredChats.map((chat) => {
                  const isSelected = chat.id === selectedChatId;
                  return (
                    <ChatBox isSelected={isSelected} chat={chat} handleSelectChat={handleSelectChat} />
                  );
                })
              )
            }
          </Box>
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        {activeChat ? (
          <ChatLayout openMobile={openMobile} activeChat={activeChat} />
        ) : (
          <Center h="100%" bg="gray.0">
            <Text c="dimmed">Select a chat to see the messages</Text>
          </Center>
        )}
      </AppShell.Main>
    </AppShell>
  );
}

