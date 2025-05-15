const listPostModel = require('../../models/feed/listPostsModel');
const asyncHandler = require('../../utils/asyncHandler');

const posts = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5; // Reduzi para 5 itens por página para testar

    const result = await listPostModel(userId, page, limit);

    res.status(200).json({
        success: true,
        posts: result.posts,
        currentPage: page,
        totalPages: Math.ceil(result.totalPosts / limit),
        totalPosts: result.totalPosts
    });
});

module.exports = posts;