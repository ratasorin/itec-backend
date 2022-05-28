import { Booking as PrismaBooking } from '@prisma/client';
import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class Booking implements PrismaBooking {
  @IsDateString()
  @IsNotEmpty()
  book_from: Date;

  @IsDateString()
  @IsNotEmpty()
  book_until: Date;

  id: number;

  @IsNumber()
  @IsNotEmpty()
  space_id: number;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
