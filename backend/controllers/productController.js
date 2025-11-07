// const Product = require('../models/Product');
// const Category = require('../models/Category');
// const fs = require('fs');
// const path = require('path');

// function safeDeleteFile(filePath) {
//   try {
//     if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);
//   } catch (err) {
//     console.warn(`Failed to delete file ${filePath}:`, err.message);
//   }
// }

// exports.addProduct = async (req, res) => {
//   try {
//     // Parse body
//     const {
//       name, description, sku, brand, category,
//       oldPrice, newPrice, stock, status,
//       model, productTag, productType, nightVision, audioChannel, battery,
//       type, irRange, poePorts, ethernetPorts, offers, megaPixel, biometricType,
//       videoChannel, cameraType, accessControl, channel, lens, communications,
//       bodyType, upLinkPorts, sfpPorts, builtInPower, sataPorts, sdCard,
//       isTrending, productBadge, productTab
//     } = req.body;

//     // Files
//     const brochure = req.files?.brochure?.[0]?.filename || null;
//     const specification = req.files?.specification?.[0]?.filename || null;
//     const banner1 = req.files?.banner1?.[0]?.filename || null;
//     const banner2 = req.files?.banner2?.[0]?.filename || null;

//     const imageFiles = (req.files?.images || []).map(f => f.filename);
//     const videoFiles = (req.files?.videos || []).map(f => f.filename);

//     // At least one media (image/video) is required for a decent product page
//     if (imageFiles.length === 0 && videoFiles.length === 0) {
//       return res.status(400).json({ message: 'Please upload at least one image or video for the product' });
//     }

//     // Validate numeric fields
//     const errors = [];
//     const parsedOldPrice = oldPrice !== undefined ? parseFloat(oldPrice) : undefined;
//     const parsedNewPrice = newPrice !== undefined ? parseFloat(newPrice) : undefined;
//     const parsedStock    = stock    !== undefined ? parseFloat(stock)    : undefined;

//     if (oldPrice !== undefined && isNaN(parsedOldPrice)) errors.push('Old price must be a valid number');
//     if (newPrice !== undefined && isNaN(parsedNewPrice)) errors.push('New price must be a valid number');
//     if (stock    !== undefined && isNaN(parsedStock))    errors.push('Stock must be a valid number');
//     if (errors.length) return res.status(400).json({ message: errors.join(', ') });

//     // Category
//     const categoryDoc = await Category.findOne({ name: category }) || await Category.findById(category);
//     if (!categoryDoc) return res.status(400).json({ message: 'Invalid category name or id' });

//     // Build media array
//     const media = [
//       ...imageFiles.map((f, idx) => ({ type: 'image', file: f, order: idx })),
//       ...videoFiles.map((f, idx) => ({ type: 'video', file: f, order: imageFiles.length + idx })),
//     ].sort((a, b) => a.order - b.order);

//     const newProduct = new Product({
//       name,
//       description,
//       // legacy single image: set to first image if present for backward compatibility
//       image: imageFiles[0] || null,
//       brochure,
//       specification,
//       images: imageFiles,
//       videos: videoFiles,
//       media,
//       sku,
//       brand,
//       category: categoryDoc._id,
//       oldPrice: parsedOldPrice,
//       newPrice: parsedNewPrice,
//       stock: parsedStock,
//       status,
//       model,
//       productTag,
//       productType,
//       nightVision,
//       audioChannel,
//       battery,
//       type,
//       irRange,
//       poePorts,
//       ethernetPorts,
//       offers,
//       megaPixel,
//       biometricType,
//       videoChannel,
//       cameraType,
//       accessControl,
//       channel,
//       lens,
//       communications,
//       bodyType,
//       upLinkPorts,
//       sfpPorts,
//       builtInPower,
//       sataPorts,
//       sdCard,
//       isTrending: isTrending === 'true' || isTrending === true,
//       productBadge,
//       productTab,
//       banner1,
//       banner2
//     });

//     await newProduct.save();
//     await Category.findByIdAndUpdate(categoryDoc._id, { $inc: { productCount: 1 } });

//     res.status(201).json({ message: 'Product created successfully', product: newProduct });
//   } catch (err) {
//     console.error('Error in addProduct:', err);
//     res.status(500).json({ message: 'Internal server error', error: err.message });
//   }
// };

