
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const imagePath = '/uploads';
const userSchema = mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        required:true,
    },
    password:{
        type: String,
        required:true,
    },
    gender:{
        type: String,
        required:true,
    },
    hobby:{
        type: Array,
        required:true,
    },
    city:{
        type: String,
        required:true,
    },
    image:{
        type: String,
        required:true,
    }
})

const storagePath = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'..',imagePath));
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now())
    }
})

userSchema.statics.uploadImage = multer({storage:storagePath}).single('image');
userSchema.statics.imgPath = imagePath;

const User = mongoose.model('User',userSchema);
module.exports = User;