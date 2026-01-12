import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Busca o perfil baseado no ID do Usuário
  getProfileByUserId(userId: number): Observable<any> {
    // No json-server, usamos ?userId=1 para filtrar
    return this.http.get<any[]>(`${this.apiUrl}/profiles?userId=${userId}`).pipe(
      map((profiles) => {
        if (Array.isArray(profiles) && profiles.length > 0) {
          return profiles[0];
        }
        return null;
      })
    );
  }

  // Atualiza ou Cria o perfil
  saveProfile(profileData: any): Observable<any> {
    if (profileData.id) {
      return this.http.put(`${this.apiUrl}/profiles/${profileData.id}`, profileData);
    } else {
      return this.http.post(`${this.apiUrl}/profiles`, profileData);
    }
  }
}
