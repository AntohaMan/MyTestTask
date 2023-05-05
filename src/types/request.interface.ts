import { User } from '../user/user.model';

export interface RequestBody extends ReadableStream<Uint8Array> {
  [key: string]: any;
}
export interface RequestWithUser extends Request {
  userId: number;
  Body: RequestBody;
}
