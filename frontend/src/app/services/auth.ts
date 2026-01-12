import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Por enquanto aponta para o json-server. Depois mudarei para o Spring (ex: 8080/auth)
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    // TRUQUE DO MOCK:
    // Em vez de bater em /auth/login, vamos buscar na lista de usuários
    // se existe alguém com esse email E essa senha.
    // O json-server suporta filtros assim: /users?email=X&password=Y

    const filtro = `?email=${credentials.email}&password=${credentials.password}`;

    return this.http.get<any[]>(`${this.apiUrl}/users${filtro}`).pipe(
      map((users) => {
        // Se a lista voltou vazia, significa que errou email ou senha
        if (users.length === 0) {
          throw new Error('Email ou senha inválidos');
        }

        // Se achou o usuário, retornamos o token (pode ser fixo)
        return {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock-token-sucesso',
          user: users[0], // Opcional: já devolve os dados do usuário
        };
      }),
      tap((response: any) => {
        // Se chegou aqui, é porque deu sucesso
        if (response.token) {
          localStorage.setItem('auth_token', response.token);
        }
      })
    );
  }

  register(userData: any): Observable<any> {
    // O json-server aceita POST e salva de verdade no arquivo db.json
    return this.http.post(`${this.apiUrl}/users`, userData);
  }

  logout() {
    localStorage.removeItem('auth_token');
  }

  isLoggedIn(): boolean {
    // Verifica se tem token salvo (lógica simples para o MVP)
    return !!localStorage.getItem('auth_token');
  }
}
