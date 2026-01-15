import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InviteService {
  private apiUrl = 'http://localhost:3000/invites';

  constructor(private http: HttpClient) {}

  // 1. Enviar convite (POST)
  sendInvite(invite: any): Observable<any> {
    return this.http.post(this.apiUrl, {
      ...invite,
      status: 'PENDENTE',
      createdAt: new Date().toISOString(),
    });
  }

  // 2. Listar convites recebidos (GET)
  // No json-server filtramos por ?receiverId=X
  getReceivedInvites(userId: number | string): Observable<any[]> {
    return this.http.get<[]>(`${this.apiUrl}?receiverId=${userId}`);
  }

  // 3. Aceitar convite (PATCH para atualizar status)
  acceptInvite(inviteId: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${inviteId}`, { status: 'ACEITO' });
  }
}
