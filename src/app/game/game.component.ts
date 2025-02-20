import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerbarComponent } from '../playerbar/playerbar.component';

@Component({
  selector: 'app-game',
  imports: [CommonModule, PlayerbarComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})


export class GameComponent {
  pickCardAnimation: boolean = false;
  currentCard: string | undefined
  game?: Game 

  constructor() {
    this.newGame();
    console.log(this.game)
    this.currentCard = '';
  }


  newGame() {
    this.game = new Game();
  }

  PickCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game?.stack.pop();
      if (this.currentCard !== undefined) {
        this.game?.playedCard.push(this.currentCard);
      }
      this.pickCardAnimation = true;
      setTimeout(() => {
        this.pickCardAnimation = false;
      }, 1500);
    }
  
  }
}
