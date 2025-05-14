const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

async function auth_user(req, res, next) {
    let token;

    // Primeiro tenta pegar do Authorization Header
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1]; // pega só o token
    } else {
        // Se não tiver no header, tenta pegar do cookie
        token = req.cookies['your-session'];
    }

    if (!token) {
        return res.status(401).json({ 
            error: "Unauthorized", 
            message: "Acesso negado. Faça login para continuar." 
        });
    }

    jwt.verify(token, process.env.jwt_secret, async (err, decoded) => {
        if (err) {
            console.error(`Erro ao verificar token: ${err.message}`);
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
                return res.status(404).json({ 
                    error: "User Not Found", 
                    message: "Usuário não encontrado. Faça login novamente." 
                });
            }

            req.user = user; // Continua igual
            next();
        } catch (dbError) {
            console.error('Erro ao acessar o banco de dados:', dbError);
            return res.status(500).json({ 
                error: "Internal Server Error", 
                message: "Ocorreu um erro ao verificar sua conta. Tente novamente mais tarde." 
            });
        }
    });
}

module.exports = { auth_user };