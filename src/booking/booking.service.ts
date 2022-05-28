import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Booking, Timeframe } from './interfaces';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async isAvalibleSpace(
    { start: JSONStart, end: JSONEnd }: Timeframe,
    id: number,
  ) {
    const start = new Date(JSONStart);
    const end = new Date(JSONEnd);
    console.log({ start, end, id });
    try {
      const [{ overlaps }] = await this.prisma.$queryRaw<
        {
          overlaps: number;
        }[]
      >`
        SELECT COUNT(*) AS overlaps FROM bookings
        WHERE space_id = ${id} 
        AND book_from BETWEEN ${start} AND ${end}
        OR book_until BETWEEN ${start} AND ${end}
        `;
      return !overlaps;
    } catch (err) {
      console.error(err);
      return err;
    }
  }
  async bookSpace({ book_from, id, space_id, book_until, user_id }: Booking) {
    try {
      const booking = this.prisma.booking.create({
        data: {
          book_from,
          book_until,
          id,
          space_id,
          user_id,
        },
      });

      return booking;
    } catch (err) {
      console.error(err);
    }
  }
}
