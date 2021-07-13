import * as z from 'zod'

export const UserSchema = z.object({
    name: z.string().nonempty(),
    email: z.string().email(),
    address:z.string().nonempty()
})

export type User = z.infer<typeof UserSchema>;