import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        resuired:true,
        unique:true,
    },
    email:{
        type:String,
        resuired:true,
        unique:true,
    },
    password:{
        type:String,
        resuired:true,
    },
    
},{timestamps:true});

const User = mongoose.model('User',userSchema);

export default User;