import jwt from 'jsonwebtoken';

// Middleware to check if the user is an admin
const authAdmin = async (req, res, next) => {
    try{
        const {atoken} = req.headers;
        if(!atoken) {
            return res.json({ success: false, message: "No token provided" });
        }
        // Verify the token
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
        if(token_decode === process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            next(); // User is admin, proceed to the next middleware or route handler
        }
    }
    catch(error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

export default authAdmin;
