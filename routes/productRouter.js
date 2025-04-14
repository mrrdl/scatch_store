const express = require('express')
const router=express.Router()
const multer=require('../config/multer-config')
const productModel=require('../models/product')
const ownerModel=require('../models/owner')
const isAuth=require('../middlewares/isAuth')


router.post("/create/:id",multer.single("image"),async (req,res) => {
    try{
        let{name,price,discount,bgcolor,panelcolor,textcolor}=req.body
        let product=await productModel.create({
            image:req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor
        })
        let owner=await ownerModel.findOne({_id:req.params.id})
        owner.products.push(product._id)
        await owner.save()
        req.flash("success","Product created successfully")
        res.redirect('/owners/admin')
    }catch(err){
        res.send(err.message)
    }
})



module.exports=router
