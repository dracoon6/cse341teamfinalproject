const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'College Catalog API',
    description: 'API for managing college courses and instructors',
  },
  host: 'cse341teamfinalproject.onrender.com', // Replace with your actual Render URL
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
