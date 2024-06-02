require("dotenv").config();
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirm_password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
});

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        const saltround = 10;
        this.password = await bcrypt.hash(this.password,saltround);
        this.confirm_password = await bcrypt.hash(this.confirm_password,saltround);
    }
})

userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password,this.password);
}


// // generate token
// userSchema.methods.generateToken = async function(){
//     try {
//         const token = await jwt.sign({
//             _id:this._id.toString(),
//         },
//         process.env.SECRETKEY,
//         {
//             expiresIn:"1d"
//         }
//     );
//     // Store token
//     this.tokens = this.tokens.concat({token:token});
//     await this.save();
//     // console.log(token);
//     return token;
//     } catch (error) {
//         console.log(error,"TOKEN ERROR!");
//     }
// }


const Register = new mongoose.model("RegisterUser",userSchema);

module.exports = Register;