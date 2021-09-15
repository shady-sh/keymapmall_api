import { Router, static as Static } from 'express';
import middlewares from './middleware';

import errorHandler from './middleware/errorHandler';
import mall from './mall';
import region from './region';
import survey from './survey';
import selectedsurvey from './selected_survey';
import question from './question';
import qoption from './q_option';
import qlog from './q_log';
import qtype from './q_type';
import user from './user';
import popup from './popup';

const router = Router();
export default router;

router.use(Static('static'));
router.use(middlewares);

router.use('/mall', mall);
router.use('/region', region);
router.use('/survey', survey);
router.use('/selectedsurvey', selectedsurvey);
router.use('/user', user);
router.use('/question', question);
router.use('/qoption', qoption);
router.use('/qlog', qlog);
router.use('/qtype', qtype);
router.use('/popup', popup);

router.use(errorHandler);
