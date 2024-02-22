import swaggerJSDoc from 'swagger-jsdoc';
import fs from 'fs';

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

fs.writeFileSync('./swagger.json', JSON.stringify(swaggerSpec, null, 2), 'utf-8');