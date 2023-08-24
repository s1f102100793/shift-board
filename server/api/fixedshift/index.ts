import type { DefineMethods } from 'aspida';
import type { EmployeeId } from '../../commonTypesWithClient/branded';
import type { ShiftModel } from '../../commonTypesWithClient/models';

export type Methods = DefineMethods<{
  get: {
    resBody: ShiftModel[];
  };
  post: {
    reqBody: {
      id: EmployeeId;
      date: string;
      starttime: string;
      endtime: string;
    };
  };
  delete: {
    reqBody: {
      id: EmployeeId;
      date: string;
    };
  };
}>;