// exports.getAllProducts = async (req, res) => {
//   try {
//     const filter = {};
//     if (req.query.category) {
//       const c = await Category.findOne({ name: req.query.category }) || await Category.findById(req.query.category);
//       if (!c) return res.status(404).json({ message: 'Category not found' });
//       filter.category = c._id;
//     }

//     const products = await Product.find(filter).populate('category', 'name');
//     const host = `${req.protocol}://${req.get('host')}/uploads`;

//     const normalized = products.map(p => {
//       const obj = p.toObject();
//       const mapUrl = (filename) => filename ? `${host}/${filename}` : null;

//       return {
//         ...obj,
//         category: p.category?.name || p.category,
//         image: mapUrl(obj.image),
//         brochure: mapUrl(obj.brochure),
//         specification: mapUrl(obj.specification),
//         images: (obj.images || []).map(mapUrl),
//         videos: (obj.videos || []).map(mapUrl),
//         media: (obj.media || []).map(m => ({ ...m, file: mapUrl(m.file) })),
//         banner1: mapUrl(obj.banner1),
//         banner2: mapUrl(obj.banner2),
//       };
//     });

//     res.status(200).json(normalized);
//   } catch (err) {
//     console.error('Error fetching products:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.getProductById = async (req, res) => {
//   try {
//     const p = await Product.findById(req.params.id).populate('category', 'name');
//     if (!p) return res.status(404).json({ message: 'Product not found' });

//     const host = `${req.protocol}://${req.get('host')}/uploads`;
//     const mapUrl = (filename) => filename ? `${host}/${filename}` : null;
//     const obj = p.toObject();

//     const productWithUrls = {
//       ...obj,
//       category: p.category?.name || p.category,
//       image: mapUrl(obj.image),
//       brochure: mapUrl(obj.brochure),
//       specification: mapUrl(obj.specification),
//       images: (obj.images || []).map(mapUrl),
//       videos: (obj.videos || []).map(mapUrl),
//       media: (obj.media || []).map(m => ({ ...m, file: mapUrl(m.file) })),
//       banner1: mapUrl(obj.banner1),
//       banner2: mapUrl(obj.banner2),
//     };

//     res.status(200).json(productWithUrls);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error retrieving product' });
//   }
// };

// exports.updateProduct = async (req, res) => {
//   try {
//     // DEBUG: see what actually arrived from the client
//     console.log('[UPDATE] req.files keys:', Object.keys(req.files || {}));
//     console.log('[UPDATE] req.body:', req.body);

//     const id = req.params.id;
//     const p = await Product.findById(id);
//     if (!p) return res.status(404).json({ message: 'Product not found' });

//     // Helper: sanitize primitive values (remove "", "null", "undefined")
//     const clean = (v) => {
//       if (v === '' || v === undefined || v === null) return undefined;
//       if (typeof v === 'string' && (v.toLowerCase() === 'null' || v.toLowerCase() === 'undefined')) return undefined;
//       return v;
//     };

//     // Helper: get filename from absolute URL like http://host/uploads/file.pdf
//     const filenameFromPath = (maybeUrlOrFile) => {
//       if (!maybeUrlOrFile) return null;
//       try {
//         // already a plain filename
//         if (!String(maybeUrlOrFile).includes('/')) return maybeUrlOrFile;
//         // strip everything up to last slash
//         return String(maybeUrlOrFile).split('/').pop();
//       } catch {
//         return maybeUrlOrFile;
//       }
//     };

//     // START – build "updates" from body (only defined & changed)
//     const fields = [
//       'name','description','sku','brand','status','model','productTag','productType',
//       'nightVision','audioChannel','battery','type','irRange','poePorts','ethernetPorts','offers',
//       'megaPixel','biometricType','videoChannel','cameraType','accessControl','channel','lens',
//       'communications','bodyType','upLinkPorts','sfpPorts','builtInPower','sataPorts','sdCard',
//       'productBadge','productTab'
//     ];

//     const updates = {};
//     for (const k of fields) {
//       const v = clean(req.body?.[k]);
//       if (v !== undefined) updates[k] = v;
//     }

