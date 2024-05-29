
import swaggerJsdoc from 'swagger-jsdoc';

// Swagger 설정 옵션
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pet Store API',
      version: '1.0.0',
      description: 'APIs for managing pet',
    },
    servers: [
      {
        url: `http://${process.env.PUBLIC_IP}:${process.env.SERVER_PORT}`, // 서버 주소
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/dtos/*.ts'], // API 경로 (라우트 및 DTO 경로)
};

// Swagger 문서 생성
const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = () => {
  return swaggerSpec;
};