const user =require("../models/user.js");

module.exports.SignupForm=(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.Signup=async(req,res)=>{
   
   try{ let {username,email,password}=req.body
    const newUser=new user ({
        username,email
    });
    const registerUser=await user.register(newUser,password);
   //for auto login after signup
    req.login(registerUser,(err)=>{
        if(err){
            return next(err)
        }
        req.flash("success","Welcome to Wanderlust")
        res.redirect("/listings")
    }) 
   
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/user/signup")
    }   
}
 
module.exports.loginForm=(req,res)=>{
    res.render("users/login.ejs")
}

module.exports.login=async (req, res) => {
  req.flash("success", "Welcome back to Wanderlust");
  const url = res.locals.redirecturl || "/listings"; // Ensure default fallback
  res.redirect(url);
}

module.exports.logout=(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            next(err)
        }
        req.flash("success","you are logged out")
        res.redirect("/listings")
    })
}