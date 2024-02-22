import { S3Client } from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import { Upload } from '@aws-sdk/lib-storage';

class FileService {
  private s3: S3Client;

  constructor() {
    this.s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
        secretAccessKey: process.env.AWS_ACCESS_KEY_ID ??'',
      },
    });
  }

  async uploadFile(fileBuffer: Buffer, originalName: string): Promise<string> {
    const key = Date.now() + '-' + originalName;

    console.log(key)

    const upload = new Upload({
      client: this.s3,
      params: {
        Bucket: process.env.AWS_BUCKET,
        Key: key,
        Body: new Readable({
          read() {
            this.push(fileBuffer);
            this.push(null);
          },
        }),
      },
    });

    try {
      await upload.done();
      // Construct the S3 object URL manually
      const fileLocation = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
      return fileLocation;
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      throw error;
    }
  }
}

export default FileService;