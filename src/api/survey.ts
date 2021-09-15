import { Router, Response } from 'express';
import { CustomRequest } from '../custom';
import { Question } from '../db/question.model';
import { QLog } from '../db/q_log.model';
import { QOption } from '../db/q_option.model';
import { QType } from '../db/q_type.model';
import { Survey } from '../db/survey.model';
import { User } from '../db/user.model';
import async from './util/async';

const router = Router();
export default router;

interface ISurvey {
  name?: string;
  info?: string;
}

/**
 * @apiGroup Survey
 * @apiVersion 1.0.0
 * 설문지 관련 처리 API
 */

/**
 * @api {post} /survey 설문지 등록
 * @apiName PostSurvey
 * @apiParam (Body) {String} name 설문지명
 * @apiParam (Body) {String} info 설문지 정보
 */
router.post(
  '/',
  async(async (req: CustomRequest, res: Response) => {
    const { name, info }: ISurvey = req?.body;
    if (!name || !info) throw 'ValidationError';
    const existName = await Survey.findOne({ where: { name } });
    if (existName) throw 'NameConflict';
    res.json(await Survey.create({ name, info }));
  }),
);

/**
 * @api {get} /survey 설문지 전체 조회
 * @apiName GetListSurvey
 */
router.get(
  '/',
  async(async (req: CustomRequest, res: Response) => {
    res.json(await Survey.findAll());
  }),
);

/**
 * @api {get} /survey/:no 설문지 조회 (해당 no에 해당하는 설문지 조회)
 * @apiName GetSurveyByNo
 * @apiParam (Param) /:no - 고유번호
 */
router.get(
  '/:no',
  async(async (req: CustomRequest, res: Response) => {
    let { no } = req?.params;
    const output = await Survey.findOne({
      where: { no },
      include: [
        {
          model: Question,
          include: [
            { model: QOption, include: [{ model: QType }] },
            { model: QLog, include: [{ model: User, as: 'user' }] },
          ],
        },
      ],
    });
    if (!output) throw 'SurveyNotFound';
    res.json(output);
  }),
);

/**
 * @api {patch} /survey/:no 설문지 수정
 * @apiName PatchSurvey
 * @apiParam (Param) /:no - 고유번호
 * @apiParam (Body) {String} name 설문지 이름
 * @apiParam (Body) {String} info 설문지 정보
 */
router.patch(
  '/:no',
  async(async (req: CustomRequest, res: Response) => {
    const { no } = req?.params;
    const { name, info }: ISurvey = req?.body;
    const findSurvey = await Survey.findOne({ where: { no } });
    if (!findSurvey) throw 'SurveyNotFound';
    await Survey.update({ name, info }, { where: { no } });
    res.json(await Survey.findOne({ where: { no } }));
  }),
);

/**
 * @api {delete} /survey/:no 설문지 삭제 (하나)
 * @apiName DeleteSurvey
 * @apiParam (Param) /:no - 고유번호
 */
router.delete(
  '/:no',
  async(async (req: CustomRequest, res: Response) => {
    let { no } = req?.params;
    const beforeDelete = await Survey.findOne({ where: { no } });
    if (!beforeDelete) throw 'SurveyNotFound';
    await Survey.destroy({ where: { no } });
    res.json({ msg: `Deleted Survey No: ${no}` });
  }),
);
