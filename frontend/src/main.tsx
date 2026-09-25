import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router';
import { QueryClient, QueryClientProvider, MutationCache, QueryCache } from '@tanstack/react-query';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { notifications, Notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
const client = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (mutation.meta?.ignoreGlobalError) return;
      notifications.show({
        title: 'Error',
        message: error.message,
        color: 'red',
        position: 'top-right',
        withCloseButton: false,
        icon: <IconX />,
        autoClose: 3000,
      });
    },
  }),
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.meta?.ignoreGlobalError) return;

      notifications.show({
        title: 'Error al cargar datos',
        message: error.message,
        color: 'red',
        position: 'top-right',
        withCloseButton: false,
        autoClose: 3000,
        icon: <IconX />
      });
    },
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
})
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <MantineProvider>
          <Notifications />
          <App />
        </MantineProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
