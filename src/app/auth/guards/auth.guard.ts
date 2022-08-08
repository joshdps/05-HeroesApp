import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanLoad, CanActivate {


  /** 
  * Cuando no se usa Lazy Load es suficiente con usar el canActivate pero si no, es necesario usar canLoad  y canActivate
  **/
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this.authService.validaAutenticacion() .pipe(
        tap( estaAutenticado => {
          if ( !estaAutenticado ) this.router.navigate(['./auth/login'])
        })
      )

    // Otra forma de autenticar tomando el observale <Id>  del Servicio

    //   if ( !this.authService.auth.id ) {
    //     console.log("Bloqueado por canActivated");
        
    //     return false
    //   }

    // return true;
  }

  constructor( private authService: AuthService,
               private router: Router ) { }


  // canLoad solo previene que se cargue el modulo, si ya se cargo y se cambia de path y se regresa, permitirá el acceso
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean  {
    
      return this.authService.validaAutenticacion()
        .pipe(
          tap( estaAutenticado => {
            if ( !estaAutenticado ) this.router.navigate(['./auth/login'])
          })
        )
    };

    // Otra forma de autenticar tomando el observale <Id>  del Servicio
    // if ( !this.authService.auth.id ) {
    //   console.log("Bloqueado por calLoad");
    //   return false
    // }
    
    // return true;
}
