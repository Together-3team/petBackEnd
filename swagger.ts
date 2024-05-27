import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Express } from 'express'

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
        url: `http://localhost:${process.env.SERVER_PORT}`, // 서버 주소
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'User ID'
            },
            name: {
              type: 'string',
              description: 'User name'
            },
            email: {
              type: 'string',
              description: 'User email'
            }
          },
          required: ['id', 'name', 'email']
        },
        CreateUserDto: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'User name'
            },
            email: {
              type: 'string',
              description: 'User email'
            }
          },
          required: ['name', 'email']
        }
      }
    }
  },
  apis: ['./src/routes/*.ts', './src/dtos/*.ts'], // API 경로 (라우트 및 DTO 경로)
}

// Swagger 문서 생성
const swaggerSpec = swaggerJsdoc(options)

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}