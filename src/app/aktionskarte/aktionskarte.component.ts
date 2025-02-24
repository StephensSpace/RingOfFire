import { Component, Input , Signal} from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-aktionskarte',
  imports: [MatCardModule],
  templateUrl: './aktionskarte.component.html',
  styleUrl: './aktionskarte.component.scss'
})
export class AktionskarteComponent {
  cardAction = [
    { title: 'Waterfall', description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.' },
    { title: 'You', description: 'You decide who drinks' },
    { title: 'Me', description: 'Congrats! Drink a shot!' },
    { title: 'Category', description: 'Come up with a category (e.g. Colors). Each player must enumerate one item from the category.' },
    { title: 'Bust a jive', description: 'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one. ' },
    { title: 'Chicks', description: 'All girls drink.' },
    { title: 'Heaven', description: 'Put your hands up! The last player drinks!' },
    { title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
    { title: 'Thumbmaster', description: '' },
    { title: 'Men', description: 'All men drink.' },
    { title: 'Quizmaster', description: '' },
    { title: 'Never have i ever...', description: 'Say something you nnever did. Everyone who did it has to drink.' },
    { title: 'Rule', description: 'Make a rule. Everyone needs to drink when he breaks the rule.' },
  ];

  title: string = '';
  description: string = '';
  standartText: string = 'Please Reload the Page to start again'
  @Input() card: string | undefined = '';
  value: boolean = false

  ngOnChanges() {
    if (!this.card) {  // Falls keine Karte gesetzt wurde, Standardwerte verwenden
      this.title = 'Please Pick a Card';
      this.description = '';
      return;
    } else {
      let parts = this.card.split('_');
      let numberValue = parseInt(parts[1], 10);
      if (!isNaN(numberValue) && this.cardAction[numberValue - 1]) {
        this.title = this.cardAction[numberValue - 1].title;
        this.description = this.cardAction[numberValue - 1].description;
      }
    }
  }

}
