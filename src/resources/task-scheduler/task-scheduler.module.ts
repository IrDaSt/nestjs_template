import { Module } from '@nestjs/common'
import { TestTaskModule } from './test-task/test-task.module'
import { DeleteExpiredTokenModule } from './delete-expired-token/delete-expired-token.module'

@Module({
  providers: [],
  imports: [TestTaskModule, DeleteExpiredTokenModule],
})
export class TaskSchedulerModule {}
