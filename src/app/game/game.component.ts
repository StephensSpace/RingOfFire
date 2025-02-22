import { CommonModule } from '@angular/common';
import { Component, signal, model, inject } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerbarComponent } from '../playerbar/playerbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { AktionskarteComponent } from '../aktionskarte/aktionskarte.component';



@Component({
  selector: 'app-game',
  imports: [CommonModule,
    PlayerbarComponent, MatIconModule,
    MatButtonModule, MatInputModule,
    MatFormFieldModule, FormsModule,
    DialogComponent, AktionskarteComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})


export class GameComponent {
  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);
  pickCardAnimation: boolean = false;
  currentCard: string | undefined
  game?: Game


  constructor() {
    this.newGame();
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
      if (this.game?.currentPlayer !== undefined) {
        if (this.game?.currentPlayer < this.game?.players.length -1) { 
          this.game.currentPlayer++; 
        } else {
          this.game.currentPlayer = 0;
        }
      }
      this.pickCardAnimation = true;
      setTimeout(() => {
        this.pickCardAnimation = false;
      }, 1500);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { animal: '' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.animal.set(result);
        this.game?.players.push(this.animal());
      }
    });
  }

}
