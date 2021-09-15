import { Router, Response } from 'express';
import { CustomRequest } from '../custom';
import { GpBio } from '../db/gp_bio.model';
import async from './util/async';

const router = Router();
export default router;

interface IMall {
  name?: string;
  address?: string;
  phone?: string;
}

/**
 * @api {post} /mall 병원 등록
 * @apiName PostMall
 * @apiGroup Mall
 * @apiParam (Body) {String} name 이름
 * @apiParam (Body) {String} address 주소
 * @apiParam (Body) {String} phone 폰번호
 * @apiVersion 1.0.0
 */
router.post(
  '/',
  async(async (req: CustomRequest, res: Response) => {
    let { name, address, phone }: IMall = req?.body;
    if (!name || !address || !phone) throw 'ValidationError';
    const result = await GpBio.create({ name, address, phone });
    res.json(result);
  }),
);

/**
 * @api {get} /mall 병원 전체 목록 조회
 * @apiName GetAllMall
 * @apiGroup Mall
 * @apiVersion 1.0.0
 */
router.get(
  '/',
  async(async (req: CustomRequest, res: Response) => {
    const output = await GpBio.findAll();
    res.json(output);
  }),
);

/**
 * @api {get} /mall/:no 병원 조회 (하나)
 * @apiName GetMall
 * @apiGroup Mall
 * @apiParam (Param) /:no - 고유번호
 * @apiVersion 1.0.0
 */
router.get(
  '/:no',
  async(async (req: CustomRequest, res: Response) => {
    let { no } = req?.params;
    const output = await GpBio.findOne({ where: { no } });
    if (!output) throw 'HospitalNotFound';
    res.json(output);
  }),
);

/**
 * @api {patch} /mall/:no 병원 수정
 * @apiName PatchMall
 * @apiGroup Mall
 * @apiParam (Param) /:no - 고유번호
 * @apiParam (Body) {String} name 이름
 * @apiParam (Body) {String} address 주소
 * @apiParam (Body) {String} phone 폰번호
 * @apiVersion 1.0.0
 */
router.patch(
  '/:no',
  async(async (req: CustomRequest, res: Response) => {
    let { no } = req?.params;
    let { name, address, phone }: IMall = req?.body;
    const findHospital = await GpBio.findOne({ where: { no } });
    if (!findHospital) throw 'HospitalNotFound';
    await GpBio.update({ name, address, phone }, { where: { no } });
    res.json(await GpBio.findOne({ where: { no } }));
  }),
);

/**
 * @api {delete} /mall/:no 병원 삭제 (하나)
 * @apiName DeleteMall
 * @apiGroup Mall
 * @apiParam (Param) /:no - 고유번호
 * @apiVersion 1.0.0
 */
router.delete(
  '/:no',
  async(async (req: CustomRequest, res: Response) => {
    let { no } = req?.params;
    const beforeDelete = await GpBio.findOne({ where: { no } });
    if (!beforeDelete) throw 'HospitalNotFound';
    await GpBio.destroy({ where: { no } });
    res.json({ msg: `deleted ${no}` });
  }),
);
