import { StudentCourse } from './student-course';
import { ReportAssignment } from './report-assignment';
import { Strength } from './strength';
import { Student } from './student';
import { Subject } from './subject';

export class Report {
    id: number;
    generateIdea: number;
    positiveContribution: number;
    originalBehavior: number;
    askInClass: number;
    perseverance: number;
    selfCriticims: number;
    acceptNewIdeas: number;
    classParticipation: number;
    expressIdeas: number;
    studentCourse: StudentCourse;
    assignments: ReportAssignment[]=[];
    strengths: Strength[]=[];
    student: Student;
    reportDate: Date;
}
