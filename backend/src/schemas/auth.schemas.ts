import z from "zod"

export const userDataSchema = z.object({
  name: z.string(),
  last_name: z.string(),
  email: z.email().max(255),
  profile_photo: z.string().optional().nullable(),
  password: z.string()
})
