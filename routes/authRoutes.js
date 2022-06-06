import requireLogin from "../middlewares/requireLogin.js";
import express from "express";
const router = express.Router();
import passport from "passport";

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/google/callback", 
    passport.authenticate("google"),
    (req,res)=>{
        res.redirect('/surveys');
    });
    
router.get("/api/logout", (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get("/api/current_user",(req, res) => {
  res.send(req.user);
});

export default router;
