import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
  secret: 'testMarlon',
  signOptions: { expiresIn: '60m' },
};