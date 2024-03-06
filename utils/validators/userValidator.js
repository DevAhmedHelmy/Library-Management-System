const { body } = require('express-validator');
const respondWithValidationErrors = require('./validatorHelper');

const createUserValidator = async (req, res, next) => {
    await body('name')
        .isLength({ min: 4 })
        .withMessage('Name should not be less than 5 charactes')
        .isAlphanumeric()
        .withMessage('Name should only contains letters and numbers')
        .run(req);
    await body('email')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .escape()
        .run(req);
    await body('role')
        .optional()
        .isAlpha()
        .run(req);
    await body('password')
        .notEmpty()
        .withMessage('Password is required')
        .run(req);

    await respondWithValidationErrors(req, res, next);
}

module.exports = createUserValidator