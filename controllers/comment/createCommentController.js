// controllers/comment/createCommentController.js

const createCommentModel = require('./createComment');
const createHttpError = require('http-errors');

async function createCommentController(req, res, next) {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    if (!content || content.trim() === '') {
      throw createHttpError(400, 'O comentário não pode estar vazio');
    }

    const comment = await createCommentModel(postId, content, userId);
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
}

module.exports = createCommentController;
