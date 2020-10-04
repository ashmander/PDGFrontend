import { Student } from './student';

export class Parent {
    id: number;
    name: string;
    lastName: string;
    identificationDocument: string;
    phoneNumber: string;
    email: string;
    students: Student[]=[];
}
