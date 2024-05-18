import { Injectable } from '@nestjs/common'; // Importing Injectable decorator from Nest.js for creating injectable services
import axios from 'axios'; // Importing axios for making HTTP requests

@Injectable() // This decorator marks the class as a service that can be injected into other components
export class FxRatesService {
  private rates: { [key: string]: { rate: number, expiry: number } } = {}; // Private property to store FX rates with their expiry times

  constructor() {
    this.fetchRates(); // Fetch initial rates when the service is instantiated
     setInterval(() => this.fetchRates(), 30000); // Schedule rate fetching every 30 seconds
  }

  async fetchRates(): Promise<void> {
    try {
      const API_KEY = "";
      const response = await axios.get(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=EUR&apikey=${API_KEY}`); // Fetching FX rates from AlphaVantage API
      console.log(response)
      const data = response.data['Realtime Currency Exchange Rate']; // Extracting the relevant data from the API response
      const exchangeRate = parseFloat(data['5. Exchange Rate']); // Parsing the exchange rate to a number
      this.rates['USD_EUR'] = { rate: exchangeRate, expiry: Date.now() }; // Storing the rate with an expiry time 30 seconds from now
    } catch (error) {
      console.error('Failed to fetch FX rates', error); // Logging error if fetching fails
    }
  }

  getRates(): { [key: string]: { rate: number, expiry: number } } {
    return this.rates; // Method to return the current FX rates
  }
}
