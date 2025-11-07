const Slide = require('../models/slideModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = 'uploads/banners';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'banner-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG, and WebP images are allowed'));
    }
  }
}).single('image');

// Get all slides for a store
exports.getSlidesByStore = async (req, res) => {
  try {
    const { storeId } = req.params;
    
    console.log('Fetching slides for store:', storeId);
    
    const slides = await Slide.find({ 
      storeId, 
      isActive: true 
    }).sort({ order: 1 });

    console.log(`Found ${slides.length} slides for store ${storeId}`);

    res.json({
      success: true,
      data: slides,
      count: slides.length
    });
  } catch (error) {
    console.error('Error fetching slides:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching slides',
      error: error.message
    });
  }
};

// Get slide by ID
exports.getSlideById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const slide = await Slide.findById(id);
    
    if (!slide) {
      return res.status(404).json({
        success: false,
        message: 'Slide not found'
      });
    }

    res.json({
      success: true,
      data: slide
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching slide',
      error: error.message
    });
  }
};

// Create new slide
exports.createSlide = async (req, res) => {
  upload(req, res, async (err) => {
    try {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      const {
        storeId = 'default',
        eyebrow,
        title,
        blurb,
        ctaText,
        ctaHref,
        backgroundColor,
        lightText,
        badge,
        order
      } = req.body;

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Image is required'
        });
      }

      if (!title) {
        // Delete uploaded file if title is missing
        fs.unlinkSync(req.file.path);
        return res.status(400).json({
          success: false,
          message: 'Title is required'
        });
      }

      const slide = new Slide({
        storeId,
        image: `/uploads/banners/${req.file.filename}`,
        eyebrow: eyebrow || '',
        title,
        blurb: blurb || '',
        ctaText: ctaText || 'Shop Now',
        ctaHref: ctaHref || '/',
        backgroundColor: backgroundColor || '',
        lightText: lightText !== 'false',
        badge: badge || '',
        order: order || 0
      });

      await slide.save();

      res.status(201).json({
        success: true,
        message: 'Slide created successfully',
        data: slide
      });
    } catch (error) {
      // Delete uploaded file if there's an error
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      res.status(500).json({
        success: false,
        message: 'Error creating slide',
        error: error.message
      });
    }
  });
};

// Update slide
exports.updateSlide = async (req, res) => {
  upload(req, res, async (err) => {
    try {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      const { id } = req.params;
      const updateData = { ...req.body };

      // Find existing slide first
      const existingSlide = await Slide.findById(id);
      if (!existingSlide) {
        // Delete newly uploaded file if slide doesn't exist
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(404).json({
          success: false,
          message: 'Slide not found'
        });
      }

      if (req.file) {
        // Delete old image file
        const oldImagePath = existingSlide.image.replace('/uploads/banners/', '');
        const fullOldPath = path.join(uploadDir, oldImagePath);
        if (fs.existsSync(fullOldPath)) {
          fs.unlinkSync(fullOldPath);
        }
        updateData.image = `/uploads/banners/${req.file.filename}`;
      }

      if (updateData.lightText !== undefined) {
        updateData.lightText = updateData.lightText !== 'false';
      }

      const slide = await Slide.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );

      res.json({
        success: true,
        message: 'Slide updated successfully',
        data: slide
      });
    } catch (error) {
      // Delete newly uploaded file if there's an error
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      res.status(500).json({
        success: false,
        message: 'Error updating slide',
        error: error.message
      });
    }
  });
};

// Delete slide
exports.deleteSlide = async (req, res) => {
  try {
    const { id } = req.params;

    const slide = await Slide.findById(id);
    
    if (!slide) {
      return res.status(404).json({
        success: false,
        message: 'Slide not found'
      });
    }

    // Delete image file
    const imagePath = slide.image.replace('/uploads/banners/', '');
    const fullPath = path.join(uploadDir, imagePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }

    await Slide.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Slide deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting slide',
      error: error.message
    });
  }
};

// Reorder slides
exports.reorderSlides = async (req, res) => {
  try {
    const { slides } = req.body;

    if (!Array.isArray(slides)) {
      return res.status(400).json({
        success: false,
        message: 'Slides array is required'
      });
    }

    const updatePromises = slides.map(slide => 
      Slide.findByIdAndUpdate(slide.id, { order: slide.order })
    );

    await Promise.all(updatePromises);

    res.json({
      success: true,
      message: 'Slides reordered successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error reordering slides',
      error: error.message
    });
  }
};

// Get all stores with slides
exports.getStores = async (req, res) => {
  try {
    const stores = await Slide.distinct('storeId');
    
    res.json({
      success: true,
      data: stores
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching stores',
      error: error.message
    });
  }
};