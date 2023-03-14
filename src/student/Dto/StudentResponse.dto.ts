import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class StudentDtoResponse {

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
}
