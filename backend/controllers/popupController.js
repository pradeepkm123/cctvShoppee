const Popup = require('../models/Popup');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '..', 'uploads', 'popups');
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
        cb(null, 'popup-' + uniqueSuffix + path.extname(file.originalname));
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

// Get active popup for a store
exports.getActivePopup = async (req, res) => {
    try {
        const { storeId = 'default' } = req.params;
        const now = new Date();

        const popup = await Popup.findOne({
            storeId,
            status: true,
            $or: [
                { startDate: { $exists: false } },
                { startDate: null },
                { startDate: { $lte: now } }
            ],
            $or: [
                { endDate: { $exists: false } },
                { endDate: null },
                { endDate: { $gte: now } }
            ]
        }).sort({ createdAt: -1 });

        res.json({
            success: true,
            data: popup
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching active popup',
            error: error.message
        });
    }
};

// Get all popups for admin
exports.getAllPopups = async (req, res) => {
    try {
        const popups = await Popup.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            data: popups
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching popups',
            error: error.message
        });
    }
};

// Create new popup
exports.createPopup = async (req, res) => {
    upload(req, res, async (err) => {
        try {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }

            const { title, link, status, startDate, endDate, storeId = 'default' } = req.body;

            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: 'Image is required'
                });
            }

            const popup = new Popup({
                title,
                image: `uploads/popups/${req.file.filename}`,
                link: link || '/',
                status: status === 'true' || status === true,
                startDate: startDate ? new Date(startDate) : null,
                endDate: endDate ? new Date(endDate) : null,
                storeId
            });

            await popup.save();

            res.status(201).json({
                success: true,
                message: 'Popup created successfully',
                data: popup
            });
        } catch (error) {
            if (req.file && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }
            res.status(500).json({
                success: false,
                message: 'Error creating popup',
                error: error.message
            });
        }
    });
};

// Update popup
exports.updatePopup = async (req, res) => {
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

            // Convert types if they come from FormData
            if (updateData.status !== undefined) {
                updateData.status = updateData.status === 'true' || updateData.status === true;
            }
            if (updateData.startDate) updateData.startDate = new Date(updateData.startDate);
            if (updateData.endDate) updateData.endDate = new Date(updateData.endDate);

            const existingPopup = await Popup.findById(id);
            if (!existingPopup) {
                if (req.file) fs.unlinkSync(req.file.path);
                return res.status(404).json({
                    success: false,
                    message: 'Popup not found'
                });
            }

            if (req.file) {
                // Delete old image
                if (existingPopup.image) {
                    const oldFile = path.basename(existingPopup.image);
                    const fullPath = path.join(uploadDir, oldFile);
                    if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
                }
                updateData.image = `uploads/popups/${req.file.filename}`;
            }

            const popup = await Popup.findByIdAndUpdate(id, updateData, { new: true });

            res.json({
                success: true,
                message: 'Popup updated successfully',
                data: popup
            });
        } catch (error) {
            if (req.file && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }
            res.status(500).json({
                success: false,
                message: 'Error updating popup',
                error: error.message
            });
        }
    });
};

// Delete popup
exports.deletePopup = async (req, res) => {
    try {
        const { id } = req.params;
        const popup = await Popup.findById(id);

        if (!popup) {
            return res.status(404).json({
                success: false,
                message: 'Popup not found'
            });
        }

        if (popup.image) {
            const fileName = path.basename(popup.image);
            const fullPath = path.join(uploadDir, fileName);
            if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
        }

        await Popup.findByIdAndDelete(id);

        res.json({
            success: true,
            message: 'Popup deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting popup',
            error: error.message
        });
    }
};
