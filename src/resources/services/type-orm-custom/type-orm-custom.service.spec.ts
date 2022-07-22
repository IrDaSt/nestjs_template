import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmCustomService } from './type-orm-custom.service';

describe('TypeOrmCustomService', () => {
  let service: TypeOrmCustomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeOrmCustomService],
    }).compile();

    service = module.get<TypeOrmCustomService>(TypeOrmCustomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
