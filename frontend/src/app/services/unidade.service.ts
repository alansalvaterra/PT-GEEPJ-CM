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

  getUnidades(regiao?: string, sr?: number, uf?: string): Observable<Unidade[]> {
    let url = this.apiUrl;

    if (sr !== undefined) {
      url = `${this.apiUrl}/sr/${encodeURIComponent(sr)}`;
    } else if (regiao) {
      url = `${this.apiUrl}/regiao/${encodeURIComponent(regiao)}`;
    } else if (uf) {
      url = `${this.apiUrl}/uf/${encodeURIComponent(uf)}`;
    }

    console.log('URL da requisição:', url);
    return this.http.get<any>(url).pipe(
      map(response => {
        if (response.rows) {
          return response.rows;
        } else if (Array.isArray(response)) {
          return response;
        } else {
          console.error('Formato de resposta da API inesperado:', response);
          return [];
        }
      })
    );
  }

  getUnidadesByIbge(ibge: number): Observable<Unidade[]> {
    const url = `${this.apiUrl}/ibge/${ibge}`;
    console.log('URL da requisição:', url);
    return this.http.get<Unidade[]>(url);
  }
}
