const validateCategoryData = (req, res, next) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ message: 'Name and description are required.' });
  }

  // Optional: if you want image to be required only on create
  if (req.method === 'POST' && !req.file) {
    return res.status(400).json({ message: 'Image is required when creating a category.' });
  }

  next();
};

module.exports = { validateCategoryData };
