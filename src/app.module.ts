import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileModule } from './file/file.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [FileModule],
})
export class AppModule {}
