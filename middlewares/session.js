const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

function generate_token_user(user, req, res, next) {
    const token = jwt.sign({ id: user.id, isadmin: user.isadmin }, process.env.jwt_secret, { expiresIn: '2d' }); // 2 dias

    res.cookie('your-session', token, {
        httpOnly: true,
        maxAge: 2 * 24 * 60 * 60 * 1000, // 2 dias em ms
        path: '/',
        sameSite: "None",
        secure: true
    });
    
    res.locals.token = token;
    next();
}

function remove_session(req, res) {
    try {
        res.clearCookie('your-session', { path: '/' });
        res.status(200).json({ message: 'Sessão encerrada!' });
    } catch (error) {
        console.error('Erro ao encerrar sessão do usuário:', error);
        res.status(500).json({ message: 'Erro interno ao encerrar sessão, entre em contato com o suporte' });
    }
};

module.exports = { generate_token_user, remove_session };
