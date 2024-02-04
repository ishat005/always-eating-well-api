const jwt = require('jsonwebtoken');
const SECRET_KEY = 'a6cfdc61521e915a69980ad06ab80a6e769c1e700818c885d31f2ce4d84b5127';

module.exports = (req, res, next) => {
    const bearerTokenString = req.headers.authorization;

    if (!bearerTokenString) {
        return res.status(401).json({error: "Resource requires Bearer token in Authorization header"});
    }

    const splitBearerTokenString = bearerTokenString.split(" ");

    if (splitBearerTokenString.length !== 2) {
        return res.status(400).json({error: "Bearer token is malformed"});
    }

    const token = splitBearerTokenString[1];

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({error: "Invalid JWT"});
        }
		delete req.password;
        req.user = decoded;
        next();
    });
}