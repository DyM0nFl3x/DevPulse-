import { Router } from "express";
// import { login, signup } from "../../controllers/auth.controller";

const router = Router();

// User Registration
router.get("/signup", (req,res)=>{
  res.send("hmm") 
});

//User Login
// router.post("/login", login);

export default router;
