import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/auth";

export const useUser = () => {
  return useQuery({
    queryKey: ["auth-user"],
    queryFn: async () => {
      const data = await getMe()
      return data.user
    },
    meta: {
      ignoreGlobalError: true,
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  })
}