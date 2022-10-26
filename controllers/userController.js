
const userModel=require('../models/userModel');
const { hashedPassword, generateToken, matchpassword } = require('../services/authServices');

module.exports.registerUser=async(req,res)=>{
      const {name,email,password,admin}=req.body;
      
      try {
         const emailExist=await userModel.findOne({email});
         if(!emailExist){
            const hashed =await hashedPassword(password);
            const user=await userModel.create({name,email,password:hashed,admin});
            return res.status(201).json({msg:'Your Account has been created'});
         }
         else{
            return res.status(401).json({
                errors:[{msg:`${email} already in use`}]
            })
         }
      } catch (error) {
          return res.status(500).json([{msg:`Server internal error`}])
      }
    }
   


module.exports.loginUser=async(req,res)=>{
    const {email,password}=req.body;
         try {
             const user = await userModel.findOne({email});
             if(user && await matchpassword(password,user.password)){
                   const token=generateToken({id:user._id,name:user.name});
                   if(user.admin){
                        return res.status(201).json({
                            token,
                            admin:true
                        })
                   }
                   else{
                    return res.status(201).json({
                        token,
                        admin:false
                    })
                   }
             }
             else{
                return res.status(401).json({
                    errors:[{msg:`Invalid credentials`}]
                })
             }
         } catch (error) {
            console.log(error.message);
             return res.status(500).json('Server Internal error')
         }
}


module.exports.listAllUser=async(req,res)=>{
      let user=req.user;
      if(user.admin){
          const allUser=await userModel.find({admin:false});
          return res.status(201).json({
           allUser
        })
      }
      else{
        res.status(401).json({
            error:[{msg:`Not authorized user`}]
        })
      }
}