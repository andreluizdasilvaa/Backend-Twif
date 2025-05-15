// controllers/auth/logoutController.js
const logout = (req, res) => {
    try {
      // Se estiver usando tokens JWT, o logout pode ser tratado no cliente.
      // Caso utilize sessões no servidor, destrua a sessão aqui.
      res.status(200).json({ message: 'Logout realizado com sucesso.' });
    } catch (error) {
      console.error('Erro ao encerrar sessão:', error);
      res.status(500).json({ message: 'Erro interno ao encerrar sessão.' });
    }
  };
  
  module.exports = logout;
  