import { Test, TestingModule } from '@nestjs/testing';
import { FxConversionController } from './fx-conversion.controller';
import { FxConversionService } from './fx-conversion.service';
import { FxRatesService } from '../fx-rates/fx-rates.service';

describe('FxConversionController', () => {
  let fxConversionController: FxConversionController;
  let fxConversionService: FxConversionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FxConversionController],
      providers: [FxConversionService, FxRatesService],  // Add FxRatesService here
    }).compile();

    fxConversionController = module.get<FxConversionController>(FxConversionController);
    fxConversionService = module.get<FxConversionService>(FxConversionService);
  });

  it('should be defined', () => {
    expect(fxConversionController).toBeDefined();
  });
});
