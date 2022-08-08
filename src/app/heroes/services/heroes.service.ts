import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../interfaces/heroe.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  baseUrl: string = environment.baseUrl;
  endpointHeroes: string = environment.endpointHeroes;
  endpointUsuarios: string = environment.endpointUsuarios;
  requestUrl: string = ''


  constructor(private http: HttpClient) { }

  getHeroes():Observable<Heroe[]> {
    this.requestUrl = `${this.baseUrl}${this.endpointHeroes}`
   return this.http.get<Heroe[]>(this.requestUrl)
  }

  getHeroesPorNombre( keyword: string = '' ):Observable<Heroe[]> {
    this.requestUrl = `${this.baseUrl}${this.endpointHeroes}?q=${keyword}&_limit=6`
   return this.http.get<Heroe[]>(this.requestUrl)
  }

   getHeroePorId(id: string):Observable<Heroe> {
    this.requestUrl = `${this.baseUrl}${this.endpointHeroes}`
    return  this.http.get<Heroe>(`${this.requestUrl}/${id}`)
   }
 
   agregarHeroe(heroe: Heroe):Observable<Heroe>{
    this.requestUrl = `${this.baseUrl}${this.endpointHeroes}`
    return this.http.post<Heroe>(this.requestUrl, heroe)
   }

   actualizarHeroe(heroe: Heroe):Observable<Heroe>{
    this.requestUrl = `${this.baseUrl}${this.endpointHeroes}/${heroe.id}`    
    return this.http.put<Heroe>(this.requestUrl, heroe)
   }

   eliminarHeroe(id: string):Observable<{}>{
    this.requestUrl = `${this.baseUrl}${this.endpointHeroes}/${id}`
    return this.http.delete<{}>(this.requestUrl)
   }

}
