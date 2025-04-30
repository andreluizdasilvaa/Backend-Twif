const asyncHandler = require('../../utils/asyncHandler');

const validateController = asyncHandler(async (req, res) => {
    return res.status(200).json({
        isAuthenticated: true,
        isAdmin: req.user.isadmin,
        user: {
            id: req.user.id,
            nome: req.user.nome,
            usernick: req.user.usernick,
            profilePicture: req.user.profilePicture
        }
    });
    
})

module.exports = validateController;