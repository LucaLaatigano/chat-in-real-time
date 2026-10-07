import { QueryClient, MutationCache, QueryCache } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (mutation.meta?.ignoreGlobalError) return;
      notifications.show({
        title: 'Error',
        message: error.message,
        color: 'red',
        position: 'top-right',
        withCloseButton: false,
        autoClose: 3000,
        icon: <IconX />,
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
        icon: <IconX />,
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
});