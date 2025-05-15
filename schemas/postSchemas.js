// schemas/postSchemas.js
const { z } = require('zod');

const createPostSchema = z.object({
  content: z.string().min(1).max(191),
  userId: z.number().int()
});

const deletePostSchema = z.object({
  postId: z.number().int()
});

module.exports = { createPostSchema, deletePostSchema };
