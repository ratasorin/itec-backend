import { PrismaClient } from '@prisma/client';
import moment from 'moment';

const prisma = new PrismaClient();

const main = async () => {
  try {
    await prisma.user.create({
      data: {
        id: 1,
        name: 'Sorin',
      },
    });

    await prisma.building.create({
      data: {
        id: 1,
      },
    });

    await prisma.space.create({
      data: {
        id: 1,
        buildingId: 1,
      },
    });

    const from = moment().toISOString();
    const to = moment().add(2, 'hours').toISOString();

    await prisma.bookings.create({
      data: {
        bookFrom: from,
        bookUntil: to,
        spaceId: 1,
        userId: 1,
      },
    });
  } catch (e) {
    console.error(e);
  } finally {
    prisma.$disconnect();
  }
};

main();
