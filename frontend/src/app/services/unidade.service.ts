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
    if (regiao && regiao !== '') {
      url = `${this.apiUrl}/regiao/${regiao}`;
    }

    console.log('URL da requisição:', url);
    return this.http.get<any>(url).pipe(
      map(response => {
        if (response.rows) {
          // Quando a resposta é no formato { count: number, rows: Unidade[] }
          return response.rows;
        } else if (Array.isArray(response)) {
          // Quando a resposta é um array de unidades
          return response;
        } else {
          console.error('Formato de resposta da API inesperado:', response);
          return [];
        }
      })
    );
  }
}
