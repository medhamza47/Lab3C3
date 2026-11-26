import { Pipe, PipeTransform } from '@angular/core';

export function gradeLabel(value: number): string {
  if (value >= 18) return 'Excellent';
  if (value >= 14) return 'Bien';
  if (value >= 10) return 'Passable';
  return 'Échec';
}

@Pipe({ name: 'gradeLabel' })
export class GradeLabelPipe implements PipeTransform {
  transform(value: number): string { return gradeLabel(value); }
}
