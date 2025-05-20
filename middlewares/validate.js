import { ZodError } from 'zod';

export const validate = (schema) => (req, res, next) => {
  try {
    console.log('Validando dados:', req.body);
    const parsed = schema.parse(req.body);
    req.body = parsed;
    next();
  } catch (error) {
    console.error('Erro de validação:', error);
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: 'Erro de validação',
        errors: error.errors,
      });
    }
    next(error);
  }
};
