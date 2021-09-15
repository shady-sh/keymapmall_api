import { Router, Response } from 'express';
import { CustomRequest } from '../custom';
import { QOption } from '../db/q_option.model';
import async from './util/async';
import { questionRequired } from './util/questionRequired';

const router = Router();
export default router;

interface IQOption {
  content?: string;
  type_no?: number;
}

/**
 * @apiGroup Q_Option
 * @apiVersion 1.0.0
 * 설문지 질문 문항 처리 API
 */

/**
 * @api {post} /qoption/:q_no - 문항 생성
 * @apiName PostQuestionOption
 * @apiParam (Param) {Integer} q_no 질문 외래키
 * @apiParam (Body) {Integer} type_no 질문 외래키
 * @apiParam (Body) {String} content 문항 내용
 */
router.post(
  '/:q_no',
  questionRequired,
  async(async (req: CustomRequest, res: Response) => {
    let { q_no } = req?.params;
    const { content, type_no }: IQOption = req?.body;
    if (!content) throw 'ValidationError';
    type_no
      ? res.json(await QOption.create({ q_no, content, type_no }))
      : res.json(await QOption.create({ q_no, content }));
  }),
);

/**
 * @api {get} /qoption/:q_no - 문항 조회
 * @apiName GetListQuestionOption
 * @apiParam (Param) {Integer} q_no 질문 외래키
 */
router.get(
  '/:q_no',
  questionRequired,
  async(async (req: CustomRequest, res: Response) => {
    let { q_no } = req?.params;
    res.json(await QOption.findAll({ where: { q_no } }));
  }),
);

/**
 * @api {get} /qoption/:q_no/:no 문항 조회 (해당 no에 해당하는 문항 조회)
 * @apiName GetQuestionOptionByNo
 * @apiParam (Param) {Integer} /:q_no - 질문 외래키
 * @apiParam (Param) {Integer} /:no - 고유번호
 */
router.get(
  '/:q_no/:no',
  questionRequired,
  async(async (req: CustomRequest, res: Response) => {
    let { no } = req?.params;
    const output = await QOption.findOne({ where: { no } });
    if (!output) throw 'NotFound';
    res.json(output);
  }),
);

/**
 * @api {patch} /qoption/:q_no/:no 문항 수정 (해당 no에 해당하는 문항 수정)
 * @apiName PatchQuestionOptionByNo
 * @apiParam (Param) {Integer} /:q_no - 질문 외래키
 * @apiParam (Param) {Integer} /:no - 고유번호
 */
router.patch(
  '/:q_no/:no',
  questionRequired,
  async(async (req: CustomRequest, res: Response) => {
    let { no } = req?.params;
    const { content, type_no }: IQOption = req?.body;
    const findQuestionOption = await QOption.findOne({ where: { no } });
    if (!findQuestionOption) throw 'NotFound';
    await QOption.update({ content, type_no }, { where: { no } });
    res.json(await QOption.findOne({ where: { no } }));
  }),
);

/**
 * @api {delete} /qoption/:q_no/:no 문항 삭제 (하나)
 * @apiName DeleteQuestionOption
 * @apiParam (Param) {Integer} /:q_no - 질문 외래키
 * @apiParam (Param) {Integer} /:no - 고유번호
 */
router.delete(
  '/:q_no/:no',
  questionRequired,
  async(async (req: CustomRequest, res: Response) => {
    let { no } = req?.params;
    const beforeDelete = await QOption.findOne({ where: { no } });
    if (!beforeDelete) throw 'NotFound';
    await QOption.destroy({ where: { no } });
    res.json({ msg: `Deleted QuestionOption No: ${no}` });
  }),
);
