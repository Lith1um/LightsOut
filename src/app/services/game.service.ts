import { Injectable, Signal, computed, effect, signal } from '@angular/core';
import { GridCell } from '../interfaces/grid-cell.interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  readonly boardSize: Signal<number>;
  readonly gameStarted: Signal<boolean>;
  readonly gameBoard: Signal<GridCell[]>;
  readonly moves: Signal<number>;
  readonly timer: Signal<number>;

  readonly solved = computed(() => this.moves() > 0 && this.gameBoard().every(cell => !cell.illuminated));
  readonly elapsedTime = computed(() => new Date(this.timer() * 1000).toISOString().slice(14, 19));

  private boardSizeSignal = signal<number>(0);
  private gameStartedSignal = signal<boolean>(false);
  private gameBoardSignal = signal<GridCell[]>([]);
  private movesSignal = signal<number>(0);
  private timerSignal = signal<number>(0);


  private timerInterval: ReturnType<typeof setInterval>;

  private readonly timerReset = effect(() => {
    if (this.solved() && this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  });

  constructor() {
    this.boardSize = this.boardSizeSignal.asReadonly();
    this.gameStarted = this.gameStartedSignal.asReadonly();
    this.gameBoard = this.gameBoardSignal.asReadonly();
    this.moves = this.movesSignal.asReadonly();
    this.timer = this.timerSignal.asReadonly();
  }

  initBoard(size: number): void {
    this.boardSizeSignal.set(size);

    this.gameBoardSignal.set(
      new Array(size * size).fill(undefined)
        .map((cell, index) => ({ index, illuminated: false }))
    );

    for (let i = 0; i < size * size * 2; i++) {
      const randomIndex = Math.floor(Math.random() * size * size);
      this.updateCell(randomIndex, false);
    }

    this.gameStartedSignal.set(true);
    this.movesSignal.set(0);
    this.timerSignal.set(0);

    this.timerInterval = setInterval(() => {
      this.timerSignal.update(time => time + 1);
    }, 1000);
  }

  endGame(): void {
    this.gameStartedSignal.set(false);
    clearInterval(this.timerInterval);
  }

  updateCell(index: number, incrementMove = true): void {
    // Clicking a cell should toggle the cells up/down/left/right of the selected cell
    const cellsToToggle = [
      index,
      index - this.boardSize(),
      index + this.boardSize()
    ];

    if (index % this.boardSize() !== 0) {
      cellsToToggle.push(index - 1);
    }
    if ((index + 1) % this.boardSize() !== 0) {
      cellsToToggle.push(index + 1);
    }

    const visibleCellsToToggle = cellsToToggle
      .filter(cell => cell >= 0 && cell <= this.boardSize() * this.boardSize());

    this.gameBoardSignal.update(board => board.map(cell => {
      if (visibleCellsToToggle.includes(cell.index)) {
        return {
          index: cell.index,
          illuminated: !cell.illuminated
        }
      }
      return cell;
    }));

    if (incrementMove) {
      this.movesSignal.update(move => move + 1);
    }
  }

}
