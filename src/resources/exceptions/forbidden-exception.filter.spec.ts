import { ForbiddenExceptionFilter } from './forbidden-exception.filter';

describe('ForbiddenExceptionFilter', () => {
  it('should be defined', () => {
    expect(new ForbiddenExceptionFilter()).toBeDefined();
  });
});
