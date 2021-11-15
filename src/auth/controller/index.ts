import { Inject, Service } from 'typedi';
import { AuthService } from '../service';
import { Request, Response } from 'express';
import { SignUpDto } from 'src/auth/dto/request/signUp.dto';
import { LoginDto } from 'src/auth/dto/request/login.dto';

@Service()
export class AuthController {
  constructor(@Inject() private readonly authService: AuthService) {}

  async signUp(req: Request, res: Response): Promise<void> {
    const payload: SignUpDto = req.body;
    if (await this.authService.signUp(payload)) {
      res.sendStatus(201);
    } else {
      res.sendStatus(409);
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    const payload: LoginDto = req.body;
    const token = await this.authService.login(payload);
    if (token) {
      res.status(200).json({
        access_token: token,
      });
    } else {
      res.sendStatus(401);
    }
  }
}
