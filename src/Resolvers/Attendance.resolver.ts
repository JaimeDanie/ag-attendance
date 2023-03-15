import { AttendanceResponse, AttendanceCreate } from './../TypeDefinitions/Attendance.definition';
import { AttendanceService } from './../Services/attendance.service';
import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';




@Resolver()
export class AttendanceResolver {

  constructor(private attendanceServive: AttendanceService){ }

  /** QUERYS */

  // ALL ATTENDANCE
  @Query(() => [AttendanceResponse])
  async getAllAttendance(): Promise<AttendanceResponse[]> {
    const attendances:AttendanceResponse[]= await this.attendanceServive.getAllAttendance();
    return  attendances;
  }

  // ATTENDANCE BY DATE
  @Query(() => [AttendanceResponse])
  async getAttendanceByDate(@Args('date') date: string): Promise<AttendanceResponse[]> {
    const attendances:AttendanceResponse[]= await this.attendanceServive.getAttendanceByDate(date);
    return  attendances;
  }

  //ATTENDANCE BY DATE AND STUDENT
  @Query(() => AttendanceResponse)
  async getAttendanceByDateAndStudent(@Args('date') date: string,@Args('idStudent') idStudent: number): Promise<AttendanceResponse> {
    const attendance:AttendanceResponse= await this.attendanceServive.getAttendanceByDateAndStudent(idStudent,date);
    return  attendance;
  }


  /** MUTATIONS */

  // CHECK ATTENDANCE
  @Mutation(() => AttendanceResponse)
  async checkAttendance(
    @Args('attendance') attendance: AttendanceCreate,
    @Args('id') id:number
  ): Promise<AttendanceResponse> {
    const attendanceResponse:AttendanceResponse= await this.attendanceServive.saveAttendance(id,attendance);
    return attendanceResponse;
  }

}