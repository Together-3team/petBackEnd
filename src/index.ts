import express from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import userRoute from './routes/user.route'
import { AppDataSource } from './config/typeorm'
import cors from 'cors'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

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
                url: `http://localhost:${port}`, // 서버 주소
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
const specs = swaggerJsdoc(options)

AppDataSource.initialize().catch(error => console.log(error))

// Swagger UI 미들웨어 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

app.use('/users', userRoute)


// 기존 라우트 설정
app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!')
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})
