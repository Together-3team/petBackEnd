"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupBuyingGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let GroupBuyingGateway = class GroupBuyingGateway {
    constructor() {
        this.subscriptions = new Map();
    }
    handleConnection(client, ...args) {
        console.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
        this.unsubscribeAll(client);
    }
    handleSubscribeToProduct(client, productId) {
        this.subscribeToProduct(client, productId);
    }
    handleUnsubscribeFromProduct(client, productId) {
        this.unsubscribeFromProduct(client, productId);
    }
    subscribeToProduct(client, productId) {
        const room = `product_${productId}`;
        client.join(room);
        if (!this.subscriptions.has(productId)) {
            this.subscriptions.set(productId, new Set());
        }
        this.subscriptions.get(productId).add(client.id);
        console.log(`Client ${client.id} subscribed to ${room}`);
    }
    unsubscribeFromProduct(client, productId) {
        const room = `product_${productId}`;
        client.leave(room);
        if (this.subscriptions.has(productId)) {
            this.subscriptions.get(productId).delete(client.id);
            if (this.subscriptions.get(productId).size === 0) {
                this.subscriptions.delete(productId);
            }
        }
        console.log(`Client ${client.id} unsubscribed to ${room}`);
    }
    async sendProductUpdate(productId) {
        const room = `product_${productId}`;
        this.server.to(room).emit('productUpdate', { productId });
        if (productId != null) {
            console.log(`Sent product update for ${productId} to ${this.subscriptions.get(productId)?.size} clients`);
        }
    }
    unsubscribeAll(client) {
        this.subscriptions.forEach((clients, productId) => {
            if (clients.has(client.id)) {
                clients.delete(client.id);
                if (clients.size === 0) {
                    this.subscriptions.delete(productId);
                }
            }
        });
    }
};
exports.GroupBuyingGateway = GroupBuyingGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], GroupBuyingGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('subscribeToProduct'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Number]),
    __metadata("design:returntype", void 0)
], GroupBuyingGateway.prototype, "handleSubscribeToProduct", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('unsubscribeFromProduct'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Number]),
    __metadata("design:returntype", void 0)
], GroupBuyingGateway.prototype, "handleUnsubscribeFromProduct", null);
exports.GroupBuyingGateway = GroupBuyingGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        }
    })
], GroupBuyingGateway);
