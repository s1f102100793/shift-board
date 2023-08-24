import type { DefineMethods } from 'aspida';
import type { ShiftModel } from '../../commonTypesWithClient/models';

export type Methods = DefineMethods<{
  get: {
    resBody: ShiftModel[];
  };
  post: {
    reqBody: {
      id: string;
      date: string;
      starttime: string;
      endtime: string;
    };
  };
  delete: {
    reqBody: {
      id: string;
      date: string;
    };
  };
}>;
