const express = require('express')
const router=express.Router()
const ownerModel=require('../models/owner')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const { generateToken } = require('../utils/generateToken')
const cookieParser=require('cookie-parser')
const isAuth=require('../middlewares/isAuth')

router.get('/create',(req,res) => {
    res.render("owner")
})

router.post('/createuser',async (req,res) => {
    let{fullname,email,password}=req.body
    let owner=await ownerModel.findOne({email:email})
    if(owner){
        bcrypt.compare(password,owner.password,(err,result) => {
            if(result){
                let token=generateToken(owner)
                res.cookie("token",token)
                req.flash("login","Login Success")
                return res.redirect('/owners/admin')
            }
            else{
                req.flash("false","Login Fail")
                return res.redirect('/owners/create')
            }
        })
    }
    else{
        bcrypt.genSalt(10,(err,salt) => {
            bcrypt.hash(password,salt,async (err,hash) => {
                let createOwner=await ownerModel.create({
                    fullname,
                    email,
                    password:hash
                })
                let token=generateToken(createOwner)
                res.cookie("token",token)
            })
        })
        req.flash("Success","Owner Created Successfully")
        res.redirect('/owners/admin')
    }
})

router.get("/admin",async (req,res) => {
    const token=req.cookies.token
    const decoded=jwt.verify(token,process.env.JWT_KEY)
    let user=await ownerModel.findOne({ _id:decoded._id})
    let success=req.flash("success")
    let login=req.flash("login")
    let falseLog=req.flash("false")
    let Success=req.flash("Success")
    res.render("createProduct",{success,user,login,Success,falseLog})
})

module.exports=router
