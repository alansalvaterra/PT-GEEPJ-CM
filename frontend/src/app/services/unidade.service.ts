import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Unidade } from '../models/unidade.model';

@Injectable({
  providedIn: 'root'
})
export class UnidadeService {

  private apiUrl = 'http://localhost:3000/api/unidade';

  constructor(private http: HttpClient) { }

  getUnidades(): Observable<Unidade[]> {
    return this.http.get<{ rows: Unidade[] }>(this.apiUrl).pipe(
      map(response => response.rows)
    );
  }
}
