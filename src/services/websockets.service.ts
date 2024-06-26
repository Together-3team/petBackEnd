import { Server } from 'socket.io';
import { sendProductUpdate } from '../websockets/group.buying.websocket';

export class WebSocketService {
  private readonly io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  public sendProductUpdate(productId: number | undefined) {
    sendProductUpdate(this.io, productId);
  }
}