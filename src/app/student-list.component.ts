import { Component, input, output } from '@angular/core';
import { GradeLabelPipe } from './grade-label.pipe';
import { HighlightDirective } from './highlight.directive';
import { Student } from './models/student';

@Component({
  selector: 'app-student-list',
  imports: [HighlightDirective, GradeLabelPipe],
  template: `<ul class="grid">
    @for (student of students(); track student.id) {
      <li class="card" appHighlight="#e8f3ff">
        <button type="button" (click)="selected.emit(student)">{{ student.name }}</button>
        <p>{{ student.email }}</p>
        @switch (student.grade | gradeLabel) {
          @case ('Excellent') { <strong>Excellent</strong> }
          @case ('Bien') { <strong>Bien</strong> }
          @case ('Passable') { <span>Passable</span> }
          @default { <span>Échec</span> }
        }
      </li>
    } @empty {
      <li>Aucun étudiant trouvé.</li>
    }
  </ul>`,
})
export class StudentListComponent {
  readonly students = input.required<Student[]>();
  readonly selected = output<Student>();
}
