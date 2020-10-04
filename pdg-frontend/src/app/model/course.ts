import { Teacher } from './teacher';
import { Subject } from './subject';
import { Grade } from './grade';
import { Schedule } from './schedule';
import { Assignment } from './assignment';
import { StudentCourse } from './student-course';
import { CourseKey } from './course-key';
import { SchoolYear } from './school-year';

export class Course {
    id: CourseKey;
    teacher: Teacher;
    subject: Subject;
    grade: Grade;
    schoolYear: SchoolYear;
    schedules: Schedule[]=[];
    assignments: Assignment[]=[];
    studentCourses: StudentCourse[]=[];
}
