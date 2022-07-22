import { InternalServerErrorFilter } from './internal-server-error.filter';

describe('InternalServerErrorFilter', () => {
  it('should be defined', () => {
    expect(new InternalServerErrorFilter()).toBeDefined();
  });
});
