---

# Forex Trading System

## Introduction
Welcome to the Forex Trading System backend project. This project is built using Nest.js, a powerful framework for building efficient and scalable server-side applications with Node.js.

## Features
- **FX Rate Syncing**: The system fetches live FX conversion rates from AlphaVantage API and stores them in memory.
- **Account Management**: Users can top up their account with a specified amount in a given currency and check their account balances.
- **FX Conversion**: Users can perform FX conversions using the fetched rates.
- **Swagger Documentation**: API endpoints are documented using Swagger for easy reference.

## Installation
1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install the dependencies.

## Configuration
1. Obtain an API key from AlphaVantage (https://www.alphavantage.co).
2. Replace the placeholder API key in `fx-rates.service.ts` with your actual API key.

## Usage
1. Start the server by running `npm start`.
2. Navigate to `http://localhost:3000/api` to access the Swagger documentation and explore the available endpoints.

## API Endpoints
- **POST /accounts/topup**: Top up the user's account with a specified amount in a given currency.
- **GET /accounts/balance**: Retrieve the balances in all currencies for the user's account.
- **GET /fx-rates**: Fetch live FX conversion rates from memory.
- **POST /fx-conversion**: Perform an FX conversion using the provided quoteId and convert the specified amount from one currency to another.

## Testing
1. Run `npm test` to execute the unit tests.

## Dependencies
- Nest.js: A progressive Node.js framework for building efficient and scalable server-side applications.
- Axios: A promise-based HTTP client for making HTTP requests.
- Swagger: A tool for documenting and testing RESTful APIs.
