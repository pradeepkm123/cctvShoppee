const Warehouse = require('../models/Warehouse');

// Get all warehouses
exports.getAllWarehouses = async (req, res) => {
  try {
    const warehouses = await Warehouse.find();
    res.json(warehouses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single warehouse
exports.getWarehouse = async (req, res) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id);
    if (!warehouse) {
      return res.status(404).json({ message: 'Warehouse not found' });
    }
    res.json(warehouse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new warehouse
exports.createWarehouse = async (req, res) => {
  const warehouse = new Warehouse(req.body);
  try {
    const newWarehouse = await warehouse.save();
    res.status(201).json(newWarehouse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a warehouse
exports.updateWarehouse = async (req, res) => {
  try {
    const updatedWarehouse = await Warehouse.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedWarehouse) {
      return res.status(404).json({ message: 'Warehouse not found' });
    }
    res.json(updatedWarehouse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a warehouse
exports.deleteWarehouse = async (req, res) => {
  try {
    const warehouse = await Warehouse.findByIdAndDelete(req.params.id);
    if (!warehouse) {
      return res.status(404).json({ message: 'Warehouse not found' });
    }
    res.json({ message: 'Warehouse deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
