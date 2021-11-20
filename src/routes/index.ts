import express from 'express';
import { authRouter } from 'src/routes/auth';

export const router = () => {
  const router = express.Router();

  router.use('/auth', authRouter());

  return router;
};
