import { getShift, shiftRepository } from '$/repository/shiftRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ body }) => ({ status: 200, body: await getShift(body.id) }),
  // post: async ({ body }) => ({
  //   status: 201,
  //   body: await createOrUpdateShift(body.id, body.date, body.starttime, body.endtime),
  // }),
  post: async ({ body }) => ({
    status: 201,
    body: await shiftRepository.save(body.id, body.date, body.starttime, body.endtime),
  }),
  // post: async ({ body }) => ({
  //   status: 201,
  //   body: await createShift(body.id, body.date, body.starttime, body.endtime),
  // }),
}));
