import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    resBody: string;
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
