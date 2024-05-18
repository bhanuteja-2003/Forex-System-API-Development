// test/fx-conversion/fx-conversion.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { FxConversionService } from '../../src/fx-conversion/fx-conversion.service';
import { FxRatesService } from '../../src/fx-rates/fx-rates.service';

describe('FxConversionService', () => {
  let service: FxConversionService;
  let fxRatesService: FxRatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FxConversionService,
        {
          provide: FxRatesService,
          useValue: {
            getRates: jest.fn().mockReturnValue({
              'USD_EUR': { rate: 0.85, expiry: Date.now() + 30000 },
            }),
          },
        },
      ],
    }).compile();

    service = module.get<FxConversionService>(FxConversionService);
    fxRatesService = module.get<FxRatesService>(FxRatesService);
  });

  it('should generate a quote ID', () => {
    const { quoteId, expiry_at } = service.generateQuoteId();
    expect(quoteId).toBeDefined();
    expect(expiry_at).toBeGreaterThan(Date.now());
  });

  it('should convert currency', () => {
    const { quoteId } = service.generateQuoteId();
    const result = service.convertCurrency(quoteId, 'USD', 'EUR', 100);
    expect(result.convertedAmount).toBe(85);
    expect(result.currency).toBe('EUR');
  });
});
