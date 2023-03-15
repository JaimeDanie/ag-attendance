

export class Student{
    id:number;
    document: string;
    firstName: string;
    secondName: string;
    lastName: string;
    lastNameTwo: string;
    photoUrl: string;
    status: string;
    birthdate: string;
}

export class StudentDTO{
    success:boolean
    students: Student[]
}

export class StudentDTOSave{
    success:boolean
    student: Student
}