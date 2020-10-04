import { Course } from './course';

export class SchoolYear {
    id: number;
    description: string;
    state: string;
    courses: Course[];
}
