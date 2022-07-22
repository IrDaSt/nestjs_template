import { Test, TestingModule } from '@nestjs/testing';
import { JwtCustomService } from './jwt-custom.service';

describe('JwtCustomService', () => {
  let service: JwtCustomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtCustomService],
    }).compile();

    service = module.get<JwtCustomService>(JwtCustomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
