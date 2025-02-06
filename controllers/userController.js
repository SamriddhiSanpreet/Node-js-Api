const user = require('../models/userModel');

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
        const userData = await User.findByIdAndUpdate(req.params.id,req.body);

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User updated successfully", user:userData });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

