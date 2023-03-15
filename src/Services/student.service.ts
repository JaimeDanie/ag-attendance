import { ENDPOINT } from './../constants/ms/microservices';
import { StudentCreate, StudentResponse } from './../TypeDefinitions/Student.definition';
import { StudentDTO, Student, StudentDTOSave } from './../dto/student.dto';
import { Injectable } from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { GraphQLError } from 'graphql';

@Injectable()
export class StudentService {
    constructor(private readonly httpService: HttpService){}

    async getAllStudent():Promise<Student[]>{
       let response= await lastValueFrom(this.httpService.get(ENDPOINT.ms_student));
       const respStudent:StudentDTO=response.data
       if(respStudent.success){
        return respStudent.students;
       }
      return [];
    }

    async saveStudent(student:Student):Promise<Student>{
        try {
            let response= await lastValueFrom(this.httpService.post(ENDPOINT.ms_student,student));
            const respStudent:StudentDTOSave=response.data;       
            if(respStudent.success){
                return respStudent.student
            }
            const message:string=response.data.student
            throw new GraphQLError(message,{})
        } catch (error) {
            throw new GraphQLError(error,{})
        }     
    }

    async updateStudent(id:number,student:Student):Promise<Student>{
        try {
            let response= await lastValueFrom(this.httpService.put(`${ENDPOINT.ms_student}/${id}`,student));
            const respStudent:StudentDTOSave=response.data;      
            if(respStudent.success){
                return respStudent.student
            }
            const message:string=response.data.student
            throw new GraphQLError(message,{})
        } catch (error) {
            throw new GraphQLError(error,{})
        }     
    }

    async getStudentById(id:number):Promise<Student>{
        let response= await lastValueFrom(this.httpService.get(`${ENDPOINT.ms_student}/${id}`));
        const respStudent:StudentDTOSave=response.data
        if(respStudent.success){
         return respStudent.student;
        }
        const message:string=response.data?.student || "student no exist"
        throw new GraphQLError(message,{extensions:{code:404}})
     }

     async getStudentByDate(date:string):Promise<Student[]>{
        let response= await lastValueFrom(this.httpService.get(`${ENDPOINT.ms_student}/byDate/${date}`));
        const respStudent:any=response.data
        if(respStudent.success){
         return respStudent.student;
        }
        const message:string=response.data?.student || "students not found"
        throw new GraphQLError(message,{extensions:{code:404}})
     }

     async deleteStudent(id:number):Promise<string>{
        let response= await lastValueFrom(this.httpService.delete(`${ENDPOINT.ms_student}/${id}`));
        const respStudent:any=response.data
        if(respStudent.success){
         return respStudent.student;
        }
        const message:string=respStudent?.student || "student no exist"
        throw new GraphQLError(message,{extensions:{code:404}})
     }
}
