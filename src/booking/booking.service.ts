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
        SELECT COUNT(*) AS overlaps FROM "Bookings"
        WHERE "spaceId" = ${id} 
        AND "bookFrom" BETWEEN ${start} AND ${end}
        OR "bookUntil" BETWEEN ${start} AND ${end}
        `;
      return !overlaps;
    } catch (err) {
      console.error(err);
      return err;
    }
  }
  async bookSpace({ bookFrom, id, spaceId, bookUntil, userId }: Booking) {
    try {
      const booking = this.prisma.bookings.create({
        data: {
          bookFrom,
          bookUntil,
          id,
          spaceId,
          userId,
        },
      });

      return booking;
    } catch (err) {
      console.error(err);
    }
  }
}
