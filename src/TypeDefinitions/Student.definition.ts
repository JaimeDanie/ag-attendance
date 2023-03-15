import { InputType, Field, ObjectType } from '@nestjs/graphql';

@InputType()
export class StudentCreate {
  
  @Field(() => String)
  firstName: string;

  @Field(() => String)
  secondName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  lastNameTwo: string;

  @Field(() => String)
  documento: string;

  @Field(() => String)
  photoUrl: string;
  
  @Field(() => String)
  birthdate: string;
}

@ObjectType()
export class StudentResponse {

  @Field(() => Number)
  id: number;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  secondName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  lastNameTwo: string;

  @Field(() => String)
  documento: string;

  @Field(() => String)
  photoUrl: string;

  @Field(() => String)
  status: string;

  @Field(() => String)
  birthdate: string;
}
