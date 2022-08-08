import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html'
})
export class BuscarComponent implements OnInit {

  keyword: string = '';
  heroes: Heroe[] = [];
  heroesResultados: Heroe[] = []
  heroeSeleccionado: Heroe[] | undefined = [];
  ultimaSeleccionada: string = ''


  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.heroesService.getHeroes()
      .subscribe(heroes => this.heroes = heroes)
  }

  buscar() {
    this.heroesService.getHeroesPorNombre(this.keyword)
      .subscribe(heroes => this.heroes = heroes)
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {

    if (!event.option.value) {
      this.heroeSeleccionado = undefined
      return
    }
    const heroe: Heroe = event.option.value;
    this.keyword = heroe.superhero;

    this.heroesService.getHeroePorId(heroe.id!)
      .subscribe(heroe => {
            this.heroeSeleccionado!.pop()
        return this.heroeSeleccionado!.push(heroe)
      });
  }
}
