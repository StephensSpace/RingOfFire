import { CommonModule } from '@angular/common';
import { Component, signal, model, inject, ChangeDetectorRef, Inject } from '@angular/core';
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
import { FirebaseService } from '../FirebaseService/firebase.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-game',
  imports: [CommonModule,
    PlayerbarComponent, MatIconModule,
    MatButtonModule, MatInputModule,
    MatFormFieldModule, FormsModule,
    DialogComponent, AktionskarteComponent],
  providers: [FirebaseService],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})


export class GameComponent {
  private firebaseService = inject(FirebaseService);
  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);
  pickCardAnimation: boolean = false;
  currentCard: string | undefined
  game?: Game
  currentGame: any;
  unsubscribe;


  constructor(private route: ActivatedRoute) {
    this.newGame();
    this.unsubscribe = this.route.paramMap.subscribe((params) => {
      const id: string = params.get('id') as string
      this.firebaseService.subCurrentGame(id)
      this.firebaseService.currentGame$.subscribe((game) => {
        this.currentGame = game;
        console.log('Aktuelles Spiel:', this.currentGame);
        if(this.game){ 
          this.game.players = game?.['players'] 
          this.game.stack = game?.['stack']
          this.game.playedCard = game?.['playedCard']
          this.game.currentPlayer = game?.['currentPlayer']
        }
      })
    });
    this.currentCard = '';
    //console.log(this.firebaseService.firestore);
  }


  newGame() {
    this.game = new Game();
    let object: {} | undefined = this.game?.toJson()
    this.firebaseService.addGame(object);

  }

  PickCard() {
    let stacksize = this.game?.stack.length
    if (stacksize && stacksize > 0) {
      if (!this.pickCardAnimation) {
        this.currentCard = this.game?.stack.pop();
        if (this.currentCard !== undefined) {
          this.game?.playedCard.push(this.currentCard);
        }
        if (this.game?.currentPlayer !== undefined) {
          if (this.game?.currentPlayer < this.game?.players.length - 1) {
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
    } else {
      this.newGame();
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
