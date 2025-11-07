const express = require('express');
const {
  createStockInward,
  getStockInwards,
  getStockInwardById
} = require('../controllers/stockInwardController');

const router = express.Router();

router.route('/')
  .post(createStockInward)
  .get(getStockInwards);

router.route('/:id')
  .get(getStockInwardById);

module.exports = router;