import { Router, Response } from 'express';
import { CustomRequest } from '../custom';
import { SelectedSurvey } from '../db/selected_survey.model';
import { Survey } from '../db/survey.model';
import async from './util/async';

const router = Router();
export default router;

interface ISelectedSurvey {
  survey_no: number;
}

/**
 * @apiGroup SelectedSurvey
 * @apiVersion 1.0.0
 * 노출할 설문지 선택 API
 */

/**
 * @api {post} /selectedsurvey 노출할 설문지 선택
 * @apiName PostSelectedSurvey
 * @apiParam (Body) {Integer} survey_no 설문지 외래키
 */
router.post(
  '/',
  async(async (req: CustomRequest, res: Response) => {
    const { survey_no }: ISelectedSurvey = req?.body;
    const findSurvey = await Survey.findOne({ where: { no: survey_no } });
    if (!findSurvey) throw 'SurveyNotFound';
    const findSelectedSurvey = await SelectedSurvey.findOne({ where: { no: 1 } });
    if (findSelectedSurvey) {
      await SelectedSurvey.update({ survey_no }, { where: { no: 1 } });
      res.json(await SelectedSurvey.findOne({ where: { no: 1 } }));
    } else {
      res.json(await SelectedSurvey.create({ survey_no }));
    }
  }),
);

/**
 * @api {get} /selectedsurvey 노출중인 설문지 조회
 * @apiName GetSelectedSurvey
 */
router.get(
  '/',
  async(async (req: CustomRequest, res: Response) => {
    res.json(
      await SelectedSurvey.findAll({ include: [{ model: Survey, as: 'survey' }] }),
    );
  }),
);
