import { NextFunction } from 'express';
import { CustomRequest } from '../../custom';
import { Question } from '../../db/question.model';
import async from './async';

export async function questionRequiredHandler(
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) {
  const { q_no } = req?.params;
  const findQuestion = await Question.findOne({ where: { no: q_no } });
  if (!findQuestion) {
    next('QuestionNotFound');
  } else {
    next();
  }
}

export const questionRequired = async(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    questionRequiredHandler(req, res, next);
  },
);
