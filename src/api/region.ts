import { Router, Response } from 'express';
import { CustomRequest } from '../custom';
import { MainRegion } from '../db/main_region.model';
import { SubRegion } from '../db/sub_region.model';
import async from './util/async';

const router = Router();
export default router;

/**
 * @api {post} /region 메인 지역 등록
 * @apiName PostRegion
 * @apiGroup Region
 * @apiParam (Body) {String} name 지역이름
 * @apiVersion 1.0.0
 */
router.post(
  '/',
  async(async (req: CustomRequest, res: Response) => {
    let { name } = req?.body;
    if (!name) throw 'ValidationError';
    const findMainRegion = await MainRegion.findOne({ where: { name } });
    if (findMainRegion) throw 'RegionConflict';
    const result = await MainRegion.create({ name });
    res.json(result);
  }),
);

/**
 * @api {get} /region 지역 전체 목록 조회
 * @apiName GetAllRegion
 * @apiGroup Region
 * @apiVersion 1.0.0
 */
router.get(
  '/',
  async(async (req: CustomRequest, res: Response) => {
    const output = await MainRegion.findAll();
    res.json(output);
  }),
);

/**
 * @api {get} /region/:no 메인 지역조회 (하나)
 * @apiName GetRegion
 * @apiGroup Region
 * @apiParam (Param) /:no - 고유번호
 * @apiVersion 1.0.0
 */
router.get(
  '/:no',
  async(async (req: CustomRequest, res: Response) => {
    let { no } = req?.params;
    const output = await MainRegion.findOne({
      where: { no },
      include: [{ model: SubRegion }],
    });
    if (!output) throw 'RegionNotFound';
    res.json(output);
  }),
);

/**
 * @api {patch} /region/:no 메인지역 수정
 * @apiName PatchRegion
 * @apiGroup Region
 * @apiParam (Param) /:no - 고유번호
 * @apiParam (Body) {String} name 이름
 * @apiVersion 1.0.0
 */
router.patch(
  '/:no',
  async(async (req: CustomRequest, res: Response) => {
    let { no } = req?.params;
    let { name } = req?.body;
    const findRegion = await MainRegion.findOne({ where: { no } });
    if (!findRegion) throw 'RegionNotFound';
    await MainRegion.update({ name }, { where: { no } });
    res.json(await MainRegion.findOne({ where: { no } }));
  }),
);

/**
 * @api {delete} /region/:no 지역 삭제 (하나)
 * @apiName DeleteRegion
 * @apiGroup Region
 * @apiParam (Param) /:no - 고유번호
 * @apiVersion 1.0.0
 */
router.delete(
  '/:no',
  async(async (req: CustomRequest, res: Response) => {
    let { no } = req?.params;
    const beforeDelete = await MainRegion.findOne({ where: { no } });
    if (!beforeDelete) throw 'RegionNotFound';
    await MainRegion.destroy({ where: { no } });
    res.json({ msg: `Deleted Region Number: ${no}` });
  }),
);

/**
 * @api {post} /region/sub/:main_region_no 서브 지역 등록
 * @apiName PostSubRegion
 * @apiGroup Region
 * @apiParam (Params) {Long} main_region_no 메인 지역 외래키
 * @apiParam (Body) {String} name 지역이름
 * @apiVersion 1.0.0
 */
router.post(
  '/sub/:main_region_no',
  async(async (req: CustomRequest, res: Response) => {
    const { main_region_no } = req?.params;
    let { name } = req?.body;
    if (!name) throw 'ValidationError';
    if (name?.includes(',')) {
      const list = name?.split(', ');
      await list.map(async (v: string) => {
        await SubRegion.create({ main_region_no, name: v });
      });
    } else {
      await SubRegion.create({ main_region_no, name });
    }
    res.json(await MainRegion.findOne({ where: { no: main_region_no } }));
  }),
);

/**
 * @api {get} /region/sub/:main_region_no 서브 지역 전체 목록 조회
 * @apiName GetAllSubRegion
 * @apiGroup Region
 * @apiVersion 1.0.0
 */
router.get(
  '/sub/:main_region_no',
  async(async (req: CustomRequest, res: Response) => {
    const { main_region_no } = req?.params;
    const output = await SubRegion.findAll({ where: { main_region_no } });
    res.json(output);
  }),
);

/**
 * @api {get} /region/sub/:main_region_no/:no 서브 지역조회 (하나)
 * @apiName GetSubRegion
 * @apiGroup Region
 * @apiParam (Param) /:main_region_no - 메인 지역 외래키
 * @apiParam (Param) /:no - 고유번호
 * @apiVersion 1.0.0
 */
router.get(
  '/sub/:main_region_no/:no',
  async(async (req: CustomRequest, res: Response) => {
    let { main_region_no, no } = req?.params;
    const output = await SubRegion.findOne({ where: { main_region_no, no } });
    if (!output) throw 'RegionNotFound';
    res.json(output);
  }),
);

/**
 * @api {patch} /region/sub/:main_region_no/:no 서브지역 수정
 * @apiName PatchSubRegion
 * @apiGroup Region
 * @apiParam (Param) /:main_region_no - 메인 지역 외래키
 * @apiParam (Param) /:no - 고유번호
 * @apiParam (Body) {String} name 이름
 * @apiVersion 1.0.0
 */
router.patch(
  '/sub/:main_region_no/:no',
  async(async (req: CustomRequest, res: Response) => {
    let { main_region_no, no } = req?.params;
    let { name } = req?.body;
    const findRegion = await SubRegion.findOne({ where: { main_region_no, no } });
    if (!findRegion) throw 'RegionNotFound';
    await SubRegion.update({ name }, { where: { main_region_no, no } });
    res.json(await SubRegion.findOne({ where: { main_region_no, no } }));
  }),
);

/**
 * @api {delete} /region/sub/:main_region_no/:no 서브지역 삭제 (하나)
 * @apiName DeleteSubRegion
 * @apiGroup Region
 * @apiParam (Param) /:main_region_no - 메인 지역 외래키
 * @apiParam (Param) /:no - 고유번호
 * @apiVersion 1.0.0
 */
router.delete(
  '/sub/:main_region_no/:no',
  async(async (req: CustomRequest, res: Response) => {
    let { main_region_no, no } = req?.params;
    const beforeDelete = await SubRegion.findOne({ where: { main_region_no, no } });
    if (!beforeDelete) throw 'RegionNotFound';
    await SubRegion.destroy({ where: { main_region_no, no } });
    res.json({ msg: `Deleted Region Number: ${no}` });
  }),
);
