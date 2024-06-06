import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SrService {

  private apiUrl = 'http://localhost:3000/api/sr';

  constructor(private http: HttpClient) { }

  getSrs(): Observable<any[]> {
    return this.http.get<{ rows: any[] }>(this.apiUrl).pipe(
      map(response => response.rows)
    );
  }
}
