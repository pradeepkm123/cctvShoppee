const Banner = require('../models/sliderModel');

// Create a new banner
exports.createBanner = async (req, res) => {
  try {
    const { id, eyebrow, title, blurb, ctaText, ctaHref, bg, light } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const banner = new Banner({
      id: parseInt(id),
      image,
      eyebrow,
      title,
      blurb,
      ctaText,
      ctaHref,
      bg,
      light: light === 'true',
    });

    await banner.save();
    res.status(201).json(banner);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
