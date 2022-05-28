import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { Booking, Timeframe } from './interfaces';

@Controller('booking')
export class BookingController {
  constructor(private service: BookingService) {}

  @Get('availability/:id')
  async isAvailableBetween(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: Timeframe,
  ) {
    console.log({ id });
    return await this.service.isAvalibleSpace(input, id);
  }
  @Post()
  async bookSpace(@Body() input: Booking) {
    const booking = await this.service.bookSpace(input);
    return booking;
  }
}
