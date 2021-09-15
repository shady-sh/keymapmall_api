import { Request } from 'express';

export interface CustomRequest extends Request {
  token: string | undefined;

  session: any;
  data: any;
  photo: any;
  audio: any;
}

export type Resolver = (value?: unknown) => void;

export const ADMIN_LEVEL = {
  USER: 0,
  ADMIN: 1,
};
