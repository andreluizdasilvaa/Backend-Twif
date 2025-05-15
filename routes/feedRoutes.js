// routes/feedRoutes.js
const express = require('express');
const router = express.Router();
const { auth_user } = require('../middlewares/auth');

const posts = require('../controllers/feed/listPostsController');
const searchPostId = require('../controllers/feed/searchPostIdController');
const createPost = require('../controllers/feed/createPostController');
const likedPostOrNot = require('../controllers/feed/likedPostOrNotController');
const deletePostId = require('../controllers/feed/deletePostIdController');

router.get('/posts', auth_user, posts);
router.get('/posts/:postId', auth_user, searchPostId);
router.post('/create/post', auth_user, createPost);
router.post('/posts/:postId/like', auth_user, likedPostOrNot);
router.delete('/delete/post/:postId', auth_user, deletePostId);

module.exports = router;
