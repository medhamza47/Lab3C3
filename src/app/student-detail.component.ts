import { DatePipe, DecimalPipe, UpperCasePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { GradeLabelPipe } from './grade-label.pipe';
import { Student } from './models/student';

@Component({
  selector: 'app-student-detail',
  imports: [DatePipe, DecimalPipe, UpperCasePipe, GradeLabelPipe],
  template: `<section class="card">
    <h2>{{ student().name | uppercase }}</h2>
    <p>{{ student().email }}</p>
    <p>Inscription : {{ student().enrolledAt | date:'dd/MM/yyyy' }}</p>
    <p>Note : {{ student().grade | number:'1.0-2' }}/20 · {{ student().grade | gradeLabel }}</p>
    <button type="button" (click)="removed.emit(student().id)">Supprimer</button>
  </section>`,
})
export class StudentDetailComponent {
  readonly student = input.required<Student>();
  readonly removed = output<number>();
}
