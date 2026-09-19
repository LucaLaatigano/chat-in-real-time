import { MainLayout } from "./MainLayout"
import { Routes, Route } from "react-router"
import { Login } from "./pages/Login.tsx"
import { Signup } from "./pages/Signup.tsx"
export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}