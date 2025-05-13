const express = require('express');
const router = express.Router();
const { auth_user } = require('../middlewares');
const { validate } = require('../middlewares/validate');
const { commentSchema } = require('../schemas/commentSchemas');

const listComment = require('../controllers/comment/listCommentController');
const createComment = require('../controllers/comment/createCommentController');
const deleteComment = require('../controllers/comment/deleteCommentController');

router.get('/posts/:postId/comments', auth_user, listComment);
router.post('/posts/:postId/comments', auth_user, validate(commentSchema), createComment);
router.delete('/feed/posts/:postId/comments/:commentId', auth_user, deleteComment);

module.exports = router;
