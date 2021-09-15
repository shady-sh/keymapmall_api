import { Router, Response } from 'express';
import { CustomRequest } from '../custom';
import { Question } from '../db/question.model';
import async from './util/async';
import { surveyRequired } from './util/surveyRequired';

const router = Router();
export default router;

interface IQuestion {
  title?: string;
  min?: number;
  max?: number;
}

/**
 * @apiGroup Question
 * @apiVersion 1.0.0
 * 설문지 질문 처리 API
 */

/**
 * @api {post} /question/:survey_no 질문 생성
 * @apiName PostQuestion
 * @apiParam (Param) {Integer} survey_no 설문지 외래키
 * @apiParam (Body) {String} title 질문 타이틀
 * @apiParam (Body) {Integer} min 최소 선택 질문
 * @apiParam (Body) {Integer} max 최대 선택 질문
 */
router.post(
  '/:survey_no',
  surveyRequired,
  async(async (req: CustomRequest, res: Response) => {
    let { survey_no } = req?.params;
    const { title, min, max }: IQuestion = req?.body;
    if (!title || !min || !max || max < min || min < 1) throw 'ValidationError';
    res.json(await Question.create({ survey_no, title, min, max }));
  }),
);

/**
 * @api {get} /question/:survey_no 질문 목록 조회
 * @apiName GetListQuestion
 * @apiParam (Param) {Integer} survey_no 설문지 외래키
 */
router.get(
  '/:survey_no',
  surveyRequired,
  async(async (req: CustomRequest, res: Response) => {
    let { survey_no } = req?.params;
    res.json(await Question.findAll({ where: { survey_no } }));
  }),
);

/**
 * @api {get} /question/:survey_no/:no 질문 조회 (해당 no에 해당하는 질문 조회)
 * @apiName GetQuestionByNo
 * @apiParam (Param) {Integer} /:survey_no - 설문지 외래키
 * @apiParam (Param) {Integer} /:no - 고유번호
 */
router.get(
  '/:survey_no/:no',
  surveyRequired,
  async(async (req: CustomRequest, res: Response) => {
    let { no } = req?.params;
    const output = await Question.findOne({ where: { no } });
    if (!output) throw 'QuestionNotFound';
    res.json(output);
  }),
);

/**
 * @api {patch} /question/:survey_no/:no 질문 수정 (해당 no에 해당하는 질문 수정)
 * @apiName PatchQuestionByNo
 * @apiParam (Param) {Integer} /:survey_no - 설문지 외래키
 * @apiParam (Param) {Integer} /:no - 고유번호
 */
router.patch(
  '/:survey_no/:no',
  surveyRequired,
  async(async (req: CustomRequest, res: Response) => {
    let { no } = req?.params;
    const { title, min, max }: IQuestion = req?.body;
    const findQuestion = await Question.findOne({ where: { no } });
    if (!findQuestion) throw 'QuestionNotFound';
    await Question.update({ title, min, max }, { where: { no } });
    res.json(await Question.findOne({ where: { no } }));
  }),
);

/**
 * @api {delete} /question/:survey_no/:no 질문 삭제 (하나)
 * @apiName DeleteQuestion
 * @apiParam (Param) {Integer} /:survey_no - 설문지 외래키
 * @apiParam (Param) {Integer} /:no - 고유번호
 */
router.delete(
  '/:survey_no/:no',
  surveyRequired,
  async(async (req: CustomRequest, res: Response) => {
    let { no } = req?.params;
    const beforeDelete = await Question.findOne({ where: { no } });
    if (!beforeDelete) throw 'QuestionNotFound';
    await Question.destroy({ where: { no } });
    res.json({ msg: `Deleted Question No: ${no}` });
  }),
);
