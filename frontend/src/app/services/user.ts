import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //No Backend real será /players. No json-server usamos /profiles para simular
  private apiUrl = 'http://localhost:3000/profiles';

  constructor(private http: HttpClient) {}

  // Método de busca com filtros opcionais
  getPlayers(filters?: { city?: string; position?: string; level?: string }): Observable<any[]> {
    let params = new HttpParams();

    if (filters) {
      if (filters.city) params = params.set('city', filters.city);
      if (filters.position) params = params.set('position', filters.position);
      if (filters.level) params = params.set('level', filters.level);
    }

    // O json-server filtra automaticamente se passar ?city=X&position=Y
    return this.http.get<any[]>(this.apiUrl, { params });
  }
}
