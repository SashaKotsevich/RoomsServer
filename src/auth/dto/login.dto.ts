import { ResRegisterDTO } from './register.dto';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ReqLoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class ResLoginDTO extends ResRegisterDTO {}
