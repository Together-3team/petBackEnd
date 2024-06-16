import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'node:net'


@WebSocketGateway()
export class GroupBuyingGateway {
}