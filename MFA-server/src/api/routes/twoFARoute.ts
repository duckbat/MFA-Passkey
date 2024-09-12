import express from 'express';
import {setupTwoFA, verifyTwoFA} from '../controllers/twoFAController';

const router = express.Router();

router.route('/verify').post(verifyTwoFA);
router.route('/setup').post(setupTwoFA);

export default router;
