const express = require('express');
const multer = require('multer');
const Photo = require('../models/photo'); // Import the Photo model
const Category = require('../models/category'); // Import the Category model
const router = express.Router();

// Multer setup for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create a photo and link it to a category
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { title, categoryId } = req.body;

    // Check if category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Ensure an image is uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    // Create a new photo
    const newPhoto = new Photo({
      title,
      category: categoryId,
      image: {
        data: req.file.buffer, // Store the image as a buffer
        contentType: req.file.mimetype, // Store the MIME type (e.g., 'image/jpeg')
      },
    });

    // Save the photo to the database
    await newPhoto.save();
    res.status(201).json({ message: 'Photo uploaded successfully', photo: newPhoto });
  } catch (err) {
    console.error('Error uploading photo:', err); // Log the error to the console
    res.status(500).json({ message: 'Failed to upload photo', error: err.message });
  }
});

// Get all photos with category information
router.get('/', async (req, res) => {
  try {
    const photos = await Photo.find().populate('category', 'name'); // Fetch photos with category name
    res.status(200).json(photos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch photos' });
  }
});

// Get photos by category
router.get('/category/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Ensure the category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Fetch photos for the specific category
    const photos = await Photo.find({ category: categoryId });
    res.status(200).json(photos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch photos' });
  }
});

module.exports = router;
