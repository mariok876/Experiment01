"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const errorHandler = (err, req, res, next) => {
    if (err instanceof zod_1.ZodError) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: err.flatten(),
        });
    }
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ message: 'Invalid token' });
    }
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong' });
};
exports.errorHandler = errorHandler;
