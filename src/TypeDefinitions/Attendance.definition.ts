import { InputType, Field, ObjectType } from '@nestjs/graphql';

@InputType()
export class AttendanceCreate{

    @Field(() => String)
    dateAttendance:string

    @Field(() => Number)
    idTeacher:number
}

@ObjectType()
export class StudentAttendance{

    @Field(() => Number)
    id:number;
    @Field(() => String)
    document: string;

    @Field(() => String)
    firstName: string;

    @Field(() => String)
    secondName: string;

    @Field(() => String)
    lastName: string;

    @Field(() => String)
    lastNameTwo: string;

    @Field(() => String)
    photoUrl: string;
    
    @Field(() => String)
    birthdate: string;

}


@ObjectType()
export class AttendanceResponse{

    @Field(() => Number)
    id:number

    @Field(() => String)
    dateAttendance:string

    @Field(() => Number)
    idTeacher:number

    @Field(() => String)
    status:string

    @Field(()=>StudentAttendance)
    student:StudentAttendance

    @Field(() => String)
    created_at:string

    @Field(() => String)
    updated_at:string

}