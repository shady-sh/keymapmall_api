import { Router, Response } from 'express';
import { CustomRequest } from '../custom';
import { QType } from '../db/q_type.model';
import async from './util/async';

const router = Router();
export default router;

/**
 * @apiGroup QuestionType
 * @apiVersion 1.0.0
 * 질문 타입 처리 API
 */

/**
 * @api {post} /qtype - 질문 타입 생성
 * @apiName PostQuestionType
 * @apiParam (Body) {String} info - 질문 타입 정보
 */
router.post(
  '/',
  async(async (req: CustomRequest, res: Response) => {
    let { info } = req?.body;
    if (!info) throw 'ValidationError';
    res.json(await QType.create({ info }));
  }),
);

/**
 * @api {get} /qtype - 질문 타입 목록 조회
 * @apiName GetListQuestionType
 */
router.get(
  '/',
  async(async (req: CustomRequest, res: Response) => {
    res.json(await QType.findAll());
  }),
);

/**
 * @api {patch} /qtype/:no - 질문 타입 수정
 * @apiName PatchQuestionType
 * @apiParam (Body) {String} info - 질문 타입 정보
 */
router.patch(
  '/:no',
  async(async (req: CustomRequest, res: Response) => {
    let { no } = req?.params;
    let { info } = req?.body;
    const findQuestionType = await QType.findOne({ where: { no } });
    if (!findQuestionType) throw 'NotFound';
    await QType.update({ info }, { where: { no } });
    res.json(await QType.findOne({ where: { no } }));
  }),
);

/**
 * @api {delete} /qtype/:no - 질문 타입 삭제
 * @apiName DeleteQuestionType
 */
router.delete(
  '/:no',
  async(async (req: CustomRequest, res: Response) => {
    let { no } = req?.params;
    const beforeDelete = await QType.findOne({ where: { no } });
    if (!beforeDelete) throw 'NotFound';
    await QType.destroy({ where: { no } });
    res.json({ msg: `Deleted Question Type No: ${no}` });
  }),
);
