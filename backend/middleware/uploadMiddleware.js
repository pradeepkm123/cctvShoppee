// // const multer = require('multer');
// // const path = require('path');

// // // Configure storage for return images
// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, 'uploads/returns/');
// //   },
// //   filename: function (req, file, cb) {
// //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
// //     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
// //   }
// // });

// // // File filter for images and videos
// // const fileFilter = (req, file, cb) => {
// //   if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
// //     cb(null, true);
// //   } else {
// //     cb(new Error('Only image and video files are allowed!'), false);
// //   }
// // };

// // const upload = multer({
// //   storage: storage,
// //   fileFilter: fileFilter,
// //   limits: {
// //     fileSize: 10 * 1024 * 1024, // 10MB limit
// //   }
// // });

// // module.exports = upload;


// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // Ensure the uploads/returns directory exists
// const uploadDir = path.join(__dirname, '../uploads/returns');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Configure storage for return images/videos
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, `return-${uniqueSuffix}${path.extname(file.originalname)}`);
//   }
// });

// // File filter for images and videos
// const fileFilter = (req, file, cb) => {
//   const allowedMimes = [
//     'image/jpeg', 'image/png', 'image/gif', 'image/webp',
//     'video/mp4', 'video/quicktime', 'video/x-msvideo'
//   ];
//   if (allowedMimes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only JPEG, PNG, GIF, WebP, MP4, MOV, and AVI files are allowed!'), false);
//   }
// };

// // Multer configuration
// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: {
//     fileSize: 10 * 1024 * 1024, // 10MB limit
//   },
//   onError: (err, next) => {
//     console.error('Multer error:', err);
//     next(err);
//   }
// });

// // Ensure uploads/returns directory exists
// const returnsDir = path.join(__dirname, "../uploads/returns");
// if (!fs.existsSync(returnsDir)) {
//   fs.mkdirSync(returnsDir, { recursive: true });
// }




// module.exports = upload;



const multer = require("multer");
const path = require("path");
const fs = require("fs");

// =====================================================
// ✅ Ensure uploads/returns directory exists
// =====================================================
const uploadDir = path.join(__dirname, "../uploads/returns");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("📁 Created uploads directory:", uploadDir);
}

// =====================================================
// ✅ Configure Multer Storage
// =====================================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const sanitizedName = file.originalname.replace(/\s+/g, "_");
    cb(null, `return-${uniqueSuffix}-${sanitizedName}`);
  },
});

// =====================================================
// ✅ Allowed File Types: Images & Videos
// =====================================================
const allowedMimes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "video/mp4",
  "video/quicktime",
  "video/x-msvideo",
  "video/x-matroska",
];

const fileFilter = (req, file, cb) => {
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    console.error(`❌ Rejected file type: ${file.mimetype}`);
    cb(
      new Error(
        "Invalid file type. Only images (JPG, PNG, GIF, WEBP) and videos (MP4, MOV, AVI, MKV) are allowed."
      ),
      false
    );
  }
};

// =====================================================
// ✅ Initialize Multer Upload
// =====================================================
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// =====================================================
// ✅ Export Middleware
// =====================================================
module.exports = upload;
