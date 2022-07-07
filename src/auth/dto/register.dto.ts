import { UserDTO } from './../../users/dto/user.dto';
import { IntersectionType } from '@nestjs/mapped-types';
import { AuthCredsDTO } from './auth-creds.dto';

export class ReqRegisterDTO extends IntersectionType(UserDTO, AuthCredsDTO) {}

export class ResRegisterDTO {
  user: UserDTO;
  access_token: string;
}
