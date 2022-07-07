import { JWTPayload } from '../types/jwt-payload.type';
import { Request } from 'express';

export interface AuthedRequest<UserType = JWTPayload> extends Request {
  user: UserType;
}
