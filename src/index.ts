import express from 'express';
import cors from 'cors';
import { AppDataSource } from './config/typeorm'
import { setupSwagger } from '../swagger'
import { UserRouter, ReviewRouter, AuthRouter, ProductRouter, Utility } from './routes';
import swaggerUi from 'swagger-ui-express';
import passport from 'passport';
import './passport';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cors());
app.use(cookieParser());
AppDataSource.initialize().catch(error => console.log(error));

// 스웨거 기본 세팅
const swaggerSpec = setupSwagger();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// users 라우터 세팅
app.use('/users', UserRouter);
// products 라우터 세팅
app.use('/products', ProductRouter);
// auth 라우터 세팅
app.use('/auth', AuthRouter);
// review 라우터 세팅
app.use('/review', ReviewRouter);
// utility 라우터 세팅
app.use('/utility', Utility);

// 기존 라우트 설정
app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

export default passport