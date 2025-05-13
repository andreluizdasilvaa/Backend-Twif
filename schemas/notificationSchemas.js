import { z } from 'zod';

export const notificationSchema = z.object({
  userId: z.number(),
  triggeredById: z.number(),
  postId: z.number().optional(),
  postDeletedId: z.number().optional(),
  action: z.string().max(100),
  isViewed: z.boolean().optional(),
});
