const Client = require('../models/clientModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = 'uploads/clients';
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
    cb(null, 'client-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB limit for client logos
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|webp|svg/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG, WebP, and SVG images are allowed'));
    }
  }
}).single('image');

// Get all clients for a store
exports.getClientsByStore = async (req, res) => {
  try {
    const { storeId } = req.params;
    
    console.log('Fetching clients for store:', storeId);
    
    const clients = await Client.find({ 
      storeId, 
      isActive: true 
    }).sort({ order: 1 });

    console.log(`Found ${clients.length} clients for store ${storeId}`);

    res.json({
      success: true,
      data: clients,
      count: clients.length
    });
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching clients',
      error: error.message
    });
  }
};

// Get client by ID
exports.getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const client = await Client.findById(id);
    
    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }

    res.json({
      success: true,
      data: client
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching client',
      error: error.message
    });
  }
};

// Create new client
exports.createClient = async (req, res) => {
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
        name,
        websiteUrl,
        altText,
        order
      } = req.body;

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Client logo image is required'
        });
      }

      if (!name) {
        // Delete uploaded file if name is missing
        fs.unlinkSync(req.file.path);
        return res.status(400).json({
          success: false,
          message: 'Client name is required'
        });
      }

      const client = new Client({
        storeId,
        name,
        image: `uploads/clients/${req.file.filename}`,
        websiteUrl: websiteUrl || '#',
        altText: altText || name,
        order: order || 0
      });

      await client.save();

      res.status(201).json({
        success: true,
        message: 'Client created successfully',
        data: client
      });
    } catch (error) {
      // Delete uploaded file if there's an error
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      res.status(500).json({
        success: false,
        message: 'Error creating client',
        error: error.message
      });
    }
  });
};

// Update client
exports.updateClient = async (req, res) => {
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

      // Find existing client first
      const existingClient = await Client.findById(id);
      if (!existingClient) {
        // Delete newly uploaded file if client doesn't exist
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(404).json({
          success: false,
          message: 'Client not found'
        });
      }

      if (req.file) {
        // Delete old image file
        const oldImagePath = existingClient.image.replace('uploads/clients/', '');
        const fullOldPath = path.join(uploadDir, oldImagePath);
        if (fs.existsSync(fullOldPath)) {
          fs.unlinkSync(fullOldPath);
        }
        updateData.image = `uploads/clients/${req.file.filename}`;
      }

      const client = await Client.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );

      res.json({
        success: true,
        message: 'Client updated successfully',
        data: client
      });
    } catch (error) {
      // Delete newly uploaded file if there's an error
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      res.status(500).json({
        success: false,
        message: 'Error updating client',
        error: error.message
      });
    }
  });
};

// Delete client
exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await Client.findById(id);
    
    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }

    // Delete image file
    const imagePath = client.image.replace('uploads/clients/', '');
    const fullPath = path.join(uploadDir, imagePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }

    await Client.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Client deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting client',
      error: error.message
    });
  }
};

// Reorder clients
exports.reorderClients = async (req, res) => {
  try {
    const { clients } = req.body;

    if (!Array.isArray(clients)) {
      return res.status(400).json({
        success: false,
        message: 'Clients array is required'
      });
    }

    const updatePromises = clients.map(client => 
      Client.findByIdAndUpdate(client.id, { order: client.order })
    );

    await Promise.all(updatePromises);

    res.json({
      success: true,
      message: 'Clients reordered successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error reordering clients',
      error: error.message
    });
  }
};