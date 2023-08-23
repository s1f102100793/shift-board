import { deleteShift } from '$/repository/shiftRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({ status: 200, body: 'Hello' }),
  delete: async ({ params }) => {
    await deleteShift(params.shiftId);
    return { status: 204 };
  },
}));
