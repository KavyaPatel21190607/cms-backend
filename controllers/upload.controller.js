const multer = require('multer');
const { uploadFile, deleteFile, getPublicUrl } = require('../config/supabase');

// Configure multer for memory storage
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/webp,image/gif').split(',');
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB default
  },
  fileFilter: fileFilter
});

// Upload single file
exports.uploadSingle = [
  upload.single('file'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded'
        });
      }

      const folder = req.body.folder || '';
      const result = await uploadFile(
        req.file.buffer,
        req.file.originalname,
        req.file.mimetype,
        folder
      );

      res.json({
        success: true,
        message: 'File uploaded successfully',
        data: result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error uploading file',
        error: error.message
      });
    }
  }
];

// Upload multiple files
exports.uploadMultiple = [
  upload.array('files', 10),
  async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'No files uploaded'
        });
      }

      const folder = req.body.folder || '';
      const uploadPromises = req.files.map(file =>
        uploadFile(file.buffer, file.originalname, file.mimetype, folder)
      );

      const results = await Promise.all(uploadPromises);

      res.json({
        success: true,
        message: 'Files uploaded successfully',
        data: results
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error uploading files',
        error: error.message
      });
    }
  }
];

// Delete file
exports.deleteFile = async (req, res) => {
  try {
    const { path } = req.body;

    if (!path) {
      return res.status(400).json({
        success: false,
        message: 'File path is required'
      });
    }

    await deleteFile(path);

    res.json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting file',
      error: error.message
    });
  }
};

// Get public URL
exports.getPublicUrl = async (req, res) => {
  try {
    const { path } = req.query;

    if (!path) {
      return res.status(400).json({
        success: false,
        message: 'File path is required'
      });
    }

    const url = getPublicUrl(path);

    res.json({
      success: true,
      data: { url }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error getting public URL',
      error: error.message
    });
  }
};
