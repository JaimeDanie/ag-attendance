import { StudentService } from '../Services/student.service';
import { StudentResponse, StudentCreate } from './../TypeDefinitions/Student.definition';
import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { Student } from 'src/dto/student.dto';



@Resolver()
export class StudentResolver {

  constructor(private studenServive: StudentService){ }

  /** QUERYS */

  // ALL STUDENTS
  @Query(() => [StudentResponse])
  async getStudents(): Promise<StudentResponse[]> {
    const students:Student[]= await this.studenServive.getAllStudent();
    return  this.mapListStudent(students);
  }

  // GET ONE
  @Query(() => StudentResponse)
  async getStudentById(@Args('id')id:number): Promise<StudentResponse> {
    const student:Student= await this.studenServive.getStudentById(id);
    return  this.mapperStudentToStudentResponse(student);
  }

  // GET BY DATE
  @Query(() => [StudentResponse])
  async getStudentsByDate( @Args('date') date:string): Promise<StudentResponse[]> {
    const students:Student[]= await this.studenServive.getStudentByDate(date);
    return  this.mapListStudent(students);
  }

  /** MUTACIONES*/

  // CREATE STUDENT
  @Mutation(() => StudentResponse)
  async createStudent(
    @Args('student') student: StudentCreate,
  ): Promise<StudentResponse> {
    const studentResponse:Student= await this.studenServive.saveStudent(this.mapperStudentResponseToStudent(student));
    return this.mapperStudentToStudentResponse(studentResponse);
  }

  // UPDATE STUDENT
  @Mutation(() => StudentResponse)
  async updateStudent(
    @Args('student') student: StudentCreate,@Args('id')id:number,
  ): Promise<StudentResponse> {
    const studentResponse:Student= await this.studenServive.updateStudent(id,this.mapperStudentResponseToStudent(student));
    return this.mapperStudentToStudentResponse(studentResponse);
  }

  // DELETE STUDENT
  @Mutation(() => String)
  async deleteStudent(
    @Args('id') id: number,
  ): Promise<string> {
    const message:string= await this.studenServive.deleteStudent(id);
    return message;
  }


  //MAPPERS
  mapListStudent(students:Student[]):StudentResponse[]{
    let studentsResponse:StudentResponse[]=[];
    students.forEach((student)=>{    
      studentsResponse.push( this.mapperStudentToStudentResponse(student));
    })      
    return studentsResponse;
  }

  mapperStudentToStudentResponse(student:Student):StudentResponse{
    const studentResponse= new StudentResponse();
    studentResponse.id=student.id;
    studentResponse.documento=student.document;
    studentResponse.firstName=student.firstName;
    studentResponse.secondName=student.secondName;
    studentResponse.lastName=student.lastName;
    studentResponse.lastNameTwo=student.lastNameTwo;
    studentResponse.photoUrl=student.photoUrl;
    studentResponse.birthdate=student.birthdate;
    studentResponse.status=student?.status || "NO_ATTENDED";
    return studentResponse;
  }

  mapperStudentResponseToStudent(studentCreate:StudentCreate):Student{ 
      const student= new Student();
      student.document=studentCreate.documento;
      student.firstName=studentCreate.firstName;
      student.secondName=studentCreate.secondName;
      student.lastName=studentCreate.lastName;
      student.lastNameTwo=studentCreate.lastNameTwo;
      student.photoUrl=studentCreate.photoUrl;
      student.birthdate=studentCreate.birthdate;   
      return student;
  }


}
