const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const userModel=require('../models/userModel')
module.exports.hashedPassword=async (password)=>{
    const salt=await bcrypt.genSalt(10);
    const hashed=await bcrypt.hash(password,salt);
    return hashed;
}
module.exports.generateToken=(user)=>{
    const token=jwt.sign(user,process.env.JWT_KEY,{
        expiresIn:'7d'
    })
    return token;
}
module.exports.protect=async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token=req.headers.authorization.split(' ')[1];
            const decoded=jwt.verify(token,process.env.JWT_KEY);
            req.user=await userModel.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({
                error:[{msg:`Not authorized token failed`}]
            });
            
        }
    }
    if(!token){
        res.status(401).json({
            error:[{msg:`Not authorized token failed`}]
        });
        
    }
}
module.exports.matchpassword=async(password,dbpassword)=>{
    return await bcrypt.compare(password,dbpassword);
}