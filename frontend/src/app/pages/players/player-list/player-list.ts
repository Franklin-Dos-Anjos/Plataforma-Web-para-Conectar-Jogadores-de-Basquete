import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Position, Level } from '../../../models/enums';
import { InviteService } from '../../../services/invite';

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './player-list.html',
  styleUrl: './player-list.scss',
})
export class PlayerListComponent implements OnInit {
  filterForm: FormGroup;
  players: any[] = [];

  // Opções para os Selects
  positions = Object.values(Position);
  levels = Object.values(Level);

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private inviteService: InviteService,
    private cd: ChangeDetectorRef
  ) {
    this.filterForm = this.fb.group({
      city: [''],
      position: [''],
      level: [''],
    });
  }

  ngOnInit() {
    this.search(); // Busca inicial sem filtros (traz todos)
  }

  search() {
    // Remove chavez vazias/nulas para não enviar ?city=&position=
    const filters = this.filterForm.value;
    const cleanFilters: any = {};

    Object.keys(filters).forEach((key) => {
      if (filters[key]) cleanFilters[key] = filters[key];
    });

    this.userService.getPlayers(cleanFilters).subscribe({
      next: (data) => {
        // Filtra para não mostrar o próprio usuário (mock simples)
        // Supondo que eu sou o userId 1
        this.players = data.filter((p) => p.userId !== 1);

        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao buscar jogadores', err);
        this.cd.detectChanges();
      },
    });
  }

  limparFiltros() {
    this.filterForm.reset();
    this.search();
  }

  convidar(player: any) {
    if (!confirm(`Quer convidar ${player.name} para jogar?`)) return;

    const newInvite = {
      senderId: 1, // Mock: Eu sou o ID 1
      senderName: 'Franklin', // Mock: Meu nome
      receiverId: player.userId, // O ID do dono daquele perfil
    };

    this.inviteService.sendInvite(newInvite).subscribe({
      next: () => {
        alert('Convite enviado com sucesso!');
      },
      error: (err) => {
        alert('Erro ao enviar convite.');
      },
    });
  }
}
