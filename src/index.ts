import express from 'express';
import cors from 'cors';
import { AppDataSource } from './config/typeorm';
import { setupSwagger } from '../swagger';
import { UserRouter, ReviewRouter, AuthRouter, ProductRouter, Utility, DeliveryRouter, ZzimRouter, PaymentRouter, SelectedProductRouter, PurchaseRouter } from './routes';
import swaggerUi from 'swagger-ui-express';
import passport from 'passport';
import './passport';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { initializeWebSocket } from './websockets/group.buying.websocket';
import { PaymentController } from './controllers';
import { WebSocketService } from './services';

dotenv.config();

const app = express();
const httpServer = http.createServer(app);
const io = new SocketIOServer(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cors());
app.use(cookieParser());
AppDataSource.initialize().catch(error => console.log(error));

// 스웨거 기본 세팅
const swaggerSpec = setupSwagger();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 라우터 세팅
app.use('/users', UserRouter);
app.use('/products', ProductRouter);
app.use('/auth', AuthRouter);
app.use('/review', ReviewRouter);
app.use('/utility', Utility);
app.use('/deliveries', DeliveryRouter);
app.use('/zzims', ZzimRouter);
app.use('/payments', PaymentRouter);
app.use('/selected-products', SelectedProductRouter);
app.use('/purchases', PurchaseRouter);

// 기존 라우트 설정
app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});

// 웹소켓 모듈 초기화
initializeWebSocket(io);

// 웹소켓 서비스 초기화 및 컨트롤러 설정
const paymentController = new PaymentController();
const webSocketService = new WebSocketService(io);
paymentController.setWebSocketService(webSocketService);

app.post('/webhook', paymentController.webHook);
app.post('/payments/confirm', paymentController.paymentsConfirm);


const PORT = process.env.SERVER_PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

export { app, passport };