import { Character } from './../interfaces/character.interface';
import { environment } from './../../../environments/environment.prod';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }

  public searchCharacters(query = null, page = 1) {
    let filter = '';
    if (query != null){
      filter = `${environment.baseUrlAPI}/?name=${query}&?page=${page}`;
    } else if (page > 0) {
      filter = `${environment.baseUrlAPI}/?page=${page}`;
    }
    return this.http.get<Character[]>(filter);
  }

  public getDetails(id: number): Observable<Character> {
    return this.http.get<Character>(`${environment.baseUrlAPI}/${id}`);
  }
}
