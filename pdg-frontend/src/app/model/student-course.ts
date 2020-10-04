import { StudentCourseKey } from './student-course-key';
import { Report } from './report';
import { Control } from './control';
import { Student } from './student';
import { Subject } from './subject';

export class StudentCourse {
    id: StudentCourseKey;
    reports: Report[]=[];
    controls: Control[]=[];
    student: Student;
    subject: Subject;
}
