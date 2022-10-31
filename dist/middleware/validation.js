"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = exports.validateUserSignUp = void 0;
const express_validator_1 = require("express-validator");
exports.validateUserSignUp = [
    (0, express_validator_1.body)("name")
        .trim()
        .not()
        .isEmpty()
        .withMessage("User name must be within 3 to 20 charater"),
    (0, express_validator_1.body)("email")
        .normalizeEmail({ gmail_remove_dots: false })
        .isEmail()
        .withMessage("Invalid email"),
    (0, express_validator_1.body)("password")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Password is empty ! Password must be 4 to 20 characters long !"),
    (0, express_validator_1.body)("confirmpassword")
        .trim()
        .not()
        .isEmpty()
        .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Password confirmation does not match password");
        }
        return true;
    }),
];
const userValidation = (req, res, next) => {
    const result = (0, express_validator_1.validationResult)(req).array();
    if (!result.length)
        return next();
    const error = [];
    for (let i = 0; i < result.length; i++) {
        const data = {
            nameErr: result[i].param,
            error: result[i].msg,
        };
        error.push(data);
    }
    res.json({ success: false, message: error });
};
exports.userValidation = userValidation;
//# sourceMappingURL=validation.js.map