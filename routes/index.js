const express = require('express')
const router=express.Router()
const isloggedin = require('../middlewares/isloggedin')
const productModel=require('../models/product')
const userModel=require('../models/user')

router.get('/',(req,res) => {
    let error=req.flash("error")
    res.render("index",{error,loggedin:false})
})

router.get('/shop',isloggedin,async (req,res) => {
    let products=await productModel.find()
    let success=req.flash("success")
    res.render('shop',{products,success})
})

router.get('/cart',isloggedin,async (req,res) => {
    let user=await userModel.findOne({email:req.user.email}).populate("cart")
    const bill=Number(user.cart[0].price)+20-Number(user.cart[0].discount)
    res.render("cart",{user,bill})
})

router.get('/addcart/:id',isloggedin,async (req,res) => {
    let user=await userModel.findOne({email:req.user.email})
    user.cart.push(req.params.id)
    await user.save()
    req.flash("success","product added to cart")
    res.redirect('/shop')
})

module.exports=router