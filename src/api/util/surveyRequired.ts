import { NextFunction } from 'express';
import { CustomRequest } from '../../custom';
import { Survey } from '../../db/survey.model';
import async from './async';

export async function surveyRequiredHandler(
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) {
  const { survey_no } = req?.params;
  const findSurvey = await Survey.findOne({ where: { no: survey_no } });
  if (!findSurvey) {
    next('SurveyNotFound');
  } else {
    next();
  }
}

export const surveyRequired = async(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    surveyRequiredHandler(req, res, next);
  },
);
