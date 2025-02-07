const user = require('../models/userModel');
const path = require('path');
const fs = require('fs');

module.exports.getUsers = async (req, res) => {
    try {
        const users = await user.find(); 
        return res.status(200).json(users); 
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports.addUser = async (req,res)=>{
    try{
        // console.log(req.body);
        // console.log(req.file);
        var imagePath='';
        if(req.file){
            imagePath = await user.imgPath+'/'+req.file.filename;
        }
        req.body.image = imagePath;
        let userData = await user.create(req.body);
        if(userData){
            return res.status(200).json({msg:'User Data submitted successfully',user:userData});
        }
        else{
            return res.status(200).json({msg:'User Data Not submitted'});
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports.deleteUser = async (req, res) => {
    try {
        let findData = await user.findById(req.params.id);
        // console.log(findData);
        if(findData){
            try{
                deleteImagePath = path.join(__dirname,'..',findData.image);
                await fs.unlinkSync(deleteImagePath);
            }
            catch(err){
                console.error(err);
                return res.status(500).json({ message: "something wrong in findData" });
            }
        }
        const userData = await user.findByIdAndDelete(req.params.id);

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User deleted successfully", user:userData });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports.getSingleUser = async (req, res) => {
    try {

        const userData = await User.findById(req.params.id); 

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User Found successfully", user:userData });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports.updateUser = async (req, res) => {
    try {
       if(req.file){
            let singleData = await user.findById(req.params.id);
            try{
                let Imageoldpath = path.join(__dirname,'..',singleData.image);
                await fs.unlinkSync(Imageoldpath);    
            }
            catch(err){
                console.log("err");
            }
            var newImagePath = user.imgPath+'/'+req.file.filename;
            req.body.image = newImagePath;

            const userData = await user.findByIdAndUpdate(req.params.id,req.body);

            if (!userData) {
                return res.status(404).json({ message: "User not found" });
            }

             return res.status(200).json({ message: "User updated successfully", user:userData });
       }
       else{
            let singleData = await user.findById(req.params.id);
            req.body.image = singleData.image;
            await user.findByIdAndUpdate(req.params.id,req.body);
            return res.status(200).json({ message: "User updated successfully", user:userData });
       }
        

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

