const createPostModel = require('../../models/feed/createPostModel');
const asyncHandler = require('../../utils/asyncHandler');

const createPost = asyncHandler(async (req, res) => {
    const { conteudo } = req.body;
    const userId = req.user.id;

    if (!conteudo || conteudo.trim() === '') {
        throw createHttpError(400, 'O conteúdo do post não pode estar vazio');
    }

    if (conteudo.length > 191) {
        throw createHttpError(400, 'O conteúdo do post não pode exceder 191 caracteres');
    }

    await createPostModel(conteudo, userId);

    res.status(201).json({msg: "Post criado com sucesso!"});
});

module.exports = createPost;