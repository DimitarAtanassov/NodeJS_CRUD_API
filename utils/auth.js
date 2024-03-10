const jwt = req("jsonwebtoken");
require('dotenv').config();

const verifyToken = (req,res,next) => {
    const token = req.session.token;

    if (!token)
    {
        return res.status(403).json({message: "No JWT found!"});
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err)
        {
            return res.status(401).json({message:"Unauthorized"});
        }
        req.userId = decoded.id;
        next();
    });
};

module.exports = verifyToken;
