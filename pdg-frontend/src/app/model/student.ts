import { Parent } from './parent';
import { StudentStrength } from './student-strength';
import { StudentCourse } from './student-course';
import { Grade } from './grade';

export class Student {
    id: number;
    identificationDocument: string;
    name: string;
    lastName: string;
    autonomyLevel: string;
    parent: Parent;
    strengths: StudentStrength[]=[];
    courses: StudentCourse[]=[];
    grade: Grade;
}
