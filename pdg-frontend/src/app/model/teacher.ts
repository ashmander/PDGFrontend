import { Course } from './course';

export class Teacher {
    id: number;
    name: string;
    identificationDocument: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    courses: Course[]=[];
}
