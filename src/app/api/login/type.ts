import { z } from "zod";

export const LoginRequestSchema = z.object({
    email: z.email(),
    password: z.string(),
});

// 想了解一下z.infer的用法,是什么
export type LoginRequest = z.infer<typeof LoginRequestSchema>;