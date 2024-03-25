

import slugify from 'slugify';
import Categorymodel from '../models/categoryModel.js';

export const categoryController = async (req, res) => {
    try {
        // Take name from req.body
        const { name } = req.body;

        // Validate
        if (!name) {
            return res.status(400).send({ error: "Name is required" });
        }

        // Check whether this name is already existing or not
        const existingCategory = await Categorymodel.findOne({ name });

        if (existingCategory) {
            return res.status(400).send({
                success: false,
                message: "Name is already registered"
            });
        }

        const slug = slugify(name);
        const category = await Categorymodel.create({ name, slug });
        res.send({
            success: true,
            message: "Category created successfully",
            category
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed",
            error: error.message
        });
    }
};

export const updateCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

      
        const category = await Categorymodel.findByIdAndUpdate(
            id,
            { name, slug:slugify(name)},
            { new: true }
        );

    
        res.send({
            success: true,
            message: "Category updated successfully",
            category
        });
    }
     catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed",
            error: error.message
        });
    }
};

export const getCategory = async (req, res) => {
    try {
        const categories = await Categorymodel.find({});
        res.send({
            success: true,
            message: "Categories retrieved successfully",
            categories
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed",
            error: error.message
        });
    }
};

export const deletecategoryCOntroller = async (req,res) => {
    try {
      const categoryId = req.params.id;
      await Categorymodel.findByIdAndDelete(categoryId);
      res.status(201).send({
          success:true,
          message:"category deleted succesfully",
      })
    } catch (error) {
      res.status(500).send({
        succes:false,
        message:"Failed to delete category"
      })
    }
  }
  export const singlecategoryController = async (req, res) => {
    try {
      const category = await Categorymodel.findOne({ slug: req.params.id });
      res.status(201).send({
        success: "true",
        message: "Successfully got the single category",
        category
      })
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Failed to get single category",
        error
      })
    }
  }


