"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error(err);
    if (process.env.NODE_ENV === 'production') {
        return res.status(500).json({ message: 'Something went wrong' });
    }
    return res.status(500).json({ message: err.message, stack: err.stack });
};
exports.errorHandler = errorHandler;
