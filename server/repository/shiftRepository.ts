import type { ShiftModel } from '$/commonTypesWithClient/models';
import { prismaClient } from '$/service/prismaClient';
import type { Shift } from '@prisma/client';

export const toShiftModel = (prismaShift: Shift): ShiftModel => ({
  id: prismaShift.id,
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
  const prismaShift = await prismaClient.shift.create({
    data: { id, date, starttime, endtime },
  });
  return toShiftModel(prismaShift);
};
