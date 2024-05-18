// fx-conversion.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class FxConversionDto {
  @ApiProperty({ description: 'Quote ID received from generating a quote', example: '12345' })
  quoteId: string;

  @ApiProperty({ description: 'Currency code of the currency to convert from (e.g., USD)', example: 'USD' })
  fromCurrency: string;

  @ApiProperty({ description: 'Currency code of the currency to convert to (e.g., EUR)', example: 'EUR' })
  toCurrency: string;

  @ApiProperty({ description: 'Amount to convert', example: 100 })
  amount: number;
}
