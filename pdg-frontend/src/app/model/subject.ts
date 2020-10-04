import { Course } from './course';

export class Subject {
    id: number;
    name: string;
    code: string;
    courses: Course[]=[]
}
