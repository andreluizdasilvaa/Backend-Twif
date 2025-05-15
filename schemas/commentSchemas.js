import { z } from 'zod';

export const commentSchema = z.object({
  content: z.string().min(1, 'O comentário não pode estar vazio').max(500, 'Comentário muito longo'),
  // userId e postId não precisam vir no corpo, porque vêm da URL e do token,
  // então não precisa validar aqui no corpo, pode remover do schema se quiser.
});
