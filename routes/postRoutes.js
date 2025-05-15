const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { auth_user } = require('../middlewares/auth');

// Aqui vão suas rotas...

// Cole o código do endpoint aqui
router.get('/feed/posts/:postId', auth_user, async (req, res) => {
  try {
    const postId = parseInt(req.params.postId, 10);
    if (isNaN(postId)) {
      return res.status(400).json({ error: "ID do post inválido." });
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({ error: "Post não encontrado." });
    }

    res.json(post);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno ao buscar post." });
  }
});

// Exporta o router para ser usado no app principal
module.exports = router;
