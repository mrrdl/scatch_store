const mongoose=require('mongoose')

const productSchema=mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number },
    bgcolor: { type: String },
    panelcolor: { type: String },
    textcolor: { type: String },
    image: { type: Buffer },
    availability:{type:Boolean,default:true}
})

module.exports=mongoose.model("product",productSchema)