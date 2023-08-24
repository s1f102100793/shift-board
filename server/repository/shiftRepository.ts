import type { ShiftModel } from '$/commonTypesWithClient/models';
import { userIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
import type { Shift } from '@prisma/client';

export const toShiftModel = (prismaShift: Shift): ShiftModel => ({
  id: userIdParser.parse(prismaShift.id),
  date: prismaShift.date,
  starttime: prismaShift.starttime,
  endtime: prismaShift.endtime,
});

export const createShift = async (
  id: ShiftModel['id'],
  date: ShiftModel['date'],
  starttime: ShiftModel['starttime'],
  endtime: ShiftModel['endtime']
): Promise<ShiftModel> => {
  console.log('来ている');
  const prismaShift = await prismaClient.shift.create({
    data: { id, date, starttime, endtime },
  });
  return toShiftModel(prismaShift);
};
// export const createOrUpdateShift = async (
//   id: ShiftModel['id'],
//   date: ShiftModel['date'],
//   starttime: ShiftModel['starttime'],
//   endtime: ShiftModel['endtime']
// ): Promise<ShiftModel> => {
//   const prismaShift = await prismaClient.shift.upsert({
//     where: { id_date: { id, date } },
//     create: { id, date, starttime, endtime },
//     update: { starttime, endtime },
//   });
//   return toShiftModel(prismaShift);
// };

export const shiftRepository = {
  save: async (id: string, date: string, starttime: string, endtime: string) => {
    console.log('Upserting Shift with the following data:');
    console.log(`ID: ${id}`);
    console.log(`Date: ${date}`);
    console.log(`Start Time: ${starttime}`);
    console.log(`End Time: ${endtime}`);
    const res = await prismaClient.shift.upsert({
      where: { id_date: { id, date } },
      create: {
        id,
        date,
        starttime,
        endtime,
      },
      update: {
        starttime,
        endtime,
      },
    });
    console.log(res.date);
    return;
  },
};

export const shiftRepository2 = {
  save: async (id: string, date: string, starttime: string, endtime: string) => {
    console.log('Upserting Shift with the following data:');
    console.log(`ID: ${id}`);
    console.log(`Date: ${date}`);
    console.log(`Start Time: ${starttime}`);
    console.log(`End Time: ${endtime}`);
    const res = await prismaClient.fixedshift.upsert({
      where: { id_date: { id, date } },
      create: {
        id,
        date,
        starttime,
        endtime,
      },
      update: {
        starttime,
        endtime,
      },
    });
    console.log(res.date);
    return;
  },
};

export const getShift = async (myId: string): Promise<ShiftModel[]> => {
  const prismaTasks = await prismaClient.shift.findMany({
    where: { id: myId },
    select: {
      id: true,
      date: true,
      starttime: true,
      endtime: true,
    },
  });

  return prismaTasks.map(toShiftModel);
};

export const getFixedShiftOnlyId = async (myId: string): Promise<ShiftModel[]> => {
  const prismaTasks = await prismaClient.fixedshift.findMany({
    where: { id: myId },
    select: {
      id: true,
      date: true,
      starttime: true,
      endtime: true,
    },
  });

  return prismaTasks.map(toShiftModel);
};

export const getSubmitShift = async (): Promise<ShiftModel[]> => {
  const prismaTasks = await prismaClient.shift.findMany({
    select: {
      id: true,
      date: true,
      starttime: true,
      endtime: true,
    },
  });

  return prismaTasks.map(toShiftModel);
};

export const getFixedShift = async (): Promise<ShiftModel[]> => {
  const prismaTasks = await prismaClient.fixedshift.findMany({
    select: {
      id: true,
      date: true,
      starttime: true,
      endtime: true,
    },
  });

  return prismaTasks.map(toShiftModel);
};

export const deleteShift = async (myId: string): Promise<void> => {
  await prismaClient.shift.deleteMany({
    where: { id: myId },
  });
};

export const deleteFixedShift = async (myId: string, date: string): Promise<void> => {
  console.log(myId, date);
  await prismaClient.fixedshift.deleteMany({
    where: { id: myId, date },
  });
};
