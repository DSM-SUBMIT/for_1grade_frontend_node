import { IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  @Length(8, 8)
  id!: string;

  @IsString()
  @Length(8, 12)
  password!: string;
}
