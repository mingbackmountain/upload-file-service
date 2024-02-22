import express from 'express';
import multer from 'multer'
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../swagger-config';
import FileController from './controllers/FileController';

const app = express();
const port = process.env.PORT || 3000;

const fileController = new FileController();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define API endpoint for file upload
app.post('/upload', upload.single('file'), fileController.uploadFile.bind(fileController));

// Add Swagger middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;

