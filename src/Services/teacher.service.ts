import { TeacherDTO, TeacherListDTO } from './../dto/Teacher.dto';
import { TeacherResponse, TeacherCreate } from './../TypeDefinitions/Teacher.definition';

import { ENDPOINT } from './../constants/ms/microservices';
import { Injectable } from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { GraphQLError } from 'graphql';

@Injectable()
export class TeacherService {
    constructor(private readonly httpService: HttpService){}

    async getAllTeacher():Promise<TeacherResponse[]>{
        let response= await lastValueFrom(this.httpService.get(ENDPOINT.ms_teacher));
        const respTeacher:TeacherListDTO=response.data
        if(respTeacher.success){
         return respTeacher.teachers;
        }
       return [];
     }

     async getTeacherById(id:number):Promise<TeacherResponse>{
        let response= await lastValueFrom(this.httpService.get(`${ENDPOINT.ms_teacher}/${id}`));
        const respTeacher:TeacherDTO=response.data
        if(respTeacher.success){
         return respTeacher.teacher;
        }
        const message:string=response.data?.teacher || "teacher no exist"
        throw new GraphQLError(message,{extensions:{code:404}})
     }
 
     async saveTeacher(teacher:TeacherCreate):Promise<TeacherResponse>{
         try {
            
             let response= await lastValueFrom(this.httpService.post(ENDPOINT.ms_teacher,teacher));
             const respTeacher:TeacherDTO=response.data;       
             if(respTeacher.success){
                 return respTeacher.teacher
             }
             const message:string=response.data.teacher
             throw new GraphQLError(message,{extensions:{code:404}})
         } catch (error) {
             throw new GraphQLError(error,{extensions:{code:404}})
         }     
     }

     async updateTeacher(id:number,teacher:TeacherCreate):Promise<TeacherResponse>{
        try {
            let response= await lastValueFrom(this.httpService.put(`${ENDPOINT.ms_teacher}/${id}`,teacher));
            const respTeacher:TeacherDTO=response.data;       
            if(respTeacher.success){
                return respTeacher.teacher
            }
            const message:string=response.data.teacher
            throw new GraphQLError(message,{extensions:{code:404}})
        } catch (error) {
            throw new GraphQLError(error,{extensions:{code:404}})
        }     
    }

    async deleteTeacher(id:number):Promise<string>{
        let response= await lastValueFrom(this.httpService.delete(`${ENDPOINT.ms_teacher}/${id}`));
        const respTeacher:any=response.data
        if(respTeacher.success){
         return respTeacher.teacher;
        }
        const message:string=respTeacher?.teacher || "teacher no exist"
        throw new GraphQLError(message,{extensions:{code:404}})
     }

}