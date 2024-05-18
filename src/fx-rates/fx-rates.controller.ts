import { Controller, Get } from '@nestjs/common';
import { FxRatesService } from './fx-rates.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('fx-rates')
@Controller('fx-rates')
export class FxRatesController {
  constructor(private readonly fxRatesService: FxRatesService) {}

  @Get()
  @ApiOperation({ summary: 'Get live FX rates' })
  @ApiResponse({
    status: 200,
    description: 'Return live FX rates from memory',
    schema: {
      example: { quoteId: '12345', expiry_at: '2024-05-17T12:00:00Z' },
    },
  })
  async getRates() {
    return this.fxRatesService.getRates();
  }
}
