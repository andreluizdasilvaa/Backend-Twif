const express = require('express');
const router = express.Router();
const { auth_user } = require('../middlewares/auth'); // Corrigir o caminho, se necessário

const posts = require('../controllers/feed/listPostsController');
const searchPostId = require('../controllers/feed/searchPostIdController');
const createPost = require('../controllers/feed/createPostController');
const likedPostOrNot = require('../controllers/feed/likedPostOrNotController');
const deletePostId = require('../controllers/feed/deletePostIdController');

router.get('/posts', auth_user, posts); // Rota protegida por autenticação
router.get('/posts/:postId', searchPostId);
router.post('/create/post', auth_user, createPost); // Rota protegida por autenticação
router.post('/posts/:postId/like', auth_user, likedPostOrNot); // Rota protegida por autenticação
router.delete('/delete/post', auth_user, deletePostId); // Rota protegida por autenticação

module.exports = router;
