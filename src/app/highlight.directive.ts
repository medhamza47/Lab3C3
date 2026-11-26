import { Directive, input, signal } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  host: {
    '(mouseenter)': 'active.set(true)',
    '(mouseleave)': 'active.set(false)',
    '(focusin)': 'active.set(true)',
    '(focusout)': 'active.set(false)',
    '[style.backgroundColor]': 'active() ? appHighlight() : null',
  },
})
export class HighlightDirective {
  readonly appHighlight = input('#e8f3ff');
  readonly active = signal(false);
}
