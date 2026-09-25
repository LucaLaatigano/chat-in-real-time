import { Center, Container, Title, Paper, TextInput, PasswordInput, Button, SimpleGrid, Stack, Group } from "@mantine/core";
import { useNavigate } from "react-router";
import { useForm } from '@mantine/form';
import { useSignup } from "../hooks/useSignUp";
import { useLogin } from "../hooks/useLogin";
export const Signup = () => {
  const navigate = useNavigate()
  const { mutate: mutateSignup, isPending, isIdle } = useSignup()
  const { mutate: mutateLogin } = useLogin()
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 6 ? 'Debe tener al menos 6 caracteres' : null),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Las contraseñas no coinciden' : null,
    }
  })
  const handleSubmit = (values: typeof form.values) => {
    mutateSignup({
      name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      profile_photo: null,
      password: values.password
    }, {
      onSuccess: () => {
        mutateLogin({
          email: values.email,
          password: values.password
        }, {
          onSuccess: () => {
            navigate('/')
          }
        })
      }
    })
  }
  return (
    <>
      <Center>
        <Container size={520} my={60}>
          <Title ta="center" style={{
            color: 'black'
          }}>
            Create an account
          </Title>
          <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
            <Stack>
              <form onSubmit={form.onSubmit(handleSubmit)}>
                <SimpleGrid cols={{ base: 1, sm: 2 }}>
                  <TextInput key={form.key('firstName')} {...form.getInputProps('firstName')} label="First Name" placeholder="Pedro" required radius="md" />
                  <TextInput key={form.key('lastName')} {...form.getInputProps('lastName')} label="Last Name" placeholder="Gonzalez" required radius="md" />
                </SimpleGrid>
                <TextInput key={form.key('email')} {...form.getInputProps('email')} label="Email" placeholder="you@mantine.dev" required radius="md" />
                <SimpleGrid cols={{ base: 1, sm: 2 }}>
                  <PasswordInput key={form.key('password')} {...form.getInputProps('password')} name='password' label="Password" placeholder="Your password" required mt="md" radius="md" />
                  <PasswordInput key={form.key('confirmPassword')} {...form.getInputProps('confirmPassword')} label="Confirm password" placeholder="Confirma password" required mt="md" radius="md" />
                </SimpleGrid>
                <Group>
                  <Button type='button' mt="xl" radius="md" flex={1} variant="subtle" bd="1px solid var(--mantine-color-blue-6)" onClick={() => navigate('/login')}>
                    Back to login
                  </Button>
                  <Button disabled={isPending} type='submit' mt="xl" radius="md" flex={1}>
                    Sign up
                  </Button>
                </Group>
              </form>
            </Stack>
          </Paper>
        </Container>
      </Center>
    </>
  );
};


export const Singup = Signup;