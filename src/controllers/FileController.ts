/**
 * @swagger
 * tags:
 *   name: File
 *   description: File operations
 */

import { Request, Response } from 'express';
import FileService from '../services/FileService';
import EmailService from '../services/EmailService';

const fileService = new FileService();
const emailService = new EmailService();

class FileController {
  /**
   * @swagger
   * /upload:
   *   post:
   *     summary: Upload a file
   *     tags: [File]
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               file:
   *                 type: string
   *                 format: binary
   *     responses:
   *       '200':
   *         description: File uploaded successfully
   *       '500':
   *         description: Internal Server Error
   */
  async uploadFile(req:Request,res:Response): Promise<void> {
    try {
      //Upload File
      const fileLocation = await fileService.uploadFile(req.file?.buffer!,req.file?.originalname!);

      //Send email notification
      await emailService.sendNotification(
        'destination-email',
        'File Upload Notification',
        `A new file has been uploaded. Location: ${fileLocation}`
      );

      res.json({message: 'File uploaded successfully.'})
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default FileController;