import { InputType, Field, ObjectType } from '@nestjs/graphql';

@InputType()
export class TeacherCreate{

    @Field(() => String)
    document:string;

    @Field(() => String)
    firstName:string;

    @Field(() => String)
    secondName:string;

    @Field(() => String)
    lastName: string;

    @Field(() => String)
    lastNameTwo: string;

    @Field(() => String)
    birthdate:string;

    @Field(() => String)
    idUser: string;
}

@ObjectType()
export class TeacherResponse{
    @Field(() => Number)
    id:number;

    @Field(() => String)
    document:string;

    @Field(() => String)
    firstName:string;

    @Field(() => String)
    secondName:string;

    @Field(() => String)
    lastName: string;

    @Field(() => String)
    lastNameTwo: string;

    @Field(() => String)
    birthdate:string;

    @Field(() => String)
    idUser: string;
}