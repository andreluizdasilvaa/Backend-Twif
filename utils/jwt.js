const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id },          // O id do usuário no payload
    process.env.JWT_SECRET,   // Sua chave secreta
    { expiresIn: '1h' }       // Expira em 1 hora
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
