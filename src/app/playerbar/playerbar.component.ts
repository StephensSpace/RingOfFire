import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-playerbar',
  imports: [],
  templateUrl: './playerbar.component.html',
  styleUrl: './playerbar.component.scss'
})
export class PlayerbarComponent {
  
  @Input() name: string = 'Player';
  @Input() playerActive: boolean = false;

}
