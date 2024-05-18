// test/fx-rates/fx-rates.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { FxRatesService } from '../../src/fx-rates/fx-rates.service';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('FxRatesService', () => {
  let service: FxRatesService;
  let mock: MockAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FxRatesService],
    }).compile();

    service = module.get<FxRatesService>(FxRatesService);
    mock = new MockAdapter(axios);
  });

  it('should fetch and store FX rates', async () => {
    const response = {
      'Realtime Currency Exchange Rate': {
        '5. Exchange Rate': '0.85',
      },
    };

    mock.onGet(/alphavantage.co/).reply(200, response);

    await service.fetchRates();
    const rates = service.getRates();

    expect(rates['USD_EUR'].rate).toBe(0.85);
    expect(rates['USD_EUR'].expiry).toBeGreaterThan(Date.now());
  });
});
