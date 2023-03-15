import { AttendanceResponse } from './../TypeDefinitions/Attendance.definition';


export class AttendanceDTO{
    success:boolean
    attendance: AttendanceResponse
}


export class AttendanceListDTO{
    success:boolean
    attendance: AttendanceResponse[]
}