import  express,{Router} from "express"
import { registerController,loginController, testController ,forgetPasswordController,} from "../controllers/authController.js"
import { isAdmin, requireSignIn } from "../middlewires/authmiddlewire.js"


const router=express.Router()
router.post("/register",registerController)
router.post("/login",loginController)
router.get("/test",testController,isAdmin,requireSignIn)
//forget password
router.post("/forgot-password", forgetPasswordController)

router.get("/user-auth",requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})

router.get("/admin-auth", requireSignIn, isAdmin, (req,res) => {
    res.status(200).send({ok:true});
});


export default router