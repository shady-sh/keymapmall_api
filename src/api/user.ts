import { Router, Response } from 'express';
import { CustomRequest } from '../custom';
import { User } from '../db/user.model';
import async from './util/async';

const router = Router();
export default router;

interface IUser {
  name?: string;
  phone?: string;
  email?: string;
}

/**
 * @apiGroup User
 * @apiVersion 1.0.0
 * User 관련 처리 API
 */

/**
 * @api {post} /user 유저 생성
 * @apiName PostUser
 * @apiParam (Body) {String} name 유저 이름
 * @apiParam (Body) {String} phone 유저 휴대폰 번호
 * @apiParam (Body) {String} mail 유저 이메일
 */
router.post(
  '/',
  async(async (req: CustomRequest, res: Response) => {
    const { name, phone, email }: IUser = req?.body;
    if (!name || !phone || !email) throw 'ValidationError';
    res.json(await User.create({ name, phone, email }));
  }),
);

/**
 * @api {get} /user 유저 전체 목록
 * @apiName GetListUser
 */
router.get(
  '/',
  async(async (req: CustomRequest, res: Response) => {
    res.json(await User.findAll());
  }),
);

/**
 * @api {get} /user/:no 유저 조회 (해당 no에 해당하는 유저 조회)
 * @apiName GetUserByNo
 * @apiParam (Param) /:no - 고유번호
 */
router.get(
  '/:no',
  async(async (req: CustomRequest, res: Response) => {
    let { no } = req?.params;
    const output = await User.findOne({ where: { no } });
    if (!output) throw 'UserNotFound';
    res.json(output);
  }),
);

/**
 * @api {patch} /user/:no 유저 수정
 * @apiName PatchUserByNo
 * @apiParam (Param) /:no - 고유번호
 * @apiParam (Body) {String} name 유저 이름
 * @apiParam (Body) {String} phone 유저 휴대폰 번호
 * @apiParam (Body) {String} email 유저 이메일
 */
router.patch(
  '/:no',
  async(async (req: CustomRequest, res: Response) => {
    const { no } = req?.params;
    const { name, phone, email }: IUser = req?.body;
    const findUser = await User.findOne({ where: { no } });
    if (!findUser) throw 'UserNotFound';
    await User.update({ name, phone, email }, { where: { no } });
    res.json(await User.findOne({ where: { no } }));
  }),
);

/**
 * @api {delete} /user/:no 유저 삭제 (하나)
 * @apiName DeleteUser
 * @apiParam (Param) /:no - 고유번호
 */
router.delete(
  '/:no',
  async(async (req: CustomRequest, res: Response) => {
    let { no } = req?.params;
    const beforeDelete = await User.findOne({ where: { no } });
    if (!beforeDelete) throw 'UserNotFound';
    await User.destroy({ where: { no } });
    res.json({ msg: `Deleted User No: ${no}` });
  }),
);
