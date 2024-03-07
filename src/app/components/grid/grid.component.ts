import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CellComponent } from '../cell/cell.component';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CellComponent],
  template: `
    @if (gameService.solved()) {
      <div class="success-banner">
        You solved the puzzle!
      </div>
    }

    <button (click)="gameService.endGame()">Home</button>

    @if (gameService.solved()) {
      <button (click)="gameService.initBoard(gameService.boardSize())">
        New game
      </button>
    }

    <div class="scoreboard">
      <span>Moves: {{ gameService.moves() }}</span>
      <span>Time: {{ gameService.elapsedTime() }}</span>
    </div>

    <div class="grid" [style.gridTemplateColumns]="'repeat('+ gameService.boardSize() + ', 1fr)'">
      @for (cell of gameService.gameBoard(); track cell.index) {
        <app-cell [data]="cell" (toggled)="updateCell(cell.index)"/>
      }
    </div>
  `,
  styles: [`
    .success-banner {
      padding: 0.5rem;
      text-align: center;
      border: 2px solid green;
      border-radius: 0.25rem;
      color: green;
      background-color: #D6FFD6;
      margin-bottom: 0.5rem;
    }

    .scoreboard {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    button {
      background: transparent;
      border: 2px solid #C2C2C2;
      cursor: pointer;
      border-radius: 0.25rem;
      padding: 0.5rem;
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
    }

    button:hover {
      background-color: #ececec;
    }

    .grid {
      display: grid;
      gap: 0.25rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent {
  gameService = inject(GameService);

  updateCell(index: number): void {
    if (this.gameService.solved()) {
      return;
    }
    this.gameService.updateCell(index);
  }
}
