import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../FirebaseService/firebase.service';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  imports: [],
  templateUrl: './start-screen.component.html',
  providers: [FirebaseService],
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {
  private firebaseService = inject(FirebaseService);
  constructor(private router: Router) {

  }

  newGame() {
    let game = new Game()
    let object: {} | undefined = game.toJson()
    this.firebaseService.addGame(object)
    .then((gameinfo: any) => {
      console.log('Gameinfo:', gameinfo); // Debugging
      if (gameinfo && gameinfo.id) {
        this.router.navigateByUrl('/game/' + gameinfo.id);
      } else {
        console.error('Game ID is missing!', gameinfo);
      }
    })
    .catch(error => console.error('Firebase error:', error));
    
    
    //this.firebaseService.addGame(object)
    //.then((gameinfo:any) => {
    //  this.router.navigateByUrl('/game/' + gameinfo.id);
    //});
    

  }

}

