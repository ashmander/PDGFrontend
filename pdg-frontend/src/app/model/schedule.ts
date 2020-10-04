import { Course } from './course';

export class Schedule {
    id: number;
    day: string;
    pos: number;
    startTime: string;
    endTime: string;
    courses: Course[]=[];
}
