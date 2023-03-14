import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { StudentDto } from './Dto/Student.dto';
import { StudentDtoResponse } from './Dto/StudentResponse.dto';


@Resolver()
export class StudentResolver {

  /** QUERYS */
  @Query(() => String)
  hellowWorldQuery(): string {
    return 'Hola mundo';
  }

  /** MUTACIONES*/
  @Mutation(() => StudentDtoResponse)
  async createStudent(
    @Args('student') student: StudentDto,
  ): Promise<StudentDtoResponse> {
    const response = new StudentDtoResponse();
    response.documento = student.documento
    return response;
  }


}
