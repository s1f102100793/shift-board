import type { DefineMethods } from 'aspida';
import type { ShiftModel } from '../../commonTypesWithClient/models';

export type Methods = DefineMethods<{
  get: {
    reqBody: {
      id: string;
    };
    // query?: {
    //   limit?: number;
    // };
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
}>;
