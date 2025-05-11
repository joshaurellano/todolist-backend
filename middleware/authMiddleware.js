const jwt = require('jsonwebtoken')

const authenticateToken = async (req, res, next) => {
    // const token = req.cookies.token;
    const token = req.headers.authorization || req.cookies.token;
    if(!token) {
        return res.status(401).json({
            error:'Login first'
        })
    }
    try{
        const verified = jwt.verify(token,process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error){
        res.status(400).json({
            error:'Invalid Token'
        })
    }
}
module.exports = authenticateToken;