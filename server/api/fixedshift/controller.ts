import { shiftRepository2 } from '$/repository/shiftRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({ status: 200, body: 'Hello' }),
  post: async ({ body }) => ({
    status: 201,
    body: await shiftRepository2.save(body.id, body.date, body.starttime, body.endtime),
  }),
}));
