import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Unidade } from '../models/unidade.model';

@Injectable({
  providedIn: 'root'
})
export class UnidadeService {

  private apiUrl = 'http://localhost:3000/api/unidade';

  constructor(private http: HttpClient) { }

  getUnidades(regiao?: string): Observable<Unidade[]> {
    let url = this.apiUrl;
    if (regiao) {
      url = `${this.apiUrl}/regiao/${regiao}`;
    }

    return this.http.get<Unidade[]>(url).pipe(
      map(response => {
        console.log('Dados da API:', response);
        return response;
      })
    );
  }
}
