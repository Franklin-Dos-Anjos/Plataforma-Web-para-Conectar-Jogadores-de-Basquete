import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/auth/login/login';
import { RegisterComponent } from './pages/auth/register/register';
import { ProfileViewComponent } from './pages/profile/profile-view/profile-view';
import { ProfileEditComponent } from './pages/profile/profile-edit/profile-edit';
import { PlayerListComponent } from './pages/players/player-list/player-list';
import { InviteListComponent } from './pages/invites/invite-list/invite-list';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  // Rota padrão: Redireciona para o home
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Rotas públicas
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: RegisterComponent },

  // Rotas que serão Protegias(Dashboard/App)
  { path: 'perfil', component: ProfileViewComponent, canActivate: [authGuard] },
  { path: 'perfil/editar', component: ProfileEditComponent, canActivate: [authGuard] },
  { path: 'jogadores', component: PlayerListComponent, canActivate: [authGuard] },
  { path: 'convites', component: InviteListComponent, canActivate: [authGuard] },

  // Rota Coringa (Se digitar url errada, volta pro login)
  { path: '**', redirectTo: 'home' },
];
