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

export const Google = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email })
      console.log("FOund user")

      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = user._doc;
        res
          .cookie('access_token', token, { httpOnly: true })
          .status(200)
          .json(rest);
  
      } else {
        const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = new User({ username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4) , email: req.body.email, password: hashedPassword, avatar: req.body.photo });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = newUser._doc;
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
  
      }
    } catch (error) {
      next(error)
    }
  }