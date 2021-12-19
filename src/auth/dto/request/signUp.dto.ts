import { IsString, Length } from 'class-validator';

export class SignUpDto {
  @IsString()
  @Length(8, 8)
  id!: string;

  @IsString()
  @Length(8, 12)
  password!: string;

  @IsString()
  @Length(2, 5)
  nickname!: string;
}
