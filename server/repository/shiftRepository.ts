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

// export const shiftRepository = {
//   save: async (id: string, date: string, starttime: string, endtime: string) => {
//     await prismaClient.shift.upsert({
//       where: { id, date }, // 一意な条件を指定
//       create: {
//         id,
//         date,
//         starttime,
//         endtime,
//       },
//       update: {
//         date,
//         starttime,
//         endtime,
//       },
//     });
//     return;
//   },
// };
