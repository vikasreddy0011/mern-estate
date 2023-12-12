import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

export const signup = async (req,res,next)=>{
    const {username ,email, password} = req.body;
    const hashPassword = bcryptjs.hashSync(password,10);
    const user = new User({username ,email, password:hashPassword} );
    try{
        await user.save();
        res.status(201).json("User created sucessfully");
    }catch(err){
        next(errorHandler(500,'Error creating an error'))
    }

}