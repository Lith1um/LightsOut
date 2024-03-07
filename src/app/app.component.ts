import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GridComponent } from './components/grid/grid.component';
import { GameService } from './services/game.service';
import { HomeComponent } from './components/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GridComponent, HomeComponent],
  template: `
    <div class="layout">
      <div class="container">
        <h2>LightsOut!</h2>

        @if (gameService.gameStarted()) {
          <app-grid></app-grid>
        } @else {
          <app-home (startGame)="gameService.initBoard($event)"></app-home>
        }
      </div>
    </div>
  `,
  styles: [`
    .layout {
      margin: 0 auto;
      max-width: 100%;
      width: 600px;
    }

    .container {
      border: 2px solid #C2C2C2;
      border-radius: 0.25rem;
      padding: 1rem;
      margin: 0.5rem;
    }

    h2 {
      text-align: center;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  gameService = inject(GameService);
}
