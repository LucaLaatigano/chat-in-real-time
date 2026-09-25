import { MainLayout } from "./MainLayout"
import { Routes, Route } from "react-router"
import { Login } from "./pages/Login.tsx"
import { Signup } from "./pages/Signup.tsx"
import { ProtectedRoute } from "./components/ProtectedRoute.tsx"
export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainLayout />} />
      </Route>
    </Routes>
  )
}