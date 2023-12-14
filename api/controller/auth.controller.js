import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import  jwt from 'jsonwebtoken';

export const signup = async (req,res,next)=>{
    const {username ,email, password} = req.body;
    try{
        const hashPassword = bcryptjs.hashSync(password,10);
        const user = new User({username ,email, password:hashPassword} );
        await user.save();
        res.status(201).json("User created sucessfully");
    }catch(err){
        console.log(err)
        next(errorHandler(500,err.message))
    }

}

export const Signin = async (req,res,next)=>{
    const {email,password} = req.body;

    try{
        var validUser = await User.findOne({email:email})
        if (!validUser) return next(errorHandler(404,"User doen't exists"));
        const validPassword = bcryptjs.compareSync(password,validUser.password);
        if(!validPassword) return next(errorHandler(404,"Password not matching"));
        const token = jwt.sign({is:validUser._id},process.env.JWT_SECRET)   
        const {password:pass,...rest} = validUser._doc;
        res
        .cookie('access_token',token,{httpOnly: true , expires:new Date(Date.now()+ 24* 60 *60*1000)})
        .status(200)
        .json(rest);    
    }catch(err){
        next(err);
    }
}