import { Server, Socket } from 'socket.io';
import { IncomingMessage, ServerResponse } from 'http';

const subscriptions = new Map<number, Set<string>>();

export function initializeWebSocket(io: Server<typeof IncomingMessage, typeof ServerResponse>) {
  io.on('connection', (socket: Socket) => {
    console.log(`Client connected: ${socket.id}`);
    console.log('연결 완료');

    socket.on('subscribeToProduct', (productId: number) => {
      console.log(`subscribeToProduct`);
      subscribeToProduct(socket, productId);
    });

    socket.on('unsubscribeFromProduct', (productId: number) => {
      console.log(`unsubscribeFromProduct`);
      unsubscribeFromProduct(socket, productId);
    });

    socket.on('disconnect', () => {
      console.log('연결 끊김')
      console.log(`Client disconnected: ${socket.id}`);
      unsubscribeAll(socket);
    });
  });
}

export function sendProductUpdate(io: Server, productId: number | undefined) {
  const room = `product_${productId}`;
  io.to(room).emit('productUpdate', { productId });
  console.log(`Sent product update for ${productId}`);
}

function subscribeToProduct(client: Socket, productId: number) {
  const room = `product_${productId}`;
  client.join(room);

  if (!subscriptions.has(productId)) {
    subscriptions.set(productId, new Set<string>());
  }
  subscriptions.get(productId)!.add(client.id);

  console.log(`Client ${client.id} subscribed to ${room}`);
}

function unsubscribeFromProduct(client: Socket, productId: number) {
  const room = `product_${productId}`;
  client.leave(room);

  if (subscriptions.has(productId)) {
    subscriptions.get(productId)!.delete(client.id);
    if (subscriptions.get(productId)!.size === 0) {
      subscriptions.delete(productId);
    }
  }

  console.log(`Client ${client.id} unsubscribed from ${room}`);
}

function unsubscribeAll(client: Socket) {
  subscriptions.forEach((clients, productId) => {
    if (clients.has(client.id)) {
      clients.delete(client.id);
      if (clients.size === 0) {
        subscriptions.delete(productId);
      }
    }
  });
}