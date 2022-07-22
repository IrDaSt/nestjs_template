import { Test, TestingModule } from '@nestjs/testing';
import { TestTaskService } from './test-task.service';

describe('TestTaskService', () => {
  let service: TestTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestTaskService],
    }).compile();

    service = module.get<TestTaskService>(TestTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
