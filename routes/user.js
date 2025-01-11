const express =require ("express");
const router = express.Router();
const user = require("../models/user.js")
const passport =require("passport")
const {savedRedirect}=require("../middleware.js")

const userController =require("../controllers/user.js")

router.get("/signup",userController.SignupForm)

router.post("/signup",userController.Signup)

router.get("/login",userController.loginForm)

router.post(
    "/login",
    savedRedirect,
    passport.authenticate("local", {
      failureRedirect: "/user/login",
      failureFlash: true,
    }),userController.login
  );
  

router.get("/logout",userController.logout)

module.exports=router