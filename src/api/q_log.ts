import { Router, Response } from 'express';
import { CustomRequest } from '../custom';
import { QLog } from '../db/q_log.model';
import async from './util/async';
import { userRequired } from './util/userRequired';

const router = Router();
export default router;

interface IQLog {
  user_no?: number;
  q_no?: number;
  subjective?: string;
}

/**
 * @apiGroup QuestionLog
 * @apiVersion 1.0.0
 * 설문 결과 로그 처리 API
 */

/**
 * @api {post} /qlog/:user_no
 * @apiName PostQuestionLog
 * @apiParam (Param) {Integer} user_no 유저 외래키
 * @apiParam (Body) {Integer} q_no 질문 외래키
 * @apiParam (Body) {String} subjective 주관식
 */
router.post(
  '/:user_no',
  userRequired,
  async(async (req: CustomRequest, res: Response) => {
    let { user_no } = req?.params;
    const { q_no, subjective }: IQLog = req?.body;
    if (!user_no || !q_no) throw 'ValidationError';
    res.json(await QLog.create({ user_no, q_no, subjective }));
  }),
);

/**
 * @api {get} /qlog/:user_no 설문 로그 목록 조회
 * @apiName GetListQuestionLog
 */
router.get(
  '/',
  async(async (req: CustomRequest, res: Response) => {
    res.json(await QLog.findAll());
  }),
);

/**
 * @api {get} /qlog/:user_no 설문 로그 목록 조회
 * @apiName GetListQuestionLogByUserNo
 * @apiParam (Param) {Integer} user_no 유저 외래키
 */
router.get(
  '/:user_no',
  userRequired,
  async(async (req: CustomRequest, res: Response) => {
    const { user_no } = req?.params;
    res.json(await QLog.findAll({ where: { user_no } }));
  }),
);

/**
 * @api {get} /qlog/:user_no 설문 로그 목록 조회
 * @apiName GetListQuestionLogByNo
 * @apiParam (Param) {Integer} user_no - 유저 외래키
 * @apiParam (Param) {Integer} no - 고유 번호
 */
router.get(
  '/:user_no/:no',
  userRequired,
  async(async (req: CustomRequest, res: Response) => {
    let { no } = req?.params;
    const output = await QLog.findOne({ where: { no } });
    if (!output) throw 'NotFound';
    res.json(output);
  }),
);

/**
 * @api {patch} /qlog/:no 설문 로그 수정 (해당 no에 해당하는 질문 수정)
 * @apiName PatchQuestionLogByNo
 * @apiParam (Param) {Integer} /:no - 고유번호
 */
router.patch(
  '/:no',
  async(async (req: CustomRequest, res: Response) => {
    let { no } = req?.params;
    const { user_no, q_no, subjective }: IQLog = req?.body;
    const beforeUpdate = await QLog.findOne({ where: { no } });
    if (!beforeUpdate) throw 'NotFound';
    await QLog.update(
      {
        user_no,
        q_no,
        subjective,
      },
      { where: { no } },
    );
    res.json(await QLog.findOne({ where: { no } }));
  }),
);

/**
 * @api {delete} /qlog/:no 설문 로그 삭제 (하나)
 * @apiName DeleteQuestionLog
 * @apiParam (Param) {Integer} /:no - 고유번호
 */
router.delete(
  '/:no',
  async(async (req: CustomRequest, res: Response) => {
    let { no } = req?.params;
    const beforeDelete = await QLog.findOne({ where: { no } });
    if (!beforeDelete) throw 'NotFound';
    await QLog.destroy({ where: { no } });
    res.json({ msg: `Deleted Question Log No: ${no}` });
  }),
);
