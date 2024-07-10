const User=require("../models/user")

module.exports.renderSignupForm=(req,res)=>{
    res.render("users/signup.ejs")
}

module.exports.signup=async(req,res)=>{
    try{
        let {username, email, password}=req.body.listing;
    const newUser=({username,email});
    const registerUser= await User.register(newUser,password);
    // console.log(registerUser)
    req.login(registerUser,(err)=>{
        if(err){
            return next(err);

        }
            
        req.flash("success","Welcome to Wanderlust");
        
        res.redirect("/listings");
    })
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup")
    }
}

module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login=async(req,res)=>{
    //res.send("welcome to wanderlust! You are logged in!");
    req.flash("success","welcome to wanderlust! You are logged in!");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
   
}

module.exports.logout=(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out!")
        res.redirect("/listings")
    })
}