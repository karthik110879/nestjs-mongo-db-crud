import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from './schema/student.schema';
import { StudentService } from './service/student/student.service';
import { StudentController } from './controller/student/student.controller';   
import { BusinessModule } from './modules/business/business.module'; 
import { BranchModule } from './modules/branch/branch.module';


@Module({
  imports: [ 
    MongooseModule.forRoot('mongodb+srv://karthik94:krypton94@cluster0dev.ydga44j.mongodb.net/studentdb'), 
    MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]),
    BusinessModule,
    BranchModule
  ],
    
  controllers: [AppController, StudentController],
  providers: [AppService, StudentService],
})
export class AppModule {}
