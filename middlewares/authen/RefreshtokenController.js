const jwt = require('jsonwebtoken');
const { REFRESH_SECRET_KEY } = require('../config/config');

// Lưu trữ refresh tokens
let refreshTokens = [];

// Tạo Access Token từ Refresh Token
function generateAccessToken(user) {
    return jwt.sign(user, 'your-secret-key', { expiresIn: '1h' });
}

// Làm mới Access Token
exports.refreshToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken || !refreshTokens.includes(refreshToken)) {
        return res.sendStatus(403); // Forbidden nếu không có refresh token hợp lệ
    }

    jwt.verify(refreshToken, REFRESH_SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);

        const accessToken = generateAccessToken({ name: user.name, role: user.role, department: user.department });
        res.json({ accessToken });
    });
};
