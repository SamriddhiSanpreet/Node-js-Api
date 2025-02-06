const Register = require('../models/registerModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = "sam"; 


module.exports.register = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        
        const existingUser = await Register.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        
        const newUser = new Register({ username, email, password, confirmPassword });
        await newUser.save();

        return res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        
        const user = await Register.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email or password" });

        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

        
        const token = jwt.sign({ id: user._id,email,password}, SECRET_KEY, { expiresIn: "1h" });

        return res.status(200).json({ message: "Login successful", token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
