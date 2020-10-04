import { SchoolYear } from './school-year';
import { Course } from './course';

export class Grade {
    id: number;
    schoolYear: SchoolYear;
    name: string;
    courses: Course[]=[];
}
