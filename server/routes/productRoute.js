
import  express from "express";


import {createProductController, deleteProductController, getProductController, 
    getSingleProductController, productFilterController, productPhotoController, updateProductController, 
    productCountController,
    searchProductController, 
    relatedProductController, 
    productCategoryController,
    brainTreePaymentController,
    braintreeTokenController} from "../controllers/createProductController.js"
import formidable from "express-formidable";
import { isAdmin, requireSignIn } from "../middlewires/authmiddlewire.js";


const router=express.Router()
router.post("/create-product", requireSignIn, isAdmin, formidable(),createProductController)
router.get("/get-product", getProductController)
router.get("/get-singleproduct/:slug", getSingleProductController);
router.get("/product-photo/:pid", productPhotoController);
router.delete("/delete/:pid", deleteProductController);
router.put("/product-update/:pid", requireSignIn,isAdmin,formidable(),updateProductController)

//filter
router.post("/product-filter", productFilterController)
router.get("/product-count", productCountController)

router.get("/search/:keyword",searchProductController);
router.get("/related-product/:pid/:cid",relatedProductController )

router.get("/product-category/:slug",productCategoryController)


router.get("/braintree/token",braintreeTokenController)
router.post("/braintree/payment",brainTreePaymentController)









export default router