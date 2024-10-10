const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/config');
const { checkAccess } = require('./abacpolicy');

// Middleware để xác thực JWT và kiểm tra quyền truy cập tài nguyên
exports.authenticateAndAuthorize = (action) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.sendStatus(403);
        }

        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(401).json({ message: 'Token expired, please refresh.' });
            }

            // Lưu thông tin người dùng vào request
            req.user = user;

            // Kiểm tra quyền truy cập tài nguyên với ABAC
            const resourceId = parseInt(req.params.id);
            const hasAccess = checkAccess(resourceId, user, action);

            if (!hasAccess) {
                return res.sendStatus(403); // Forbidden nếu không có quyền truy cập
            }

            // Nếu hợp lệ, chuyển tiếp đến xử lý tiếp theo
            next();
        });
    };
};
