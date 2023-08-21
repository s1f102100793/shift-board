import { createShift } from '$/repository/shiftRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({ status: 200, body: 'Hello' }),
  // post: async ({ body }) => ({
  //   status: 201,
  //   body: await createOrUpdateShift(body.id, body.date, body.starttime, body.endtime),
  // }),
  // post: async ({ body }) => ({
  //   status: 201,
  //   body: await shiftRepository.save(body.id, body.date, body.starttime, body.endtime),
  // }),
  post: async ({ body }) => ({
    status: 201,
    body: await createShift(body.id, body.date, body.starttime, body.endtime),
  }),
}));
