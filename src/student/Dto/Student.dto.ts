import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class StudentDto {
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
