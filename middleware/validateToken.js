const jwt = require('jsonwebtoken');

exports.validateToken = async (req, res,next) => {
    try {
        const t = req.headers.authorization;
        if (t !== undefined) {
            const token = req.headers.authorization.split(" ")[1];
            const userInfo = await jwt.verify(token, process.env.JWT_LOGIN_SECRET);

            if (!userInfo || !token) {
                return res.status(401).json({ error: "Invalid Token" });
            }

            if (userInfo) {
                req.user = userInfo;
                next();
            } else {
                return res.status(401).json({ error: "Logout and Login again" });
            }
        } else {
            return res.status(401).json({ error: "Token not provided" });
        }
    } catch (error) {
        return res.status(401).json({ error: "Token is expire or invalid" });
    }
}