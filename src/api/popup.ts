import { Router, Response } from 'express';
import { CustomRequest } from '../custom';
import { Popup } from '../db/popup.model';
import async from './util/async';

const router = Router();
export default router;

interface IPopup {
  name: string;
  phone: string;
  email: string;
}

/**
 * @apiGroup Popup
 * @apiVersion 1.0.0
 * 회원 추첨 팝업 데이터 처리 API
 */

/**
 * @api {post} /popup 팝업 유저 등록
 * @apiName PostPopup
 * @apiParam (Body) {String} name 팝업 유저 이름
 * @apiParam (Body) {String} phone 팝업 유저 휴대폰 번호
 * @apiParam (Body) {String} email 팝업 유저 이메일주소
 */
router.post(
  '/',
  async(async (req: CustomRequest, res: Response) => {
    const { name, phone, email }: IPopup = req?.body;
    if (!name || !phone || !email) throw 'ValidationError';
    const findConflictEmail = await Popup.findOne({ where: { email } });
    if (findConflictEmail) throw 'EmailConflict';
    const findConflictPhone = await Popup.findOne({ where: { phone } });
    if (findConflictPhone) throw 'PhoneConflict';
    res.json(await Popup.create({ name, phone, email }));
  }),
);

/**
 * @api {get} /popup 팝업 유저 전체 조회
 * @apiName GetListPopup
 */
router.get(
  '/',
  async(async (req: CustomRequest, res: Response) => {
    res.json(await Popup.findAll());
  }),
);

/**
 * @api {get} /popup/:no 팝업 유저 조회 (해당 no에 해당하는 유저 조회)
 * @apiName GetPopupUserByNo
 * @apiParam (Param) /:no - 고유번호
 */
router.get(
  '/:no',
  async(async (req: CustomRequest, res: Response) => {
    let { no } = req?.params;
    const findPopupUser = await Popup.findOne({ where: { no } });
    if (!findPopupUser) throw 'UserNotFound';
    res.json(findPopupUser);
  }),
);
