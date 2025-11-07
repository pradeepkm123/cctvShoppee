// const Category = require('../models/Category');
// const Product = require('../models/Product');
// const fs = require('fs');
// const path = require('path');

// const deleteFile = (filePath) => {
//   const absolutePath = path.join(__dirname, '..', filePath);
//   if (fs.existsSync(absolutePath)) {
//     fs.unlinkSync(absolutePath);
//   }
// };



// const createCategory = async (req, res) => {
//   try {
//     const { name, description, published } = req.body;
//     const image = req.file ? `/uploads/${req.file.filename}` : null;

//     if (!name || !description) {
//       return res.status(400).json({ message: 'Missing required fields.' });
//     }

//     const category = new Category({
//       name,
//       description,
//       image,
//       published: published === 'true',
//     });

//     await category.save();
//     res.status(201).json(category);
//   } catch (error) {
//     console.error('Create Category Error:', error);
//     res.status(500).json({ message: 'Server error while creating category.' });
//   }
// };

// // const getCategories = async (req, res) => {
// //   try {
// //     const categories = await Category.find();

// //     const categoriesWithProductCount = await Promise.all(
// //       categories.map(async (category) => {
// //         const productCount = await Product.countDocuments({ categoryId: category._id });
// //         return {
// //           ...category.toObject(),
// //           productCount,
// //         };
// //       })
// //     );

// //     res.json(categoriesWithProductCount);
// //   } catch (error) {
// //     console.error('Get Categories Error:', error);
// //     res.status(500).json({ message: 'Server error while fetching categories.' });
// //   }
// // };




// const getCategories = async (req, res) => {
//   try {
//     const categories = await Category.find();

//     const categoriesWithProductCount = await Promise.all(
//       categories.map(async (category) => {
//         const productCount = await Product.countDocuments({ categoryId: category._id });
//         return {
//           ...category.toObject(),
//           productCount,
//         };
//       })
//     );

//     res.json(categoriesWithProductCount);
//   } catch (error) {
//     console.error('Get Categories Error:', error);
//     res.status(500).json({ message: 'Server error while fetching categories.' });
//   }
// };

// const updateCategory = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, description, published } = req.body;
//     const image = req.file ? `/uploads/${req.file.filename}` : undefined;

//     const category = await Category.findById(id);
//     if (!category) return res.status(404).json({ message: 'Category not found' });

//     if (image && category.image) {
//       deleteFile(category.image);
//     }

//     category.name = name || category.name;
//     category.description = description || category.description;
//     category.published = published !== undefined ? published === 'true' : category.published;
//     if (image) category.image = image;

//     const updatedCategory = await category.save();

//     await Product.updateMany(
//       { categoryId: category._id },
//       { $set: { category: updatedCategory.name } }
//     );

//     res.json(updatedCategory);
//   } catch (error) {
//     console.error('Update Category Error:', error);
//     res.status(500).json({ message: 'Server error while updating category.' });
//   }
// };

// const deleteCategory = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const category = await Category.findById(id);
//     if (!category) return res.status(404).json({ message: 'Category not found' });

//     if (category.image) {
//       deleteFile(category.image);
//     }

//     await Product.updateMany(
//       { categoryId: id },
//       { $set: { category: 'Uncategorized', categoryId: null } }
//     );

//     await Category.findByIdAndDelete(id);
//     res.json({ message: 'Category deleted successfully' });
//   } catch (error) {
//     console.error('Delete Category Error:', error);
//     res.status(500).json({ message: 'Server error while deleting category.' });
//   }
// };

// module.exports = {
//   createCategory,
//   getCategories,
//   updateCategory,
//   deleteCategory,
// };





const Category = require('../models/Category');
const Product = require('../models/Product');
const fs = require('fs');
const path = require('path');

// Helper to delete uploaded image files
const deleteFile = (filePath) => {
  const absolutePath = path.join(__dirname, '..', filePath);
  if (fs.existsSync(absolutePath)) {
    fs.unlinkSync(absolutePath);
  }
};

// CREATE Category
const createCategory = async (req, res) => {
  try {
    const { name, description, published } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name || !description) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    const category = new Category({
      name,
      description,
      image,
      published: published === 'true',
    });

    await category.save();
    res.status(201).json(category);
  } catch (error) {
    console.error('Create Category Error:', error);
    res.status(500).json({ message: 'Server error while creating category.' });
  }
};

// READ: Get all categories with product count
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    const categoriesWithProductCount = await Promise.all(
      categories.map(async (category) => {
        const productCount = await Product.countDocuments({ category: category._id }); // ✅ use "category"
        return {
          ...category.toObject(),
          productCount,
        };
      })
    );

    res.status(200).json(categoriesWithProductCount);
  } catch (error) {
    console.error('Get Categories Error:', error);
    res.status(500).json({ message: 'Server error while fetching categories.' });
  }
};


// UPDATE Category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, published } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // If new image is uploaded, delete old image
    if (image && category.image) {
      deleteFile(category.image);
    }

    // Update fields
    category.name = name || category.name;
    category.description = description || category.description;
    category.published = published !== undefined ? published === 'true' : category.published;
    if (image) category.image = image;

    const updatedCategory = await category.save();

    // Optionally update product names referencing this category
    await Product.updateMany(
      { categoryId: category._id },
      { $set: { category: updatedCategory.name } }
    );

    res.json(updatedCategory);
  } catch (error) {
    console.error('Update Category Error:', error);
    res.status(500).json({ message: 'Server error while updating category.' });
  }
};

// DELETE Category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    if (category.image) {
      deleteFile(category.image);
    }

    // Unlink products from this category
    await Product.updateMany(
      { categoryId: id },
      {
        $set: {
          category: 'Uncategorized',
          categoryId: null
        }
      }
    );

    await Category.findByIdAndDelete(id);

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete Category Error:', error);
    res.status(500).json({ message: 'Server error while deleting category.' });
  }
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};

