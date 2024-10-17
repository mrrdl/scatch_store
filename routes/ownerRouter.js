const express = require('express')
const router=express.Router()
const ownerModel=require('../models/owner')

router.get('/create',(req,res) => {
    res.render("owner")
})

router.post('/create',async (req,res) => {
    let owner=await ownerModel.find()
    if(owner.length>0){
        req.flash("Oops,Owner Already Existed")
        res.redirect('/owners/admin')
    }
    let{fullname,email,password}=req.body

    let createOwner=await ownerModel.create({
        fullname,
        email,
        password
    })
    req.flash("Owner Created Successfully")
    res.redirect('/owners/admin')
})

router.get("/admin",async (req,res) => {
    let user=await ownerModel.findOne()
    let success=req.flash("success")
    res.render("createProduct",{success,user})
})

module.exports=router
