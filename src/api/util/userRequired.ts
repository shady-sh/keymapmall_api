import { NextFunction } from 'express';
import { CustomRequest } from '../../custom';
import { Survey } from '../../db/survey.model';
import { User } from '../../db/user.model';
import async from './async';

export async function userRequiredHandler(
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) {
  const { user_no } = req?.params;
  const findUser = await User.findOne({ where: { no: user_no } });
  if (!findUser) {
    next('UserNotFound');
  } else {
    next();
  }
}

export const userRequired = async(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    userRequiredHandler(req, res, next);
  },
);
