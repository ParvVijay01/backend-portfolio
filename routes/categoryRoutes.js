const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const asyncHandler = require('express-async-handler');

// Get all categories
router.get('/', asyncHandler(async (req, res) => {
    try {
        const categories = await Category.find();
        res.json({ success: true, message: "Categories retrieved successfully.", data: categories });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}));

// Get a category by ID
router.get('/:id', asyncHandler(async (req, res) => {
    try {
        const categoryID = req.params.id;
        const category = await Category.findById(categoryID);
        if (!category) {
            return res.status(404).json({ success: false, message: "Category not found." });
        }
        res.json({ success: true, message: "Category retrieved successfully.", data: category });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}));

// Create a new category
router.post('/', asyncHandler(async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).json({ success: false, message: "Name is required." });
        }

        const newCategory = new Category({ name, description });
        await newCategory.save();
        res.json({ success: true, message: "Category created successfully.", data: newCategory });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}));

// Update a category
router.put('/:id', asyncHandler(async (req, res) => {
    try {
        const categoryID = req.params.id;
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({ success: false, message: "Name is required." });
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            categoryID,
            { name, description },
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ success: false, message: "Category not found." });
        }

        res.json({ success: true, message: "Category updated successfully.", data: updatedCategory });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}));

// Delete a category
router.delete('/:id', asyncHandler(async (req, res) => {
    try {
        const categoryID = req.params.id;
        const category = await Category.findByIdAndDelete(categoryID);

        if (!category) {
            return res.status(404).json({ success: false, message: "Category not found." });
        }

        res.json({ success: true, message: "Category deleted successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}));

module.exports = router;
