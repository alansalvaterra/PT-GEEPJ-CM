import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  private apiUrl = 'http://localhost:3000/api/municipio';

  constructor(private http: HttpClient) { }

  getMunicipios(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
