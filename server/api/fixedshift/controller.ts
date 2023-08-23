import { getFixedShift, shiftRepository2 } from '$/repository/shiftRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({ status: 200, body: await getFixedShift() }),
  post: async ({ body }) => ({
    status: 201,
    body: await shiftRepository2.save(body.id, body.date, body.starttime, body.endtime),
  }),
}));
