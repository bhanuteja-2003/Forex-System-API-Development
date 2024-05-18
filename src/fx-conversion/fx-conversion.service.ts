

import { Injectable } from '@nestjs/common';
import { FxRatesService } from '../fx-rates/fx-rates.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FxConversionService {
  private conversions: { [key: string]: { rate: number, expiry: number } } = {};

  constructor(private readonly fxRatesService: FxRatesService) {}

  generateQuoteId(): { quoteId: string, expiry_at: number } {
    const quoteId = uuidv4();
    const rates = this.fxRatesService.getRates();
    if (rates['USD_EUR']) {
      this.conversions[quoteId] = rates['USD_EUR'];
      return { quoteId, expiry_at: rates['USD_EUR'].expiry };
    } else {
      throw new Error('No available rates for the currency pair');
    }
  }

  convertCurrency(quoteId: string, fromCurrency: string, toCurrency: string, amount: number): { convertedAmount: number, currency: string } {
    const conversion = this.conversions[quoteId];
    let currentTime = Date.now();
    let diffInTime = currentTime-conversion.expiry ;
    if (conversion &&  diffInTime > 30000) {
      const convertedAmount = amount * conversion.rate;
      return { convertedAmount, currency: toCurrency };
    } else { 
      throw new Error('Invalid or expired quoteId');
    }
  }
}
