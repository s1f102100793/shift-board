import type { DefineMethods } from 'aspida';
import type { ShiftModel } from '../../commonTypesWithClient/models';

export type Methods = DefineMethods<{
  get: {
    resBody: string;
  };
  post: {
    reqBody: {
      id: string;
      year: number;
      month: number;
    };
    resBody: ShiftModel[];
  };
}>;
