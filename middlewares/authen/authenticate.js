const jwt = require('jsonwebtoken')
const authenticate = (req,res,next) =>
{
    const token = req.header("token");
    try{
       
        const decode = jwt.verify(token,"firewallbase64");
        console.log("decode : ", decode)
        if (decode)
        {
            req.user =decode;
            return next();
        }
        else{
            res.status(401).send("Bạn chưa đăng nhập")
        }
    }
    catch(error)
    {
        res.status(401).send(error);
    }
   
};
module.exports = {
    authenticate,
}