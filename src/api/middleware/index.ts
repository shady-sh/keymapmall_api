import { Router } from 'express';
import bodyParser from 'body-parser';
import bearerToken from 'express-bearer-token';
import session from './session';

const router = Router();
export default router;

router.use(bearerToken());
router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: false,
    limit: '512mb',
  }),
);
router.use(session);
