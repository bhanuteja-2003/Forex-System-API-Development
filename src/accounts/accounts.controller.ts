

import { Controller, Get, Post, Body } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TopUpDto } from './dto/top-up.dto'; // Import the TopUpDto

@Controller('accounts')
@ApiTags('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('topup')
  @ApiBody({ type: TopUpDto }) // Use the TopUpDto for request body documentation
  @ApiResponse({ status: 201, description: 'Account topped up successfully' })
  topUpAccount(@Body() topUpDto: TopUpDto) {
    return this.accountsService.topUpAccount(topUpDto.currency, topUpDto.amount);
  }

  @Get('balance')
  @ApiResponse({ status: 200, description: 'Returns account balance' })
  getAccountBalance() {
    return this.accountsService.getAccountBalance();
  }
}
