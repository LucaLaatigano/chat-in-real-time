import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  Center,
  Stack
} from '@mantine/core';
import { useLogin } from '../hooks/useLogin.ts';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';

export const Login = () => {
  const { mutate: mutateLogin } = useLogin()
  const navigate = useNavigate()
  const client = useQueryClient()
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget) //currentTarget the element that was listening to the event when it triggers, un target is the element that triggers the event
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    mutateLogin({ email, password }, {
      onSuccess: () => {
        notifications.show({
          id: 'notification',
          title: 'Logged in',
          message: 'You have entered to your account',
          position: 'top-right',
          icon: <IconCheck />,
          withCloseButton: false,
          autoClose: 3000,
          color: 'green'
        })
        client.invalidateQueries({ queryKey: ['auth-user'] });
        navigate("/")
      },
    })
  }
  return (
    <Center>
      <Container size={520} my={60}>
        <Stack gap="md">
          <Title ta="center" style={{
            color: 'black'
          }}>
            Welcome to my chat!
          </Title>

          <Text>
            Do not have an account yet? <Anchor onClick={() => navigate('/signup')}>Create account</Anchor>
          </Text>

          <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
            <form onSubmit={handleSubmit}>
              <TextInput name='email' label="Email" placeholder="you@mantine.dev" required radius="md" />
              <PasswordInput name='password' label="Password" placeholder="Your password" required mt="md" radius="md" />
              <Group justify="space-between" mt="lg">
                <Anchor component="button" size="sm">
                  Forgot password?
                </Anchor>
              </Group>
              <Button type='submit' fullWidth mt="xl" radius="md">
                Sign in
              </Button>
            </form>
          </Paper>
        </Stack>
      </Container>
    </Center>
  );
}