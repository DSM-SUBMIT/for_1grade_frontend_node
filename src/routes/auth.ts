import express from 'express';
import { Container } from 'typedi';
import { AuthController } from 'src/auth/controller';
import { asyncWrapper } from 'src/shared/exceptionHandler';
import { LoginDto } from 'src/auth/dto/request/login.dto';
import { SignUpDto } from 'src/auth/dto/request/signUp.dto';
import { validator } from 'src/utils/middlewares/validator.middleware';

export const authRouter = () => {
  const router = express.Router();
  const authController = Container.get(AuthController);

  router.post(
    '/login',
    validator(LoginDto),
    asyncWrapper(authController.login),
  );
  router.post(
    '/signup',
    validator(SignUpDto),
    asyncWrapper(authController.signUp),
  );

  return router;
};
