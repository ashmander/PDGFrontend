import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modalCreateAssignment: boolean = false;
  modalTeacherReportAssignments: boolean = false;
  modalTeacherReportStrengths: boolean = false;
  modalStudentStrength = false;
  modalCreateSubject: boolean = false;
  modalCreateGrade: boolean = false;
  modalCreateCourse: boolean = false;
  modalParentAssignment: boolean = false;
  modalParentEdit: boolean = false;
  modalCourseSchedule: boolean = false;

  constructor() { }

  openModalCreateAssignment(): void {
    this.modalCreateAssignment = true;
  }

  closeModalCreateAssignment(): void {
    this.modalCreateAssignment = false;
  }

  openModalTeacherReportAssignments(): void {
    this.modalTeacherReportAssignments = true;
  }

  closeModalTeacherReportAssignments(): void {
    this.modalTeacherReportAssignments = false;
  }

  openModalTeacherReportStrengths(): void {
    this.modalTeacherReportStrengths = true;
  }

  closeModalTeacherReportStrengths(): void {
    this.modalTeacherReportStrengths = false;
  }

  openModalStudentStrength(): void {
    this.modalStudentStrength = true;
  }

  closeModalStudentStrength(): void {
    this.modalStudentStrength = false;
  }

  openModalCreateSubject(): void {
    this.modalCreateSubject = true;
  }

  closeModalCreateSubject(): void {
    this.modalCreateSubject = false;
  }

  openModalCreateGrade(): void {
    this.modalCreateGrade = true;
  }

  closeModalCreateGrade(): void {
    this.modalCreateGrade = false;
  }

  openModalCreateCourse(): void {
    this.modalCreateCourse = true;
  }

  closeModalCreateCourse(): void {
    this.modalCreateCourse = false;
  }

  openModalParentAssignments(): void {
    this.modalParentAssignment = true;
  }

  closeModalParentAssignments(): void {
    this.modalParentAssignment = false;
  }

  openModalParentEdit(): void {
    this.modalParentEdit = true;
  }

  closeModalParentEdit(): void {
    this.modalParentEdit = false;
  }

  openModalCourseSchedule(): void {
    this.modalCourseSchedule = true;
  }

  closeModalCourseSchedule(): void {
    this.modalCourseSchedule = false;
  }
}
