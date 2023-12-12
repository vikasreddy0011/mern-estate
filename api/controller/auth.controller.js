import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export const signup = async (req,res)=>{
    const {username ,email, password} = req.body;
    const hashPassword = bcryptjs.hashSync(password,10);
    console.log(hashPassword)
    const user = new User({username ,email, password:hashPassword} );
    try{
        await user.save();
        res.status(201).json("User created sucessfully");
    }catch(err){
        res.status(500).json(err.message)
    }

}