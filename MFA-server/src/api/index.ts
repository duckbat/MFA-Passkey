import express, {Request, Response} from 'express';
import {MessageResponse} from '../types/Messages';
import twoFARoute from './routes/twoFARoute';

const router = express.Router();

router.get<{}, MessageResponse>('/', (_req: Request, res: Response) => {
  res.json({
    message: 'api v1',
  });
});

router.use('/auth', twoFARoute);

export default router;
