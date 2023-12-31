const { default: mongoose, Collection } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    phone : {
        type:Number,
        required:true,
        unique:true
    },
    password : {
        type:String,
        required:true
    },
    confpassword : {
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
});

userSchema.pre("save", async function (next) {

   if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
        this.confpassword = this.password;
   }
    next();
})

// generating token
userSchema.methods.generateAuthToken = async function () {

    try {
        const token = jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token})
        await this.save();
        return token;
    } catch (err) {
        res.send("the error is : ",err);
        console.log("the error is : ",err);
    }
 }

// creating Collection


const Register = new mongoose.model("User", userSchema);

module.exports = Register;