//     // Numbers
//     if (clean(req.body?.oldPrice) !== undefined) {
//       const v = parseFloat(req.body.oldPrice);
//       if (!Number.isNaN(v)) updates.oldPrice = v;
//     }
//     if (clean(req.body?.newPrice) !== undefined) {
//       const v = parseFloat(req.body.newPrice);
//       if (!Number.isNaN(v)) updates.newPrice = v;
//     }
//     if (clean(req.body?.stock) !== undefined) {
//       const v = parseFloat(req.body.stock);
//       if (!Number.isNaN(v)) updates.stock = v;
//     }

//     // Boolean
//     if (clean(req.body?.isTrending) !== undefined) {
//       const raw = req.body.isTrending;
//       updates.isTrending = raw === true || raw === 'true' || raw === 'on' || raw === '1';
//     }

//     // Category (allow name OR id)
//     const incomingCategory = clean(req.body?.category);
//     if (incomingCategory && String(incomingCategory) !== String(p.category)) {
//       const c =
//         (await Category.findOne({ name: incomingCategory })) ||
//         (await Category.findById(incomingCategory));
//       if (!c) return res.status(400).json({ message: 'Invalid category name or id' });

//       // Adjust product counts
//       if (p.category) await Category.findByIdAndUpdate(p.category, { $inc: { productCount: -1 } }, { strict: false });
//       await Category.findByIdAndUpdate(c._id, { $inc: { productCount: 1 } }, { strict: false });
//       updates.category = c._id;
//     }

//     // ---- FILES ----
//     // PDFs & banners (replace if provided)
//     const brochureFile = req.files?.brochure?.[0]?.filename || null;
//     const specFile     = req.files?.specification?.[0]?.filename || null;
//     const banner1File  = req.files?.banner1?.[0]?.filename || null;
//     const banner2File  = req.files?.banner2?.[0]?.filename || null;

//     const baseUploads = path.join(__dirname, '../uploads');

//     if (brochureFile) {
//       const prev = filenameFromPath(p.brochure);
//       if (prev) safeDeleteFile(path.join(baseUploads, prev));
//       updates.brochure = brochureFile;
//     }
//     if (specFile) {
//       const prev = filenameFromPath(p.specification);
//       if (prev) safeDeleteFile(path.join(baseUploads, prev));
//       updates.specification = specFile;
//     }
//     if (banner1File) {
//       const prev = filenameFromPath(p.banner1);
//       if (prev) safeDeleteFile(path.join(baseUploads, prev));
//       updates.banner1 = banner1File;
//     }
//     if (banner2File) {
//       const prev = filenameFromPath(p.banner2);
//       if (prev) safeDeleteFile(path.join(baseUploads, prev));
//       updates.banner2 = banner2File;
//     }

//     // New media (append; don’t wipe)
//     const imageFiles = (req.files?.images || []).map(f => f.filename);
//     const videoFiles = (req.files?.videos || []).map(f => f.filename);

//     if (imageFiles.length || videoFiles.length) {
//       const newMedia = [
//         ...imageFiles.map(f => ({ type: 'image', file: f })),
//         ...videoFiles.map(f => ({ type: 'video', file: f })),
//       ];
//       // append and re-number order
//       const merged = [...(p.media || []), ...newMedia];
//       merged.forEach((m, i) => (m.order = i));
//       p.media  = merged;
//       p.images = [...(p.images || []), ...imageFiles];
//       p.videos = [...(p.videos || []), ...videoFiles];

//       // maintain legacy single image
//       if (!p.image && imageFiles[0]) p.image = imageFiles[0];
//     }

//     // Apply scalar updates on the doc (not wiping arrays)
//     Object.assign(p, updates);

//     await p.save();

//     // Return normalized urls like in getProductById
//     const host = `${req.protocol}://${req.get('host')}/uploads`;
//     const mapUrl = (filename) => (filename ? `${host}/${filename}` : null);
//     const out = p.toObject();
//     out.image = mapUrl(out.image);
//     out.brochure = mapUrl(out.brochure);
//     out.specification = mapUrl(out.specification);
//     out.banner1 = mapUrl(out.banner1);
//     out.banner2 = mapUrl(out.banner2);
//     out.images = (out.images || []).map(mapUrl);
//     out.videos = (out.videos || []).map(mapUrl);
//     out.media  = (out.media || []).map(m => ({ ...m, file: mapUrl(m.file) }));

//     return res.status(200).json({ message: 'Product updated successfully', product: out });
//   } catch (err) {
//     console.error('[UPDATE] Error:', err);
//     return res.status(500).json({ message: 'Internal server error', error: err.message });
//   }
// };


