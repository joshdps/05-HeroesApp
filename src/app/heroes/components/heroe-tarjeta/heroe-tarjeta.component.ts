import { Component, Input } from '@angular/core';
import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles: [`
    mat-card{ margin-top: 20px;}
    mat-card:hover{
      background-color: purple;
      cursor: pointer;
      margin-top: 1px;
    }
    `
  ]
})
export class HeroeTarjetaComponent {
  
  @Input() heroes: Heroe[] = []

  constructor() { }
}
