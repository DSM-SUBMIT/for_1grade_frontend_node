import { Service } from 'typedi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { SignUpDto } from 'src/auth/dto/request/signUp.dto';
import { getRepository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { LoginDto } from 'src/auth/dto/request/login.dto';

@Service()
export class AuthService {
  private userRepository = getRepository(User);

  public async signUp(payload: SignUpDto): Promise<boolean> {
    const { id, password } = payload;
    if (await this.userRepository.count({ where: { uid: id } })) return false;
    const encrypted = await bcrypt.hash(password, 10);
    await this.userRepository.insert({ uid: id, password: encrypted });
    return true;
  }

  public async login(payload: LoginDto): Promise<string | null> {
    const { id, password } = payload;
    const user = await this.userRepository.findOne({ where: { uid: id } });
    if (!user) return null;
    if (await bcrypt.compare(password, user.password)) {
      return jwt.sign({ sub: id }, process.env.JWT_SECRET);
    } else {
      return null;
    }
  }
}
