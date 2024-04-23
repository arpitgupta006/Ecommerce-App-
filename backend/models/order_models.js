const mongoose = require('mongoose');

const orderSchema= new mongoose.Schema({
    fullName:{
        type: String,
        required:true
    },
    address:{
        type: String,
        required:true
    },
    product:{
        type: String,
        required:true
    },
    quantity:{
        type: String,
        required:true
    },
    amount:{
        type: String,
        required:true
    }
  
});

mongoose.model("OrderEcommModel" , orderSchema)