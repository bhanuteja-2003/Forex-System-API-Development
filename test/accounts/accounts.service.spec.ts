// test/accounts/accounts.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from '../../src/accounts/accounts.service';

describe('AccountsService', () => {
  let service: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountsService],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
  });

  it('should top up account', () => {
    service.topUpAccount('USD', 100);
    const balance = service.getAccountBalance().balances['USD'];
    expect(balance).toBe(100);
  });

  it('should retrieve account balance', () => {
    service.topUpAccount('USD', 50);
    const balance = service.getAccountBalance();
    expect(balance.balances['USD']).toBe(50);
  });
});
