import express from 'express';
import multer from 'multer';
import { bucket } from '../config/firebase.js';

const router = express.Router();

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
});

// Upload single or multiple files
router.post('/', upload.array('photos', 10), async (req, res) => {
  try {
    if (!bucket) {
      return res.status(503).json({ 
        error: 'File upload not available',
        message: 'Firebase is not configured. Please add Firebase credentials to .env file.'
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const uploadedFiles = [];

    for (const file of req.files) {
      // Generate unique filename
      const filename = `${Date.now()}-${file.originalname}`;
      const blob = bucket.file(`uploads/${filename}`);
      
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      await new Promise((resolve, reject) => {
        blobStream.on('error', (error) => {
          console.error('Upload error:', error);
          reject(error);
        });

        blobStream.on('finish', async () => {
          // Make the file publicly accessible
          await blob.makePublic();
          
          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
          
          uploadedFiles.push({
            originalName: file.originalname,
            filename,
            url: publicUrl,
            size: file.size,
          });
          
          resolve();
        });

        blobStream.end(file.buffer);
      });
    }

    console.log(`✅ Uploaded ${uploadedFiles.length} file(s)`);
    res.json({ 
      message: 'Files uploaded successfully',
      files: uploadedFiles 
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

