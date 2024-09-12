import express, {Request, Response} from 'express';
import {MessageResponse} from '../types/Messages';
import passkeyRoute from './routes/passkeyRoute';

const router = express.Router();

router.get<{}, MessageResponse>('/', (_req: Request, res: Response) => {
  res.json({
    message: 'api v1',
  });
});

router.use('/auth', passkeyRoute);

export default router;
