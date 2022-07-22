import { AuthJwtGuard } from './auth-jwt.guard';

describe('AuthJwtGuard', () => {
  it('should be defined', () => {
    expect(new AuthJwtGuard()).toBeDefined();
  });
});
