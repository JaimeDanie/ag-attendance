import { TeacherDTO } from './../dto/Teacher.dto';
import { AttendanceDTO, AttendanceListDTO } from './../dto/Attendance.dto';
import { AttendanceCreate, AttendanceResponse } from './../TypeDefinitions/Attendance.definition';
import { ENDPOINT } from './../constants/ms/microservices';
import { Injectable } from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { GraphQLError } from 'graphql';

@Injectable()
export class AttendanceService {
    constructor(private readonly httpService: HttpService){}

    async getAllAttendance():Promise<AttendanceResponse[]>{
       let response= await lastValueFrom(this.httpService.get(ENDPOINT.ms_attendance));
       const respAttendance:AttendanceListDTO=response.data
       if(respAttendance.success){
        return respAttendance.attendance;
       }
      return [];
    }

    async getAttendanceByDate(date:string):Promise<AttendanceResponse[]>{
        let response= await lastValueFrom(this.httpService.get(`${ENDPOINT.ms_attendance}/${date}`));
        const respAttendance:AttendanceListDTO=response.data
        if(respAttendance.success){
         return respAttendance.attendance;
        }
       return [];
     }

     async getAttendanceByDateAndStudent(idStudent:number,date:string):Promise<AttendanceResponse>{
        let response= await lastValueFrom(this.httpService.get(`${ENDPOINT.ms_attendance}/${date}/${idStudent}`));
        const respAttendance:AttendanceDTO=response.data
        if(respAttendance.success){
         return respAttendance.attendance;
        }
        throw new GraphQLError("Attendance not found",{extensions:{code:404}})
     }

    async saveAttendance(idStudent:number,attendance:AttendanceCreate):Promise<AttendanceResponse>{
        try {
    
            let isValidTeacher= await lastValueFrom(this.httpService.get(`${ENDPOINT.ms_teacher}/${attendance.idTeacher}`));
            const respTeacher:TeacherDTO=isValidTeacher.data
            if(!respTeacher.success){
                throw new GraphQLError("Teacher no exist",{extensions:{code:401}})
            }
            let response= await lastValueFrom(this.httpService.post(`${ENDPOINT.ms_attendance}/${idStudent}`,attendance));
            const respStudent:AttendanceDTO=response.data;       
            if(respStudent.success){
                return respStudent.attendance
            }
            const message:string=response.data.student
            throw new GraphQLError(message,{})
        } catch (error) {
            throw new GraphQLError(error,{})
        }     
    }

}
