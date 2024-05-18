import { Injectable } from '@nestjs/common';


@Injectable()
export class AccountsService {
  private balances: { [key: string]: number } = { USD: 0, EUR: 0, GBP: 0 };

  topUpAccount(currency: string, amount: number): string {
    if (this.balances[currency] !== undefined) {
      this.balances[currency] += amount;
    } else {
      this.balances[currency] = amount;
    }
    return 'Account topped up successfully';
  }

  getAccountBalance(): { balances: { [key: string]: number } } {
    return { balances: this.balances };
  }
}
