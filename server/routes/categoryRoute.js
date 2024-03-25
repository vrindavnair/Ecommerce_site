
import  express from "express";
import { isAdmin, requireSignIn } from "../middlewires/authmiddlewire.js";
import { categoryController, deletecategoryCOntroller, getCategory, singlecategoryController, updateCategoryController } from "../controllers/createCategoryController.js";
const router=express.Router()
router.post("/create-category", requireSignIn, isAdmin,categoryController)
router.put("/update-category/:id", requireSignIn, isAdmin,updateCategoryController)
router.delete("/delete-category/:id", requireSignIn, isAdmin,deletecategoryCOntroller)
router.get("/single-category/:slug", singlecategoryController)

router.get("/get-category",getCategory)




export default router