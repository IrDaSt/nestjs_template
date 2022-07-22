import { Test, TestingModule } from '@nestjs/testing';
import { DeleteExpiredTokenService } from './delete-expired-token.service';

describe('DeleteExpiredTokenService', () => {
  let service: DeleteExpiredTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteExpiredTokenService],
    }).compile();

    service = module.get<DeleteExpiredTokenService>(DeleteExpiredTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
