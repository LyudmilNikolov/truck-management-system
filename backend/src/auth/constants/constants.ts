import * as dotenv from 'dotenv';
dotenv.config();

export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'fallbackSecretKey',
  expire: { expiresIn: process.env.JWT_EXPIRE },
};
