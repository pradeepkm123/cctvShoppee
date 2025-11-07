const StockInward = require('../models/StockInward');
const Product = require('../models/Product');

// @desc    Create new stock inward
// @route   POST /api/stock-inward
// @access  Public
const createStockInward = async (req, res) => {
  try {
    const { date, supplier, invoiceNumber, location, items, createdBy } = req.body;

    // Create stock inward record
    const stockInward = new StockInward({
      date,
      supplier,
      invoiceNumber,
      location,
      items,
      createdBy
    });

    const savedStockInward = await stockInward.save();

    // Update product stocks
    for (const item of items) {
      await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { currentStock: item.quantity } }
      );
    }

    // Populate the saved stock inward with related data
    const populatedStockInward = await StockInward.findById(savedStockInward._id)
      .populate('supplier', 'name')
      .populate('location', 'name')
      .populate('items.productId', 'name modelNo');

    res.status(201).json({
      success: true,
      message: 'Stock inward added successfully',
      data: populatedStockInward
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating stock inward',
      error: error.message
    });
  }
};

// @desc    Get all stock inward records
// @route   GET /api/stock-inward
// @access  Public
const getStockInwards = async (req, res) => {
  try {
    const { startDate, endDate, supplier, location } = req.query;
    
    let filter = {};
    
    // Date filter
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }
    
    // Supplier filter
    if (supplier) {
      filter.supplier = supplier;
    }
    
    // Location filter
    if (location) {
      filter.location = location;
    }

    const stockInwards = await StockInward.find(filter)
      .populate('supplier', 'name')
      .populate('location', 'name')
      .populate('items.productId', 'name modelNo')
      .sort({ date: -1, createdAt: -1 });

    res.json({
      success: true,
      count: stockInwards.length,
      data: stockInwards
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching stock inwards',
      error: error.message
    });
  }
};

// @desc    Get stock inward by ID
// @route   GET /api/stock-inward/:id
// @access  Public
const getStockInwardById = async (req, res) => {
  try {
    const stockInward = await StockInward.findById(req.params.id)
      .populate('supplier', 'name contactPerson email phone')
      .populate('location', 'name address')
      .populate('items.productId', 'name modelNo price');

    if (!stockInward) {
      return res.status(404).json({
        success: false,
        message: 'Stock inward record not found'
      });
    }

    res.json({
      success: true,
      data: stockInward
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching stock inward',
      error: error.message
    });
  }
};

module.exports = {
  createStockInward,
  getStockInwards,
  getStockInwardById
};