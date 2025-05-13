const createHttpError = require('http-errors');  // Importação do pacote

const createPostController = async (req, res, next) => {
  try {
    const { conteudo, userId } = req.body;

    // Verificar se o conteúdo e o userId são fornecidos
    if (!conteudo || !userId) {
      return next(createHttpError(400, 'Campos obrigatórios ausentes.'));
    }

    // Criar o post com o modelo (supondo que a função createPostModel já exista)
    const postCriado = await createPostModel(conteudo, userId);

    // Retornar a resposta de sucesso
    res.status(201).json({
      message: 'Post criado com sucesso.',
      post: postCriado,
    });
  } catch (error) {
    // Caso haja erro ao tentar criar o post, chamar next() com erro 500
    next(createHttpError(500, 'Erro interno ao criar o post.'));
  }
};

module.exports = createPostController;
