const editInfoUserModel = require('../../models/perfil/editInfoUserModel');
const asyncHandler = require('../../utils/asyncHandler');
const createHttpError = require('http-errors');

const editInfoUser = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { nome, course, nascimento, bio } = req.body;

    const data = Object.entries({ nome, course, nascimento, bio })
        .reduce((acc, [key, value]) => {
            if (value !== '' && value !== null && value !== undefined) {
                acc[key] = value;
            }
            return acc;
        }, {});

    const resp = await editInfoUserModel(userId, data)
    


    res.status(200).json(resp)
});

module.exports = editInfoUser;