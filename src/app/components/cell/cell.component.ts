import { ChangeDetectionStrategy, Component, EventEmitter, Output, input } from '@angular/core';
import { GridCell } from '../../interfaces/grid-cell.interface';

@Component({
  selector: 'app-cell',
  standalone: true,
  template: `
    @if (data(); as cell) {
      <div class="cell" [class.illuminated]="cell.illuminated" (click)="toggled.emit()">
      </div>
    }
  `,
  styles: [`
    .cell {
      aspect-ratio: 1/ 1;
      cursor: pointer;
      background-color: #C2C2C2;
      border-radius: 10%;
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
