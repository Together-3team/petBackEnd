
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './config/typeorm';
import { setupSwagger } from '../swagger'
import userRoute from './routes/user.route';
import productRoute from './routes/product.route';
import swaggerUi from 'swagger-ui-express';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

AppDataSource.initialize().catch(error => console.log(error));

// 스웨거 기본 세팅
const swaggerSpec = setupSwagger();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// users 라우터 세팅
app.use('/users', userRoute);
// products 라우터 세팅
app.use('/products', productRoute);

// 기존 라우트 설정
app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});