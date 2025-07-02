import jwt from 'jsonwebtoken';

// Middleware to check if the user is authenticated
const authUser = async (req, res, next) => {
    try{
        const {token} = req.headers;
        if(!token) {
            return res.json({ success: false, message: "No token provided" });
        }
        // Verify the token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = token_decode.id;
        next();
    }
    catch(error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

export default authUser;
