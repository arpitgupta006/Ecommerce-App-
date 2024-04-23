const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const itemSchema= new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    price:{
        type: Number,
        required:true
    },
    image:{
        type: String,
        default:'https://pngtree.com/freebackground/builder-posing-in-photo-studio-3d-realistic_2615197.html'
    },
    reviews:[
        {
            reviewText:String,
            star: String 
        }
    ]
});

mongoose.model("ItemEcommModel" , itemSchema)