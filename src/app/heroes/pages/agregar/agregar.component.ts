import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import Swal from 'sweetalert2'

import { HeroesService } from '../../services/heroes.service';

import { Heroe, Publisher } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html'
})
export class AgregarComponent implements OnInit {

  tipoAccion: string = 'Agregar';
  tipoIconoAccion: string = 'save';

  publishers = [
    {
      id: 'DC Comics',
      desc: 'Dc - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];
  
  heroe: Heroe = {
    superhero: '', 
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }
  constructor( private activatedRoute: ActivatedRoute,
               private heroesService: HeroesService,
               private router: Router
    ) { }
  
  guardar(){
    Swal.fire({
      title: '¡Hola!',
      text: "¿Estas seguro de guardar los cambios?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'

    }).then((result) => {
      if (result.isConfirmed) {
        if ( this.heroe.superhero.trim().length === 0 ) return

        if( !this.heroe.id ){
          this.heroesService.agregarHeroe( this.heroe )
            .subscribe( heroe =>{ 
              Swal.fire(
                '¡Enhorabuena!',
                `${this.heroe.superhero} se creó correctamente.`,
                'success'
              )
              return this.router.navigate(['/heroes/editar', heroe.id])
            });
        }else{      
          this.heroesService.actualizarHeroe( this.heroe )
            .subscribe( heroe => {
              Swal.fire(
                '¡Enhorabuena!',
                `${this.heroe.superhero} se actualizó correctamente.`,
                'success'
              )
              return this.router.navigate(['/heroes/editar', heroe.id])
            });
        }

      }
    })

  }

  eliminar(){
    Swal.fire({
      title: '¡Hola!',
      text: `¿Estas seguro que deseas eliminar a ${this.heroe.superhero}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'

    }).then((result) => {
      if (result.isConfirmed) {
        if ( this.heroe.superhero.trim().length === 0 ) return
     
          this.heroesService.eliminarHeroe( this.heroe.id! )
            .subscribe( resp => {
              Swal.fire(
                'Eliminado!',
                `${this.heroe.superhero} se eliminado correctamente`,
                'info'
              )
              return this.router.navigate(['/heroes'])
            });

      }
    })

  }

  ngOnInit(): void {

    if( !this.router.url.includes('editar') ) return;
      this.tipoAccion='Editar';
      this.tipoIconoAccion='edit'
      this.activatedRoute.params  
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroePorId(id)),
      )
      .subscribe(heroe => this.heroe = heroe)
    }
  

}
