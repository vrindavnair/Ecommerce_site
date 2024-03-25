
import  express from "express";


import {createProductController, deleteProductController, getProductController, 
    getSingleProductController, productPhotoController, updateProductController} from "../controllers/createProductController.js"
import formidable from "express-formidable";
import { isAdmin, requireSignIn } from "../middlewires/authmiddlewire.js";


const router=express.Router()
router.post("/create-product", requireSignIn, isAdmin, formidable(),createProductController)
router.get("/get-product", getProductController)
router.get("/get-singleproduct/:slug", getSingleProductController);
router.get("/product-photo/:pid", productPhotoController);
router.delete("/delete/:pid", deleteProductController);
router.put("/product-update/:pid", requireSignIn,isAdmin,formidable(),updateProductController)






export default router