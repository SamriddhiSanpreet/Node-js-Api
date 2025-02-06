const express = require('express');
const port = 8000;
const db = require('./config/db');
const app = express();
const passport = require('passport');
const jwtPassport = require('./config/passport-jwt-strategy');
const session = require('express-session');

app.use(express.urlencoded()); 
app.use(session({
    name:"jwtSession",
    secret:"jwtJJ",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:1000*60*60
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json()); 

app.use('/',require('./routes/userRoutes'));
app.use('/auth', require('./routes/registerRoutes'));

app.listen(port, (err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("Your port is connected = "+port);
})