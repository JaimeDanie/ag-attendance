import { TeacherResponse, TeacherCreate } from './../TypeDefinitions/Teacher.definition';
import { TeacherService } from './../Services/teacher.service';

import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';




@Resolver()
export class TeacherResolver {

  constructor(private teacherServive: TeacherService){ }

  /** QUERYS */

   // ALL TEACHER
   @Query(() => [TeacherResponse])
   async getTeachers(): Promise<TeacherResponse[]> {
     const teachers:TeacherResponse[]= await this.teacherServive.getAllTeacher();
     return  teachers;
   }

   // GET ONE
  @Query(() => TeacherResponse)
  async getTeacherById(@Args('id')id:number): Promise<TeacherResponse> {
    const teacher:TeacherResponse= await this.teacherServive.getTeacherById(id);
    return  teacher;
  }


  /** MUTATIONS */

  @Mutation(() => TeacherResponse)
  async createTeacher(
    @Args('teacher') teacher: TeacherCreate,
  ): Promise<TeacherCreate> {
    const teacherResponse:TeacherResponse= await this.teacherServive.saveTeacher(teacher);
    if(teacherResponse)
    return teacherResponse;
  }

  // UPDATE TEACHER
  @Mutation(() => TeacherResponse)
  async updateTeacher(
    @Args('teacher') teacher: TeacherCreate,
    @Args('id') id: number
  ): Promise<TeacherCreate> {
    const teacherResponse:TeacherResponse= await this.teacherServive.updateTeacher(id,teacher);
    if(teacherResponse)
    return teacherResponse;
  }

   // DELETE TEACHER
   @Mutation(() => String)
   async deleteTeacher(
     @Args('id') id: number,
   ): Promise<string> {
     const message:string= await this.teacherServive.deleteTeacher(id);
     return message;
   }

}