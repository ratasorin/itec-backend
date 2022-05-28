import { Bookings } from '@prisma/client';
import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class Booking implements Bookings {
  @IsDateString()
  @IsNotEmpty()
  bookFrom: Date;

  @IsDateString()
  @IsNotEmpty()
  bookUntil: Date;

  id: number;

  @IsNumber()
  @IsNotEmpty()
  spaceId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
