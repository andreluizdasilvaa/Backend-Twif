import { z } from 'zod';

export const postDeletedSchema = z.object({
  postId: z.number(),
  content: z.string().max(500),
  userId: z.number(),
});
