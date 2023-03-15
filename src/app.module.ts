import { TeacherService } from './Services/teacher.service';
import { TeacherResolver } from './Resolvers/Teacher.resolver';
import { AttendanceService } from './Services/attendance.service';
import { StudentResolver } from './Resolvers/student.resolver';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo/dist/drivers';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { HttpModule } from '@nestjs/axios';
import { StudentService } from './Services/student.service';
import { AttendanceResolver } from './Resolvers/Attendance.resolver';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins:[
        ApolloServerPluginLandingPageLocalDefault({ footer: false })
      ]
    }),
    HttpModule,
  ],
  controllers: [],
  providers: [
    StudentResolver, 
    StudentService,
    AttendanceResolver, 
    AttendanceService, 
    TeacherResolver, 
    TeacherService
  ],
})
export class AppModule {}
