import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from './schema/student.schema';
import { StudentService } from './service/student/student.service';
import { StudentController } from './controller/student/student.controller';   
import { BusinessModule } from './modules/business/business.module'; 
import { BranchModule } from './modules/branch/branch.module';
import { UsersModule } from './modules/user/users.module'; 
import { AuthModule } from './modules/auth/auth.module';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [ 
    // PassportModule.register({defaultStrategy: 'jwt'}),
    MongooseModule.forRoot('YOUR_MONGO_PATH'), 
    MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]),
    BusinessModule,
    BranchModule,
    UsersModule, 
    AuthModule
  ],
    
  controllers: [AppController, StudentController],
  providers: [AppService, StudentService]
})
export class AppModule {}
