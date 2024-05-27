import express from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import userRoute from './routes/user.route'
import { AppDataSource } from './config/typeorm'
import cors from 'cors'
import productRoute from './routes/product.route'
import { setupSwagger } from '../swagger'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


AppDataSource.initialize().catch(error => console.log(error))


// users 라우터 세팅
app.use('/users', userRoute)
// products 라우터 세팅
app.use('/products', productRoute)

// 스웨거 기본 세팅
setupSwagger(app);


// 기존 라우트 설정
app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!')
})

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.SERVER_PORT}`)
})
