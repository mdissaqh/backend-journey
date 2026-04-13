import express from "express";
import {config} from 'dotenv'
import morgan from 'morgan'
import passport from 'passport'
import {Strategy} from 'passport-google-oauth20';
config()


const app=express()


app.use(morgan("dev"))
app.use(passport.initialize())



app.get("/",(req,res)=>{
    res.send("Thank you for viewing my Google auth practice")
})


passport.use(new Strategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:"/auth/google/callback"
},(_,__,profile,done)=>{
    return done(null,profile)
}))


app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}))


app.get("/auth/google/callback",passport.authenticate("google",{
    session:false,
    failureRedirect:"/"
}),(req,res)=>{
    console.log(req.user)
    res.send("Authentication successfull")
})



export default app