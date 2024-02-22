import swaggerJSDoc from 'swagger-jsdoc';
import dotenv from 'dotenv'

dotenv.config();

console.log('AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID);
console.log('AWS_ACCESS_KEY_ID:', process.env.AWS_SECRET_ACCESS_KEY);
console.log('AWS_ACCESS_KEY_ID:', process.env.AWS_BUCKET);

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'File Upload Service',
      version: '1.0.0',
      description: 'API documentation for the file upload service',
    },
  },
  apis: ['./src/**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;