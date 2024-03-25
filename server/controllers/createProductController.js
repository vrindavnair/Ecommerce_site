
import productModel from '../models/productModel.js';
import slugify from 'slugify';
import fs from 'fs'



export const createProductController=async(req,res)=>{
    try{
    const {name,description,price,category,quantity,shipping}=req.fields
    const {photo}=req.files
    console.log(req.body)
   
    switch(true){
        case !name:
            return res.status(500).send({error:"the name is required"})
        case !description:
            return res.status(500).send({error:"the description is required"})
        case !price:
            return res.status(500).send({error:"the price is required"})
        case !category:
            return res.status(500).send({error:"the category is required"})
        case !quantity:
            return res.status(500).send({error:"the quantity is required"})
        case photo && photo.size>1000000:
            return res
                .status(500)
                .send({error:"photo is required and should be less than 1mb"})
    }
        
    
    
    const products=new productModel({...req.fields,slug:slugify(name)})
    if(photo){
        products.photo.data=fs.readFileSync(photo.path)
        products.photo.contentType=photo.type
    }
    await products.save()
        res.status(201).send({
            success:true,
            message:"producted created sucessfully",
            products,
        })
    

   
}catch(error){
    console.log(error)
   res.status(500).send({
    success:false,
    error,
    message:"failed",
})
}

    
}

export const getProductController=async(req,res)=>{
    try{
        const products=await productModel
        .find({})
        .populate("category")
        .select("-photo")
        .limit(12)
        .sort({createdAt: -1})
        res.status(200).send({
            success:true,
            counTotal:products.length,
            message:"all products",
            products,
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            sucess:false,
            message:"error",
            error:error.message
        })

        
    }
}

export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel
            .findOne({ slug: req.params.slug })
            .select("-photo")
            .populate("category");
        res.status(200).send({
            success: true,
            message: "Single product fetched",
            product,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            sucess: false,
            message: "Error while getting single product",
            error,
        })
    }
};

export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            sucess: false,
            message: "Error while getting photo",
            error,
        })
    }
};



export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is required" });
            case !description:
                return res.status(500).send({ error: "Description is required" });
            case !price:
                return res.status(500).send({ error: "Price is required" });
            case !category:
                return res.status(500).send({ error: "Category is required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is required" });
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "photo is required and should be less than 1mb" })
        }

        const product = await productModel.findByIdAndUpdate(req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }
        await product.save();
        
        res.status(201).send({
            success: true,
            message: "Product updated successfully",
            product,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            sucess: false,
            message: "Error while updating the product",
            error,
        })
    }
}


export const deleteProductController = async (req, res) => {
    try {
        const productId = req.params.pid;
        await productModel.findByIdAndDelete(productId).select("photo");
        res.status(200).send({
            success: true,
            message: "Product deleted successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            sucess: false,
            message: "Error while deleting the product",
            error,
        })
    }
};