// exports.deleteProduct = async (req, res) => {
//   try {
//     const p = await Product.findByIdAndDelete(req.params.id);
//     if (!p) return res.status(404).json({ message: 'Product not found' });

//     // delete files (images/videos/pdfs/banners)
//     const base = path.join(__dirname, '../uploads');
//     const del = (f) => f && safeDeleteFile(path.join(base, f));

//     del(p.image);
//     del(p.brochure);
//     del(p.specification);
//     del(p.banner1);
//     del(p.banner2);

//     (p.images || []).forEach(del);
//     (p.videos || []).forEach(del);
//     (p.media || []).forEach(m => del(m.file));

//     await Category.findByIdAndUpdate(p.category, { $inc: { productCount: -1 } });
//     res.status(200).json({ message: 'Product deleted successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };


const Product = require('../models/Product');
const Category = require('../models/Category');
const fs = require('fs');
const path = require('path');

function safeDeleteFile(filePath) {
  try {
    if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);
  } catch (err) {
    console.warn(`Failed to delete file ${filePath}:`, err.message);
  }
}

// ✅ ADD PRODUCT
exports.addProduct = async (req, res) => {
  try {
    const {
      name, description, sku, brand, category,
      oldPrice, newPrice, stock, status,
      model, productTag, productType, nightVision, audioChannel, battery,
      type, irRange, poePorts, ethernetPorts, offers, megaPixel, biometricType,
      videoChannel, cameraType, accessControl, channel, lens, communications,
      bodyType, upLinkPorts, sfpPorts, builtInPower, sataPorts, sdCard,
      isTrending, productBadge, productTab
    } = req.body;

    const brochure = req.files?.brochure?.[0]?.filename || null;
    const specification = req.files?.specification?.[0]?.filename || null;
    const banner1 = req.files?.banner1?.[0]?.filename || null;
    const banner2 = req.files?.banner2?.[0]?.filename || null;

    const imageFiles = (req.files?.images || []).map(f => f.filename);
    const videoFiles = (req.files?.videos || []).map(f => f.filename);

    if (imageFiles.length === 0 && videoFiles.length === 0) {
      return res.status(400).json({ message: 'Please upload at least one image or video' });
    }

    const parsedOldPrice = oldPrice ? parseFloat(oldPrice) : undefined;
    const parsedNewPrice = newPrice ? parseFloat(newPrice) : undefined;
    const parsedStock = stock ? parseFloat(stock) : undefined;

    const categoryDoc =
      (await Category.findOne({ name: new RegExp(category, 'i') })) ||
      (await Category.findById(category));

    if (!categoryDoc)
      return res.status(400).json({ message: 'Invalid category name or id' });

    const media = [
      ...imageFiles.map((f, idx) => ({ type: 'image', file: f, order: idx })),
      ...videoFiles.map((f, idx) => ({ type: 'video', file: f, order: imageFiles.length + idx })),
    ];

    const newProduct = new Product({
      name,
      description,
      image: imageFiles[0] || null,
      brochure,
      specification,
      images: imageFiles,
      videos: videoFiles,
      media,
      sku,
      brand,
      category: categoryDoc._id,
      oldPrice: parsedOldPrice,
      newPrice: parsedNewPrice,
      stock: parsedStock,
      status,
      model,
      productTag,
      productType,
      nightVision,
      audioChannel,
      battery,
      type,
      irRange,
      poePorts,
      ethernetPorts,
      offers,
      megaPixel,
      biometricType,
      videoChannel,
      cameraType,
      accessControl,
      channel,
      lens,
      communications,
      bodyType,
      upLinkPorts,
      sfpPorts,
      builtInPower,
      sataPorts,
      sdCard,
      isTrending: isTrending === 'true' || isTrending === true,
      productBadge,
      productTab,
      banner1,
      banner2
    });

    await newProduct.save();
    await Category.findByIdAndUpdate(categoryDoc._id, { $inc: { productCount: 1 } });

    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (err) {
    console.error('Error in addProduct:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};


exports.updateProduct = async (req, res) => {
  try {
    // DEBUG: see what actually arrived from the client
    console.log('[UPDATE] req.files keys:', Object.keys(req.files || {}));
    console.log('[UPDATE] req.body:', req.body);

    const id = req.params.id;
    const p = await Product.findById(id);
    if (!p) return res.status(404).json({ message: 'Product not found' });

    // Helper: sanitize primitive values (remove "", "null", "undefined")
    const clean = (v) => {
      if (v === '' || v === undefined || v === null) return undefined;
      if (typeof v === 'string' && (v.toLowerCase() === 'null' || v.toLowerCase() === 'undefined')) return undefined;
      return v;
    };

    // Helper: get filename from absolute URL like http://host/uploads/file.pdf
    const filenameFromPath = (maybeUrlOrFile) => {
      if (!maybeUrlOrFile) return null;
      try {
        // already a plain filename
        if (!String(maybeUrlOrFile).includes('/')) return maybeUrlOrFile;
        // strip everything up to last slash
        return String(maybeUrlOrFile).split('/').pop();
      } catch {
        return maybeUrlOrFile;
      }
    };

    // START – build "updates" from body (only defined & changed)
    const fields = [
      'name','description','sku','brand','status','model','productTag','productType',
      'nightVision','audioChannel','battery','type','irRange','poePorts','ethernetPorts','offers',
      'megaPixel','biometricType','videoChannel','cameraType','accessControl','channel','lens',
      'communications','bodyType','upLinkPorts','sfpPorts','builtInPower','sataPorts','sdCard',
      'productBadge','productTab'
    ];

    const updates = {};
    for (const k of fields) {
      const v = clean(req.body?.[k]);
      if (v !== undefined) updates[k] = v;
    }

    // Numbers
    if (clean(req.body?.oldPrice) !== undefined) {
      const v = parseFloat(req.body.oldPrice);
      if (!Number.isNaN(v)) updates.oldPrice = v;
    }
    if (clean(req.body?.newPrice) !== undefined) {
      const v = parseFloat(req.body.newPrice);
      if (!Number.isNaN(v)) updates.newPrice = v;
    }
    if (clean(req.body?.stock) !== undefined) {
      const v = parseFloat(req.body.stock);
      if (!Number.isNaN(v)) updates.stock = v;
    }

    // Boolean
    if (clean(req.body?.isTrending) !== undefined) {
      const raw = req.body.isTrending;
      updates.isTrending = raw === true || raw === 'true' || raw === 'on' || raw === '1';
    }

    // Category (allow name OR id)
    const incomingCategory = clean(req.body?.category);
    if (incomingCategory && String(incomingCategory) !== String(p.category)) {
      const c =
        (await Category.findOne({ name: incomingCategory })) ||
        (await Category.findById(incomingCategory));
      if (!c) return res.status(400).json({ message: 'Invalid category name or id' });

      // Adjust product counts
      if (p.category) await Category.findByIdAndUpdate(p.category, { $inc: { productCount: -1 } }, { strict: false });
      await Category.findByIdAndUpdate(c._id, { $inc: { productCount: 1 } }, { strict: false });
      updates.category = c._id;
    }

    // ---- FILES ----
    // PDFs & banners (replace if provided)
    const brochureFile = req.files?.brochure?.[0]?.filename || null;
    const specFile     = req.files?.specification?.[0]?.filename || null;
    const banner1File  = req.files?.banner1?.[0]?.filename || null;
    const banner2File  = req.files?.banner2?.[0]?.filename || null;

    const baseUploads = path.join(__dirname, '../uploads');

    if (brochureFile) {
      const prev = filenameFromPath(p.brochure);
      if (prev) safeDeleteFile(path.join(baseUploads, prev));
      updates.brochure = brochureFile;
    }
    if (specFile) {
      const prev = filenameFromPath(p.specification);
      if (prev) safeDeleteFile(path.join(baseUploads, prev));
      updates.specification = specFile;
    }
    if (banner1File) {
      const prev = filenameFromPath(p.banner1);
      if (prev) safeDeleteFile(path.join(baseUploads, prev));
      updates.banner1 = banner1File;
    }
    if (banner2File) {
      const prev = filenameFromPath(p.banner2);
      if (prev) safeDeleteFile(path.join(baseUploads, prev));
      updates.banner2 = banner2File;
    }

    // New media (append; don’t wipe)
    const imageFiles = (req.files?.images || []).map(f => f.filename);
    const videoFiles = (req.files?.videos || []).map(f => f.filename);

    if (imageFiles.length || videoFiles.length) {
      const newMedia = [
        ...imageFiles.map(f => ({ type: 'image', file: f })),
        ...videoFiles.map(f => ({ type: 'video', file: f })),
      ];
      // append and re-number order
      const merged = [...(p.media || []), ...newMedia];
      merged.forEach((m, i) => (m.order = i));
      p.media  = merged;
      p.images = [...(p.images || []), ...imageFiles];
      p.videos = [...(p.videos || []), ...videoFiles];

      // maintain legacy single image
      if (!p.image && imageFiles[0]) p.image = imageFiles[0];
    }

    // Apply scalar updates on the doc (not wiping arrays)
    Object.assign(p, updates);

    await p.save();

    // Return normalized urls like in getProductById
    const host = `${req.protocol}://${req.get('host')}/uploads`;
    const mapUrl = (filename) => (filename ? `${host}/${filename}` : null);
    const out = p.toObject();
    out.image = mapUrl(out.image);
    out.brochure = mapUrl(out.brochure);
    out.specification = mapUrl(out.specification);
    out.banner1 = mapUrl(out.banner1);
    out.banner2 = mapUrl(out.banner2);
    out.images = (out.images || []).map(mapUrl);
    out.videos = (out.videos || []).map(mapUrl);
    out.media  = (out.media || []).map(m => ({ ...m, file: mapUrl(m.file) }));

    return res.status(200).json({ message: 'Product updated successfully', product: out });
  } catch (err) {
    console.error('[UPDATE] Error:', err);
    return res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};


// ✅ GET ALL PRODUCTS (with ?category filter)
exports.getAllProducts = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) {
      const c =
        (await Category.findOne({ name: new RegExp(req.query.category, 'i') })) ||
        (await Category.findById(req.query.category));
      if (!c) return res.status(404).json({ message: 'Category not found' });
      filter.category = c._id;
    }

    const products = await Product.find(filter).populate('category', 'name');
    const host = `${req.protocol}://${req.get('host')}/uploads`;

    const normalized = products.map(p => {
      const obj = p.toObject();
      const mapUrl = (filename) => filename ? `${host}/${filename}` : null;

      return {
        ...obj,
        category: p.category?.name || p.category,
        image: mapUrl(obj.image),
        brochure: mapUrl(obj.brochure),
        specification: mapUrl(obj.specification),
        images: (obj.images || []).map(mapUrl),
        videos: (obj.videos || []).map(mapUrl),
        media: (obj.media || []).map(m => ({ ...m, file: mapUrl(m.file) })),
        banner1: mapUrl(obj.banner1),
        banner2: mapUrl(obj.banner2),
      };
    });

    res.status(200).json(normalized);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ GET SINGLE PRODUCT
exports.getProductById = async (req, res) => {
  try {
    const p = await Product.findById(req.params.id).populate('category', 'name');
    if (!p) return res.status(404).json({ message: 'Product not found' });

    const host = `${req.protocol}://${req.get('host')}/uploads`;
    const mapUrl = (filename) => filename ? `${host}/${filename}` : null;
    const obj = p.toObject();

    const productWithUrls = {
      ...obj,
      category: p.category?.name || p.category,
      image: mapUrl(obj.image),
      brochure: mapUrl(obj.brochure),
      specification: mapUrl(obj.specification),
      images: (obj.images || []).map(mapUrl),
      videos: (obj.videos || []).map(mapUrl),
      media: (obj.media || []).map(m => ({ ...m, file: mapUrl(m.file) })),
      banner1: mapUrl(obj.banner1),
      banner2: mapUrl(obj.banner2),
    };

    res.status(200).json(productWithUrls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving product' });
  }
};

// ✅ DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    const p = await Product.findByIdAndDelete(req.params.id);
    if (!p) return res.status(404).json({ message: 'Product not found' });

    const base = path.join(__dirname, '../uploads');
    const del = (f) => f && safeDeleteFile(path.join(base, f));

    del(p.image);
    del(p.brochure);
    del(p.specification);
    del(p.banner1);
    del(p.banner2);

    (p.images || []).forEach(del);
    (p.videos || []).forEach(del);
    (p.media || []).forEach(m => del(m.file));

    await Category.findByIdAndUpdate(p.category, { $inc: { productCount: -1 } });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.getProducts = async (req, res) => {
  try {
    const { category, brand } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (brand) filter.brand = brand;

    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

