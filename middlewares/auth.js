const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

async function auth_user(req, res, next) {
    const token = req.cookies['your-session'];

    if (!token) {
        console.log("Token não encontrado, acesso negado."); // Log para verificar se o token está ausente
        return res.status(401).json({ 
            error: "Unauthorized", 
            message: "Acesso negado. Faça login para continuar." 
        });
    }

    jwt.verify(token, process.env.jwt_secret, async (err, decoded) => {
        if (err) {
            console.error(`Erro ao verificar token: ${err.message}`); // Log detalhado para erros de token
            return res.status(403).json({ 
                error: "Invalid Token", 
                message: "Token inválido ou expirado. Faça login novamente." 
            });
        }

        try {
            const user = await prisma.user.findUnique({
                where: { id: decoded.id }
            });

            if (!user) {
                console.log("Usuário não encontrado no banco."); // Log caso o usuário não seja encontrado
                return res.status(404).json({ 
                    error: "User Not Found", 
                    message: "Usuário não encontrado. Faça login novamente." 
                });
            }

            req.user = user; // Passa o objeto completo do usuário para a requisição
            next();
        } catch (dbError) {
            console.error('Erro ao acessar o banco de dados:', dbError); // Log para erros de banco de dados
            return res.status(500).json({ 
                error: "Internal Server Error", 
                message: "Ocorreu um erro ao verificar sua conta. Tente novamente mais tarde." 
            });
        }
    });
}

module.exports = { auth_user };
