import { TeacherResponse } from './../TypeDefinitions/Teacher.definition';


export class TeacherDTO{
    success:boolean
    teacher: TeacherResponse
}


export class TeacherListDTO{
    success:boolean
    teachers: TeacherResponse[]
}