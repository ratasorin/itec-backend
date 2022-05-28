import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Booking, Timeframe } from './interfaces';

type QueryResult = {
  overlaps: number;
}[];

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async isAvalibleSpace({ start, end }: Timeframe, id: number) {
    console.log({ start, end, id });
    try {
      const [{ overlaps }] = await this.prisma.$queryRaw<QueryResult>`
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
      const isAvailable = await this.isAvalibleSpace(
        { start: book_from, end: book_until },
        space_id,
      );
      if (!isAvailable)
        return `SPACE ${space_id} is booked from ${book_from} until ${book_until}` as const;
      return this.prisma.booking.create({
        data: {
          book_from,
          book_until,
          id,
          space_id,
          user_id,
        },
      });
    } catch (err) {
      console.error(err);
    }
  }
}
