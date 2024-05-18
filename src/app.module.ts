// src/app.module.ts

import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { FxConversionModule } from './fx-conversion/fx-conversion.module';
import { FxRatesModule } from './fx-rates/fx-rates.module';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

@Module({
  imports: [AccountsModule, FxConversionModule, FxRatesModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
