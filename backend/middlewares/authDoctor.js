import jwt from 'jsonwebtoken';

// Middleware to check if the doctor is authenticated
const authDoctor = async (req, res, next) => {
    try{
        const {dtoken} = req.headers;
        if(!dtoken) {
            return res.json({ success: false, message: "No token provided" });
        }
        // Verify the token
        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);

        req.body.docId = token_decode.id;
        next();
    }
    catch(error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

export default authDoctor;
