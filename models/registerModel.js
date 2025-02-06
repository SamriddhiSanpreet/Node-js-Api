const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const registerSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    }
});

registerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    this.confirmPassword = undefined; 
    next();
});

const Register = mongoose.model('Register', registerSchema);
module.exports = Register;
