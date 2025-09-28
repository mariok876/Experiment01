"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const successResponse = (res, data, statusCode = 200) => {
    return res.status(statusCode).json({ success: true, data });
};
exports.successResponse = successResponse;
const errorResponse = (res, message, statusCode = 500) => {
    if (process.env.NODE_ENV === 'production') {
        return res.status(statusCode).json({ success: false, message: 'Something went wrong' });
    }
    return res.status(statusCode).json({ success: false, message });
};
exports.errorResponse = errorResponse;
