const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        // Get token from the authorization header
        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).send({
                success: false,
                message: 'Authorization token is missing or invalid',
            });
        }

        // Extract the token (Bearer <token>)
        const token = authHeader.split(' ')[1];

        // Verify the token
        JWT.verify(token, process.env.JWT_SECRET, (error, decode) => {
            if (error) {
                return res.status(401).send({
                    success: false,
                    message: 'Unauthorized user',
                });
            } else {
                // Attach the decoded id to the request body
                req.body.id = decode.id;
                next();
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'An error occurred during authentication',
            error,
        });
    }
};
