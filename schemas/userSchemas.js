const { z } = require('zod');

// Esquema de registro (Cadastro de usuário)
const registerSchema = z.object({
  email: z.string().email(),
  senha: z.string().min(8), // Senha deve ter no mínimo 8 caracteres
  usernick: z.string().min(3), // usernick deve ter no mínimo 3 caracteres
  nome: z.string().min(3), // nome do usuário
  nascimento: z.string(), // data de nascimento opcional
  curso: z.string(), // curso do usuário
});

// Esquema de login (Login de usuário)
const loginSchema = registerSchema.omit({
  usernick: true,  // Não precisa do usernick para o login
  nome: true,      // Não precisa do nome para o login
  nascimento: true,// Não precisa da data de nascimento
  curso: true      // Não precisa do curso para o login
});

module.exports = { registerSchema, loginSchema };
