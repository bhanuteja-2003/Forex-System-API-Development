// top-up.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class TopUpDto {
  @ApiProperty({ description: 'Currency code (e.g., USD)', example: 'USD' })
  currency: string;

  @ApiProperty({ description: 'Amount to top up', example: 100 })
  amount: number;
}
