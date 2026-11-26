import { Component, computed, signal } from '@angular/core';
import { gradeLabel } from './grade-label.pipe';
import { Student } from './models/student';
import { StudentDetailComponent } from './student-detail.component';
import { StudentListComponent } from './student-list.component';

@Component({
  selector: 'app-root',
  imports: [StudentListComponent, StudentDetailComponent],
  template: `<header><h1>EduManager</h1></header>
    <main>
      <div class="toolbar">
        <label>Recherche <input #query (input)="search.set(query.value)"></label>
        <label>Statut <select #status (change)="statusFilter.set(status.value)">
          <option value="">Tous</option>
          @for (label of labels; track label) { <option [value]="label">{{ label }}</option> }
        </select></label>
      </div>
      @if (students().length) {
        <app-student-list [students]="filteredStudents()" (selected)="selectedId.set($event.id)"/>
      } @else { <p>Le registre est vide.</p> }
      @if (selectedStudent(); as student) {
        <app-student-detail [student]="student" (removed)="removeStudent($event)"/>
      } @else { <p>Sélectionnez un étudiant pour afficher sa fiche.</p> }
    </main>`,
})
export class AppComponent {
  readonly labels = ['Excellent', 'Bien', 'Passable', 'Échec'];
  readonly students = signal<Student[]>([
    { id: 1, name: 'Alice Dupont', email: 'alice@example.com', grade: 18, enrolledAt: new Date(2025, 8, 1) },
    { id: 2, name: 'Bob Martin', email: 'bob@example.com', grade: 15, enrolledAt: new Date(2025, 8, 2) },
    { id: 3, name: 'Chloé Moreau', email: 'chloe@example.com', grade: 12, enrolledAt: new Date(2025, 8, 3) },
    { id: 4, name: 'David Petit', email: 'david@example.com', grade: 8, enrolledAt: new Date(2025, 8, 4) },
  ]);
  readonly search = signal('');
  readonly statusFilter = signal('');
  readonly selectedId = signal<number | null>(null);
  readonly filteredStudents = computed(() => {
    const search = this.search().trim().toLowerCase();
    const status = this.statusFilter();
    return this.students().filter(student =>
      (student.name.toLowerCase().includes(search) || student.email.toLowerCase().includes(search)) &&
      (!status || gradeLabel(student.grade) === status));
  });
  readonly selectedStudent = computed(() => this.students().find(s => s.id === this.selectedId()));

  removeStudent(id: number): void {
    this.students.update(students => students.filter(student => student.id !== id));
    this.selectedId.set(null);
  }
}
