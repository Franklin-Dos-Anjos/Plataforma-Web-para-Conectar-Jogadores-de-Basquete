import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login';
import { RegisterComponent } from './pages/auth/register/register';
import { ProfileViewComponent } from './pages/profile/profile-view/profile-view';
import { PlayerListComponent } from './pages/players/player-list/player-list';
import { InviteListComponent } from './pages/invites/invite-list/invite-list';

export const routes: Routes = [
  // Rota padrão: Redireciona para o home
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Rotas públicas
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: RegisterComponent },

  // Rotas que serão Protegias(Dashboard/App)
  { path: 'perfil', component: ProfileViewComponent },
  { path: 'jogadores', component: PlayerListComponent },
  { path: 'convites', component: InviteListComponent },

  // Rota Coringa (Se digitar url errada, volta pro login)
  { path: '**', redirectTo: 'login' },
];
