const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const register = require('../models/registerModel');
const SECRET_KEY = "sam";

var opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey :SECRET_KEY
}

passport.use(new JwtStrategy(opts, async function(payload,done){
    let checkUserData = await register.findOne({email:payload.email});
    if(checkUserData){
        return done(null,checkUserData);
    }
    else{
        return done(null,false);
    }

}))

passport.serializeUser((user,done)=>{
    return done(null,user.id);
})

passport.deserializeUser(async (id,done)=>{
    let userData = await register.findById(id);
    if(userData){
        return done(null,userData);
    }
    else{
        return done(null,false);
    }
})

