import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email().max(255),
  senha: z.string().min(8).max(255),
  usernick: z.string().min(3).max(50),
  nome: z.string().min(3).max(100),
  profilePicture: z.string().max(255).optional(),
  isadmin: z.boolean().optional(),
});
