// test/app.e2e-spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/accounts/topup (POST)', () => {
    return request(app.getHttpServer())
      .post('/accounts/topup')
      .send({ currency: 'USD', amount: 100 })
      .expect(201)
      .expect('Account topped up successfully');
  });

  it('/accounts/balance (GET)', () => {
    return request(app.getHttpServer())
      .get('/accounts/balance')
      .expect(200)
      .expect({ balances: { USD: 100, EUR: 0, GBP: 0 } });
  });

  it('/fx-conversion/quote (GET)', () => {
    return request(app.getHttpServer())
      .get('/fx-conversion/quote')
      .expect(200)
      .expect((res) => {
        expect(res.body.quoteId).toBeDefined();
        expect(res.body.expiry_at).toBeGreaterThan(Date.now());
      });
  });

  it('/fx-conversion (POST)', () => {
    return request(app.getHttpServer())
      .get('/fx-conversion/quote')
      .expect(200)
      .then((res) => {
        const { quoteId } = res.body;
        return request(app.getHttpServer())
          .post('/fx-conversion')
          .send({ quoteId, fromCurrency: 'USD', toCurrency: 'EUR', amount: 100 })
          .expect(201)
          .expect((res) => {
            expect(res.body.convertedAmount).toBe(85);
            expect(res.body.currency).toBe('EUR');
          });
      });
  });
});
