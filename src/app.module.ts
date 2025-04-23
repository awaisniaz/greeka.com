import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TaskModule,
    TypeOrmModule.forRoot({
      url: 'postgresql://postgres.qhpafvhqruzxezejvepu:Awaisniaz@1234@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres',
      type: 'postgres',
      // ssl: {
      //   rejectUnauthorized: false,
      // },

      entities: [__dirname + '/../**/entities/*.entity{.ts,.js}'],
      // Timezone configured on the Postgres server.
      // This is used to typecast server date/time values to JavaScript Date object and vice versa.
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
