import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UfService {

  private apiUrl = 'http://localhost:3000/api/uf';

  constructor(private http: HttpClient) { }

  getUfs(): Observable<any[]> {
    return this.http.get<{ rows: any[] }>(this.apiUrl).pipe(
      map(response => response.rows)
    );
  }
}
