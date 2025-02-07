const express = require('express');
const routes = express.Router();
const ctl = require('../controllers/userController');
const passport = require('passport');
const userModel = require('../models/userModel')

routes.get('/unauth', async(req,res)=>{
    return res.status(400).json({message:"Your are Unauthorized"});
})
routes.get('/getUsers', passport.authenticate('jwt', {failureRedirect:'/unauth' }), ctl.getUsers);
routes.post('/addUser',passport.authenticate('jwt', {failureRedirect:'/unauth' }),userModel.uploadImage,ctl.addUser);
routes.delete('/deleteUser/:id',passport.authenticate('jwt', {failureRedirect:'/unauth' }), ctl.deleteUser);
routes.get('/getSingleUser/:id',passport.authenticate('jwt', {failureRedirect:'/unauth' }),ctl.getSingleUser);
routes.put('/updateUser/:id', passport.authenticate('jwt', {failureRedirect:'/unauth' }),userModel.uploadImage,ctl.updateUser);

module.exports = routes;