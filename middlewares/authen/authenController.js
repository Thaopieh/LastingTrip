const jwt = require('jsonwebtoken');
const { SECRET_KEY, REFRESH_SECRET_KEY } = require('../config/config');
const {users} = require('../../models/user')

// Tạo Access Token
function generateAccessToken(user) {
    return jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
}

// Tạo Refresh Token
function generateRefreshToken(user) {
    return jwt.sign(user, REFRESH_SECRET_KEY);
}

// Lưu trữ refresh tokens (có thể thay bằng database)
let refreshTokens = [];

// Đăng nhập và tạo access token, refresh token
exports.login = function(req, res) {
    const { name } = req.body;
    const user = users.find(u => u.name === name);
    if (user) {
        const accessToken = generateAccessToken({ name: user.name, role: user.role, department: user.department });
        const refreshToken = generateRefreshToken({ name: user.name, role: user.role, department: user.department });

        // Lưu refresh token
        refreshTokens.push(refreshToken);

        // Gửi refresh token qua cookie, access token qua body
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
        return res.json({ accessToken });
    }
    res.sendStatus(401);
    return null;
};


// Đăng xuất và xóa refresh token
exports.logout = (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    refreshTokens = refreshTokens.filter(token => token !== refreshToken);
    res.clearCookie('refreshToken');
    res.sendStatus(204);
};
