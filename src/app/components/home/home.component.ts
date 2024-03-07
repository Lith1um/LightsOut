import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
  <p>LightsOut is a puzzle where you are given a grid of cells, or lights, with some dark and others light. You must turn them all off by clicking on the cells. Each click toggles that cell and each of its immediate neighbors.</p>
  <div class="button-list">
    <button (click)="startGame.emit(5)">
      Start 5x5 Game
    </button>
    <button (click)="startGame.emit(9)">
      Start 9x9 Game
    </button>
  </div>
  `,
  styles: [`
    .button-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    button {
      width: 100%;
      text-align: center;
      background: transparent;
      border: 2px solid #C2C2C2;
      cursor: pointer;
      border-radius: 0.25rem;
      padding: 0.5rem;
    }

    button:hover {
      background-color: #ececec;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  @Output() startGame = new EventEmitter<number>();
}
