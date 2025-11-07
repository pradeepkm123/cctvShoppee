const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename(req, file, cb) {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const allowedImage = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const allowedVideo = ['video/mp4', 'video/webm', 'video/ogg'];
const allowedPdf   = ['application/pdf'];

function fileFilter(req, file, cb) {
  const { mimetype } = file;
  if (allowedImage.includes(mimetype) || allowedVideo.includes(mimetype) || allowedPdf.includes(mimetype)) {
    return cb(null, true);
  }
  cb(new Error('Only images (jpg/png/webp/gif), videos (mp4/webm/ogg), and PDFs are allowed'));
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 200 * 1024 * 1024 // 200MB max per file (tune as you like)
  }
});

module.exports = upload;










// const multer = require('multer');
// const path = require('path');

// // Ensure upload directory exists
// const fs = require('fs');
// const uploadDir = 'uploads/banners';
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, 'banner-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only image files are allowed!'), false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: {
//     fileSize: 5 * 1024 * 1024 // 5MB limit
//   }
// });

// module.exports = upload;