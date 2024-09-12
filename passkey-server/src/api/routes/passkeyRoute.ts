import express from 'express';
import {
  // authenticationOptions,
  setupPasskey,
  // verifyAuthentication,
  //verifyPasskey,
} from '../controllers/passkeyController';

const router = express.Router();

router.route('/setup').post(setupPasskey); // register
// router.route('/verify').post(verifyPasskey); // verify registration
// router.route('/login-setup').post(authenticationOptions); // login setup
// router.route('/login-verify').post(verifyAuthentication); // login

export default router;
