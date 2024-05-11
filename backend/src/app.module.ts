import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EmployeesModule } from './employees/employees.module';
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    EmployeesModule,
    VehiclesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
