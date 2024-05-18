

import { Controller, Post, Body, Get } from '@nestjs/common';
import { FxConversionService } from './fx-conversion.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FxConversionDto } from './dto/fx-conversion.dto'; // Import the FxConversionDto

@Controller('fx-conversion')
@ApiTags('fx-conversion')
export class FxConversionController {
  constructor(private readonly fxConversionService: FxConversionService) {}

  @Get('quote')
  @ApiResponse({ status: 200, description: 'Generates a quote ID and its expiry time' })
  generateQuoteId() {
    return this.fxConversionService.generateQuoteId();
  }

  @Post()
  @ApiBody({ type: FxConversionDto }) // Use the FxConversionDto for request body documentation
  @ApiResponse({ status: 200, description: 'Returns the converted amount and currency' })
  convertCurrency(@Body() fxConversionDto: FxConversionDto) {
    try {
      return this.fxConversionService.convertCurrency(
        fxConversionDto.quoteId,
        fxConversionDto.fromCurrency,
        fxConversionDto.toCurrency,
        fxConversionDto.amount,
      );
    } catch (err) {
      console.error(err);
    }
  }
}
