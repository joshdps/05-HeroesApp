import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Auth } from '../interfaces/auth.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private _auth: Auth | undefined;

  private baseUrl:string = environment.baseUrl;
  private endPoint: string = 'usuarios'

  // Se maneja como getter  y se desestructura para que no se altere su valor ya que ej JS los objetos se pasan por referencia
  get auth():Auth {
    return {...this._auth!};
  }

  constructor( private http: HttpClient) { }

  validaAutenticacion(): Observable<boolean>{

    if ( !localStorage.getItem('token') ) {
      return of(false)
    } 
    
    const id: string = localStorage.getItem('token')!;
    const requestUrl = `${this.baseUrl}/${this.endPoint}/${id}`

    return this.http.get<Auth>(`${requestUrl}`)
      .pipe(
        map( auth => {
          this._auth = auth

          return true
        })
        )
    
  }

  login( id: string ){
    const requestUrl = `${this.baseUrl}/${this.endPoint}/${id}`
    return this.http.get<Auth>(`${requestUrl}`)
      .pipe(
        tap( auth => this._auth = auth),
        tap( auth => localStorage.setItem('token' , auth.id))
      )
  }
}
