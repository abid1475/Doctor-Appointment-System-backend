import jwt from 'jsonwebtoken'
import userModel from '../models/user.js'
import bcrypt from 'bcrypt'


// Token
const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:"30d"})
}

// Registeration
export const registerController =async (req, res)=>{
    try {
        const {fullName, email, password, phone, role} = req.body

        // If user already exist
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }

        // password to hashedPassword

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

      const user = await userModel.create({
        fullName,
        email,
        password:hashedPassword,
        phone, 
        role,
      })
      res.status(201).json({
        success:true,
        message:"User registered successfully",
        user,
        token:generateToken(user._id),
      });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


// Login
export const loginController = async(req, res) =>{
   try {
  const {email, password}  = req.body

  const user = await userModel.findOne({email});
   if(!user){
    return res.status(400).send({
        success:false,
        message:"Invalid email or password",
    })
   }

   const isMatch = await bcrypt.compare(password, user.password);

   if(!isMatch){
     return res.status(400).json({
        success:false,
        message:"Invalid email or password"
     })
   }
      return res.status(200).json({
        success:true,
        message:"Login successful",
        user,
        token:generateToken(user._id),
      })
   } catch (error) {
    return res.status(500).json({
        success:false,
        message:error.message,
    })
   }
}