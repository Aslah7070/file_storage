import { env } from "../../configs/env.configs";
import File from "../../models/file.models";
import AWS from 'aws-sdk';
import { HttpStatus } from "../../constants/status.constants";
interface file extends Express.Multer.File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  bucket: string;
  key: string;
  acl: string;
  contentType: string;
  location: string;
}


const s3 = new AWS.S3({
  accessKeyId: env.AWS_ACCESS_KEY_ID,
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  region: env.AWS_REGION,
});
export class FileService{

async uploadFile(userId: string, files: Express.MulterS3.File[]) {
  if (!files || files.length === 0) {
    return {
      statuscode: 400,
      message: "No files uploaded",
      success: false,
    };
  }

  // Save each file to DB
  const savedFiles = await Promise.all(
    files.map(async (file) => {
      const newFile = new File({
        filename: file.key,
        originalName: file.originalname,
        size: file.size,
        url: file.location,
        contentType: file.mimetype,
        user: userId,
      }); 

      return await newFile.save();
    })
  );

  return {
    statuscode: 200,
    message: "Files uploaded and saved successfully",
    success: true,
    data: savedFiles,
  };
}

async deleteFile(fileId: string) {

 const bucketName=env.S3_BUCKET_NAME

    const file = await File.findById(fileId);

        if(!bucketName){
        return{
            statuscode:HttpStatus.BAD_REQUEST,
            message:"Bucket name is not defined",
            success:false
        }
     }
    if (!file) {
      return {
        statuscode: HttpStatus.NOT_FOUND,
        message: 'File not found',
        success: false,
      };
    }

    // Extract the S3 key from the URL
    const key = decodeURIComponent(file.url.split('.com/')[1]);

 

    try {
      await s3
        .deleteObject({
          Bucket: bucketName,
          Key: key,
        })
        .promise();
    } catch (err) {
      return {
        statuscode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to delete file from S3',
        success: false,
        error: err,
      };
    }

    // Delete from DB
    await File.findByIdAndDelete(fileId);

    return {
      statuscode: 200,
      message: 'File deleted successfully',
      success: true,
    };
  }
}