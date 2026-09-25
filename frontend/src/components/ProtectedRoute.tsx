import { useUser } from "../hooks/useUser";
import { Navigate, Outlet } from "react-router";
import { Center, Loader } from "@mantine/core";
export const ProtectedRoute = () => {
  const { data: user, isPending, isError } = useUser()
  if (isPending) {
    return (
      <>
        <Center style={{ height: "100vh" }}>
          <Loader size="xl" />
        </Center>
      </>
    )
  }
  if (isError || !user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />
}