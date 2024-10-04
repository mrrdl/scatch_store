const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    fullname:{
        type:String,
        minlength:3,
        trim:true
    },
    email:String,
    password:String,
    cart:[],
    isAdmin:Boolean,
    orders:[],
    contact:Number,
    picture:String
})

module.exports=mongoose.model("user",userSchema)