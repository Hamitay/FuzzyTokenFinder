
import aws from "aws-sdk";
import dotenv from 'dotenv';
import multer from "multer"
import multerS3 from "multer-s3";

dotenv.config();

const KEY = process.env.KEY || "";
const SECRET = process.env.SECRET || "";
const BUCKET_NAME = process.env.BUCKET_NAME || "";
const S3_ENDPOINT = process.env.S3_ENDPOINT || "";

const spacesEndpoint = new aws.Endpoint(S3_ENDPOINT);
const credentials = new aws.Credentials({accessKeyId: KEY, secretAccessKey: SECRET})

const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  credentials,
});

export const imageUploadMiddleware = multer({
    storage: multerS3({
        s3: s3,
        bucket: BUCKET_NAME,
        acl: 'public-read',
        key: (_req, file, cb) => {
            cb(null, file.originalname)
        },
        
    })
}).single('tokenImage')
