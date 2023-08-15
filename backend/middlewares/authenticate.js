var jwt = require('jsonwebtoken');




const authenticate =  async (req, res, next) => {
    
    
    const token = req.headers.authorization.split(" ")[1];
    
    
    if(!token){
       return res.status(401).send({msg:"Please Login Again"})
    }
    
    jwt.verify(token, process.env.token_key, function(err, decoded) {
            if(err){
                return res.status(401).send({msg:"Please Login Again"})
            }
            else{
                let data= req.body;
                let {userID}=decoded;
                data.userid=userID;
                next()
            }
      });

}




module.exports = {authenticate}