import type { DefineMethods } from 'aspida';
import type { HogeId } from '../../commonTypesWithClient/branded';
import type { ShiftModel } from '../../commonTypesWithClient/models';

export type Methods = DefineMethods<{
  get: {
    resBody: ShiftModel[];
  };
  post: {
    reqBody: {
      id: HogeId;
      date: string;
      starttime: string;
      endtime: string;
    };
  };
  delete: {
    reqBody: {
      id: HogeId;
      date: string;
    };
  };
}>;
