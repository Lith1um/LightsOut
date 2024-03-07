import { ChangeDetectionStrategy, Component, EventEmitter, Output, input } from '@angular/core';
import { GridCell } from '../../interfaces/grid-cell.interface';

@Component({
  selector: 'app-cell',
  standalone: true,
  template: `
    <div class="cell" [class.illuminated]="data().illuminated" (click)="toggled.emit()">
    </div>
  `,
  styles: [`
    .cell {
      aspect-ratio: 1/ 1;
      cursor: pointer;
      background-color: #C2C2C2;
      border-radius: 10%;
      transition: background-color 200ms;
    }
    .illuminated {
      background-color: #F57A80;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellComponent {
  data = input.required<GridCell>();

  @Output() toggled = new EventEmitter<void>();
}
