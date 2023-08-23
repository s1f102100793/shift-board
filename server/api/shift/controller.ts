import { getSubmitShift, shiftRepository } from '$/repository/shiftRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({ status: 200, body: await getSubmitShift() }),
  post: async ({ body }) => ({
    status: 201,
    body: await shiftRepository.save(body.id, body.date, body.starttime, body.endtime),
  }),
}));
