import request from 'supertest';
import { app } from '../src'

describe('POST /payments/confirm', () => {
  it('should confirm payment and return success', async () => {
    const paymentRequestDto = {
      selectedProductIds: '1,2,3',
      deliveryId: 1,
      userId: 1,
      amount: 1000,
      orderId: 'orderId123',
      paymentKey: 'paymentKey123',
    };

    const response = await request(app)
      .post('/payments/confirm')
      .send(paymentRequestDto)
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
  });

  it('should return 500 if an error occurs', async () => {
    const paymentRequestDto = {
      selectedProductIds: '1,2,3',
      deliveryId: 1,
      userId: 1,
      amount: 1000,
      orderId: 'orderId123',
      paymentKey: 'invalidKey',
    };

    const response = await request(app)
      .post('/payments/confirm')
      .send(paymentRequestDto)
      .expect(500);

    expect(response.body).toHaveProperty('error', 'Internal Server Error');
  });
});