import { Test, TestingModule } from '@nestjs/testing';
import { BaseGateway } from './base.gateway';

describe('BaseGateway', () => {
  let gateway: BaseGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaseGateway],
    }).compile();

    gateway = module.get<BaseGateway>(BaseGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
