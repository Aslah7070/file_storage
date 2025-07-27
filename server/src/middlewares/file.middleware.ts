
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import { env } from '../configs/env.configs';




const allowedMimes = [
  // Images
  'image/jpeg',
  'image/png',
  'image/gif',

  // Documents
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'application/zip',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',

  // Audio
  'audio/mpeg',
  'audio/wav',
  'audio/ogg',
  'audio/webm',

  // Video
  'video/mp4',
  'video/mpeg',
  'video/x-msvideo',
  'video/webm',
  'video/quicktime'
];
const s3 = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const upload = multer({
  storage: multerS3({
    s3,
    bucket: env.S3_BUCKET_NAME || "vitalaidnsr",

    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `uploads/${uniqueSuffix}-${file.originalname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
     if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type, only JPEG, PNG, and GIF are allowed!'));
    }
  },
});



