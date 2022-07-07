import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthCredsDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
