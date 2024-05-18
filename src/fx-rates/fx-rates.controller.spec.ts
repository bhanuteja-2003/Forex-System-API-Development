import { Test, TestingModule } from '@nestjs/testing';
import { FxRatesController } from './fx-rates.controller';
import { FxRatesService } from './fx-rates.service';

describe('FxRatesController', () => {
  let fxRatesController: FxRatesController;
  let fxRatesService: FxRatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FxRatesController],
      providers: [FxRatesService],
    }).compile();

    fxRatesController = module.get<FxRatesController>(FxRatesController);
    fxRatesService = module.get<FxRatesService>(FxRatesService);
  });

  it('should be defined', () => {
    expect(fxRatesController).toBeDefined();
  });
});
